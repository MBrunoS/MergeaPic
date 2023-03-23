package main

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"image"
	"image/draw"
	"image/jpeg"
	"image/png"
	"log"
	"mime/multipart"
	"net/http"

	"github.com/disintegration/imaging"
)

type Response struct {
	Images []string `json:"images"`
}

func main() {
	http.HandleFunc("/merge", mergeImagesHandler)
	log.Println("Server started on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func mergeImagesHandler(w http.ResponseWriter, r *http.Request) {
	log.Printf("%v request received", r.Method)

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

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
	log.Println("Overlay image decoded")

	files := r.MultipartForm.File["photos"]
	resultImages := make(chan []string, len(files))
	log.Printf("Starting to merge %v images", len(files))

	for _, file := range files {
		go mergeImages(file, overlayImg, resultImages)
	}

	var resp Response

	for i := 0; i < len(files); i++ {
		resp.Images = append(resp.Images, <-resultImages...)
	}

	jsonResponse, err := json.Marshal(resp)
	if err != nil {
		log.Printf("failed to encode response: %s", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)

	log.Println("Response sent")
}

func mergeImages(photoFile *multipart.FileHeader, overlayImg image.Image, resultImages chan []string) {

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

	var buff bytes.Buffer
	if err := jpeg.Encode(&buff, finalImg, &jpeg.Options{Quality: jpeg.DefaultQuality}); err != nil {
		log.Printf("failed to encode merged image file: %s", err)
		return
	}

	resultImages <- []string{base64.StdEncoding.EncodeToString(buff.Bytes())}
}
