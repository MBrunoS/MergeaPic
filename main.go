package main

import (
	"image"
	"image/draw"
	"image/jpeg"
	"image/png"
	"log"
	"os"
	"strconv"

	"github.com/disintegration/imaging"
)

func main() {
	files, err := os.ReadDir("imagens")
	if err != nil {
		log.Fatal(err)
	}

	// TARJA
	overlayImgFile, err := os.Open("tarja.png")
	if err != nil {
		log.Fatalf("failed to open: %s", err)
	}

	overlayImg, err := png.Decode(overlayImgFile)
	if err != nil {
		log.Fatalf("failed to decode: %s", err)
	}
	defer overlayImgFile.Close()

	for i, file := range files {
		photoFile, err := os.Open("imagens/" + file.Name())
		if err != nil {
			log.Fatalf("failed to open: %s", err)
		}

		bgImg, _, err := image.Decode(photoFile)
		if err != nil {
			log.Fatalf("failed to decode: %s", err)
		}
		defer photoFile.Close()

		b := overlayImg.Bounds()
		finalImg := image.NewRGBA(b)

		resizedImg := imaging.Resize(bgImg, b.Size().X, 0, imaging.Lanczos)

		offsetY := (resizedImg.Bounds().Dy() - b.Dy()) / 2

		draw.Draw(finalImg, b, resizedImg, image.Point{0, offsetY}, draw.Src)
		draw.Draw(finalImg, b, overlayImg, image.Point{}, draw.Over)

		resultFileName := "tarjas/" + strconv.Itoa(i) + ".jpg"
		result, err := os.Create(resultFileName)
		if err != nil {
			log.Fatalf("failed to create: %s", err)
		}

		jpeg.Encode(result, finalImg, &jpeg.Options{jpeg.DefaultQuality})
		defer result.Close()
	}

}
