package main

import (
	"fmt"
	"image"
	"image/draw"
	"image/jpeg"
	"image/png"
	"io/fs"
	"log"
	"os"
	"path/filepath"
	"sync"

	"github.com/disintegration/imaging"
)

var wg sync.WaitGroup

func main() {
	overlayImgFile, err := os.Open("overlay.png")
	if err != nil {
		log.Fatalf("failed to open overlay image: %s", err)
	}
	defer overlayImgFile.Close()

	overlayImg, err := png.Decode(overlayImgFile)
	if err != nil {
		log.Fatalf("failed to decode overlay image: %s", err)
	}

	files, err := os.ReadDir("photos")
	if err != nil {
		log.Fatalf("Failed to read photos directory: %s", err)
	}

	for _, file := range files {
		wg.Add(1)
		go mergeImages(file, overlayImg)
	}

	wg.Wait()

	fmt.Println("All images merged successfully.")
}

func mergeImages(photoFile fs.DirEntry, overlayImg image.Image) {
	defer wg.Done()

	photoReader, err := os.Open(filepath.Join("photos", photoFile.Name()))
	if err != nil {
		log.Fatalf("failed to open photo %s: %s", photoFile.Name(), err)
	}
	defer photoReader.Close()

	bgImg, _, err := image.Decode(photoReader)
	if err != nil {
		log.Fatalf("failed to decode photo %s: %s", photoFile.Name(), err)
	}

	b := overlayImg.Bounds()
	finalImg := image.NewRGBA(b)

	resizedImg := imaging.Fill(bgImg, b.Size().X, b.Size().Y, imaging.Center, imaging.Lanczos)

	draw.Draw(finalImg, b, resizedImg, image.Point{}, draw.Src)
	draw.Draw(finalImg, b, overlayImg, image.Point{}, draw.Over)

	resultFileName := filepath.Join("merged_images", fmt.Sprintf("%s_merged.jpg", photoFile.Name()))
	if err := os.MkdirAll(filepath.Dir(resultFileName), 0755); err != nil {
		log.Fatalf("Failed to create merged images directory: %s", err)
	}

	result, err := os.Create(resultFileName)
	if err != nil {
		log.Fatalf("failed to create merged image file %s: %s", resultFileName, err)
	}
	defer result.Close()

	if err := jpeg.Encode(result, finalImg, &jpeg.Options{Quality: jpeg.DefaultQuality}); err != nil {
		log.Fatalf("Failed to encode merged image file %s: %s", resultFileName, err)
	}
}
