package main

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"image"
	"image/draw"
	"image/jpeg"
	"image/png"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"sync"

	"github.com/disintegration/imaging"
)

type Response struct {
	Images []string `json:"images"`
}

var wg sync.WaitGroup

func main() {
	http.HandleFunc("/merge", mergeImagesHandler)
	log.Println("Server started on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func mergeImagesHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	r.ParseMultipartForm(2 << 20) // Limit file size to 2MB

	overlayImgFile, _, err := r.FormFile("overlay")
	if err != nil {
		log.Printf("Failed to get overlay image: %s", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	defer overlayImgFile.Close()

	overlayImg, err := png.Decode(overlayImgFile)
	if err != nil {
		log.Printf("Failed to decode overlay image: %s", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	files := r.MultipartForm.File["photos"]
	resultImages := make([]string, 0)
	for _, file := range files {
		wg.Add(1)
		go mergeImages(file, overlayImg, &resultImages)
	}

	wg.Wait()

	resp := Response{Images: resultImages}
	jsonResponse, err := json.Marshal(resp)
	if err != nil {
		log.Printf("failed to encode response: %s", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

func mergeImages(photoFile *multipart.FileHeader, overlayImg image.Image, resultImages *[]string) {
	defer wg.Done()

	photoReader, err := photoFile.Open()
	if err != nil {
		log.Printf("failed to open photo %s: %s", photoFile.Filename, err)
		return
	}
	defer photoReader.Close()

	bgImg, _, err := image.Decode(photoReader)
	if err != nil {
		log.Printf("failed to decode photo %s: %s", photoFile.Filename, err)
		return
	}

	b := overlayImg.Bounds()
	finalImg := image.NewRGBA(b)

	resizedImg := imaging.Fill(bgImg, b.Size().X, b.Size().Y, imaging.Center, imaging.Lanczos)

	draw.Draw(finalImg, b, resizedImg, image.Point{}, draw.Src)
	draw.Draw(finalImg, b, overlayImg, image.Point{}, draw.Over)

	resultFileName := filepath.Join("merged_images", fmt.Sprintf("%s_merged.jpg", photoFile.Filename))
	if err := os.MkdirAll(filepath.Dir(resultFileName), 0755); err != nil {
		log.Printf("failed to create merged images directory: %s", err)
		return
	}

	result, err := os.Create(resultFileName)
	if err != nil {
		log.Printf("failed to create merged image file %s: %s", resultFileName, err)
		return
	}
	defer result.Close()

	if err := jpeg.Encode(result, finalImg, &jpeg.Options{Quality: jpeg.DefaultQuality}); err != nil {
		log.Printf("failed to encode merged image file %s: %s", resultFileName, err)
		return
	}

	imgBytes, err := os.ReadFile(resultFileName)
	if err != nil {
		log.Printf("failed to read merged image file %s: %s", resultFileName, err)
		return
	}

	*resultImages = append(*resultImages, base64.StdEncoding.EncodeToString(imgBytes))

	if err := os.Remove(resultFileName); err != nil {
		log.Printf("failed to remove merged image file %s: %s", resultFileName, err)
		return
	}
}
