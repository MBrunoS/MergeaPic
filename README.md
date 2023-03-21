# MergeaPic

[![Go Report Card](https://goreportcard.com/badge/github.com/mbrunos/mergeapic)](https://goreportcard.com/report/github.com/mbrunos/mergeapic)

This is a Go program that merges a given overlay image with multiple photos. The output are new images created from each photo merged with the overlay image.

## Installation

To run this program, you need to have Go installed in your machine. Then, clone the repository and navigate to its directory:

```sh
git clone https://github.com/mbrunos/mergeapic.git
cd mergeapic
```

## Usage

To start the web server run the following command in your terminal:

```sh
go run main.go
```

Then, follow the instructions below:

1. Using a REST client, send a POST request to `http://localhost:8080/merge` with the following parameters:

   - `overlay`: the overlay image to use
   - `photos`: the photos to merge with the overlay image

2. A success message will appear once the process is finished.

The resulting images will be placed in the `merged_images` folder with the same name they had before and the "\_merged" suffix.

## How it works

The program uses the `imaging` library to resize and crop the photos accordingly to the overlay image size. Then, these images are merged using the `image/draw` package.

## License

This project is licensed under the [MIT license](https://github.com/mbrunos/mergeapic/blob/master/LICENSE).

## Author

[Maurício Bruno](https://mbrunos.dev)
