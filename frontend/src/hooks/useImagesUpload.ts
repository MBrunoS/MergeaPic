import { ChangeEvent, useEffect, useState } from "react";
import { Preview } from "../@types";

const MAX_FILES = 20;
const MAX_FILE_SIZE = 2 << 20; // 2 MB

export function useImagesUpload() {
  const [imagesFiles, setImagesFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<Preview[]>([]);

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(
        (file) => file.size <= MAX_FILE_SIZE
      );

      if (files.length > MAX_FILES) {
        alert(`Only ${MAX_FILES} images will be uploaded`);
        files.length = MAX_FILES;
      }

      setImagesFiles(files);
    }
  };

  useEffect(() => {
    const images = imagesFiles.map((imgFile) => ({
      src: URL.createObjectURL(imgFile),
      alt: imgFile.name,
    }));
    setPreviews(images);
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.src));
    };
  }, [imagesFiles]);

  return { previews, setPreviews, handleImagesChange };
}
