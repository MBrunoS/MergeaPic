import { ChangeEvent, useEffect, useState } from "react";
import { Preview } from "../@types";

type UseImagesUpload = {
  maxFiles: number;
  maxFileSize: number;
};

export function useImagesUpload({ maxFiles, maxFileSize }: UseImagesUpload) {
  const [imagesFiles, setImagesFiles] = useState<File[]>([]);
  const [images, setImages] = useState<Preview[]>([]);

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(
        (file) => file.size <= maxFileSize
      );

      if (files.length > maxFiles) {
        alert(`Only ${maxFiles} images will be uploaded`);
        files.length = maxFiles;
      }

      setImagesFiles(files);
    }
  };

  useEffect(() => {
    const images = imagesFiles.map((imgFile) => ({
      src: URL.createObjectURL(imgFile),
      alt: imgFile.name,
    }));
    setImages(images);
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.src));
    };
  }, [imagesFiles]);

  return { images, handleImagesChange };
}
