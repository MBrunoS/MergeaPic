# MergeaPic

[![Go Report Card](https://goreportcard.com/badge/github.com/mbrunos/mergeapic)](https://goreportcard.com/report/github.com/mbrunos/mergeapic)

This is an application that merges a given overlay image with multiple photos. The output are new images created from each photo merged with the overlay image.

## Live demo

You can try the application [here](https://mergeapic.mbrunos.dev/).

## Local usage

You can also run the application locally. To do so, follow the instructions below:

### Installation

To run this program, you need to have Go and Node.js installed in your machine. Then, clone the repository and navigate to its directory:

```sh
git clone https://github.com/mbrunos/mergeapic.git
cd mergeapic

# Install the frontend dependencies
cd frontend && npm install && cd ..

# Install the backend dependencies
cd backend && go mod download && cd ..
```

### Running the application

To start the backend run the following command in your terminal:

```sh
cd backend
go run main.go
```

To start the frontend run the following command in your terminal:

```sh
cd frontend
npm run dev
```

## How it works

The application is composed of a frontend and a backend. The frontend is a React.js application that allows the user to upload the overlay image and the photos to be merged. The backend is a Go application that receives the files and merges them.

The program uses the `imaging` library to resize and crop the photos accordingly to the overlay image size. Then, these images are merged using the `image/draw` package.

## License

This project is licensed under the [MIT license](https://github.com/mbrunos/mergeapic/blob/master/LICENSE).

## Author

[Maurício Bruno](https://mbrunos.dev)
