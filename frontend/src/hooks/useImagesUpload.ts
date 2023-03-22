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
    const filePromises = imagesFiles.map((imgFile) => {
      return new Promise<Preview>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            src: reader.result as string,
            alt: imgFile.name,
          });
        };
        reader.readAsDataURL(imgFile);
      });
    });

    Promise.all(filePromises)
      .then((images) => setImages(images))
      .catch((error) => console.log(error));
  }, [imagesFiles]);

  return { images, handleImagesChange };
}
