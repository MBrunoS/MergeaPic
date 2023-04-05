package main

import (
	"bytes"
	"context"
	"encoding/base64"
	"encoding/json"
	"image"
	"image/draw"
	"image/jpeg"
	"image/png"
	"mime/multipart"
	"net/http"
	"os"
	"time"

	"github.com/disintegration/imaging"
	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"
)

type Response struct {
	Images []string `json:"images"`
}

const (
	maxFileSize = 2 << 20 // 2MB
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/merge", mergeImagesHandler).Methods("POST", "OPTIONS")

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	server := &http.Server{
		Addr:    "0.0.0.0:" + port,
		Handler: r,
	}

	logrus.Infof("Server started on 0.0.0.0:%s", port)
	logrus.Fatal(server.ListenAndServe())
}

func mergeImagesHandler(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(r.Context(), 30*time.Second)
	defer cancel()

	logger := logrus.WithFields(logrus.Fields{
		"method": r.Method,
		"path":   r.URL.Path,
	})

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	err := r.ParseMultipartForm(maxFileSize)
	if err != nil {
		logger.Errorf("Failed to parse multipart form: %s", err)
		http.Error(w, "Invalid form data", http.StatusBadRequest)
		return
	}

	overlayImgFile, _, err := r.FormFile("overlay")
	if err != nil {
		logger.Errorf("Failed to get overlay image: %s", err)
		http.Error(w, "Missing overlay image", http.StatusBadRequest)
		return
	}
	defer overlayImgFile.Close()

	overlayImg, err := png.Decode(overlayImgFile)
	if err != nil {
		logger.Errorf("Failed to decode overlay image: %s", err)
		http.Error(w, "Invalid overlay image", http.StatusInternalServerError)
		return
	}
	logger.Info("Overlay image decoded")

	files := r.MultipartForm.File["photos[]"]
	resultImages := make(chan []string, len(files))
	logger.Infof("Starting to merge %d images", len(files))

	for _, file := range files {
		go mergeImages(ctx, file, overlayImg, resultImages)
	}

	var resp Response

	for i := 0; i < len(files); i++ {
		select {
		case images := <-resultImages:
			resp.Images = append(resp.Images, images...)
		case <-ctx.Done():
			logger.Warn("Request timed out")
			http.Error(w, "Request timed out", http.StatusRequestTimeout)
			return
		}
	}

	jsonResponse, err := json.Marshal(resp)
	if err != nil {
		logger.Errorf("Failed to encode response: %s", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)

	logger.Info("Response sent")
}

func mergeImages(ctx context.Context, photoFile *multipart.FileHeader, overlayImg image.Image, resultImages chan<- []string) {
	logger := logrus.WithField("photo", photoFile.Filename)

	select {
	case <-ctx.Done():
		logger.Warn("Request timed out")
		return
	default:
	}

	photoReader, err := photoFile.Open()
	if err != nil {
		logger.Errorf("Failed to open photo: %s", err)
		return
	}
	defer photoReader.Close()

	bgImg, _, err := image.Decode(photoReader)
	if err != nil {
		logger.Errorf("Failed to decode photo: %s", err)
		return
	}

	b := overlayImg.Bounds()
	finalImg := image.NewRGBA(b)

	resizedImg := imaging.Fill(bgImg, b.Size().X, b.Size().Y, imaging.Center, imaging.Lanczos)

	draw.Draw(finalImg, b, resizedImg, image.Point{}, draw.Src)
	draw.Draw(finalImg, b, overlayImg, image.Point{}, draw.Over)

	var buff bytes.Buffer
	if err := jpeg.Encode(&buff, finalImg, &jpeg.Options{Quality: jpeg.DefaultQuality}); err != nil {
		logger.Errorf("Failed to encode merged image file: %s", err)
		return
	}

	resultImages <- []string{base64.StdEncoding.EncodeToString(buff.Bytes())}
	logger.Info("Image merged")
}
