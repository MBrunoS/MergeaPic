# MergeaPic

MergeaPic is a simple program that merges an overlay image with all the images present in a directory.

## How it works

This code merges overlay image with all the images present in the "photos" directory and produces a new merged image for each image. The output images are stored in "merged_images" directory.

The `imaging` and `image`, packages are used to resize and merge images respectively.

## Usage

1. Put all the photos you want to merge with the overlay image inside the `photos` directory.
2. Place the overlay image in the root folder and make sure it is named `overlay.png`.
3. Run the program.
4. Check the `merged_images` folder for the resulting merged images.

Note: This program only accepts `.jpg`, `.jpeg`, and `.png` files.

## Dependencies

- Go 1.16 or higher
- "github.com/disintegration/imaging"
- "image"
- "image/draw"
- "image/jpeg"
- "image/png"
- "io/fs"
- "log"
- "os"
- "path/filepath"
- "sync"

## Author

[@MBrunos](https://github.com/MBrunoS)
