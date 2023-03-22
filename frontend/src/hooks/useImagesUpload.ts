import { ChangeEvent, useState } from "react";

const MAX_FILES = 20;
const MAX_FILE_SIZE = 2 << 20; // 2 MB

export function useImagesUpload() {
  const [images, setImages] = useState<File[]>([]);

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(
        (file) => file.size <= MAX_FILE_SIZE
      );

      if (files.length > MAX_FILES) {
        alert(`Only ${MAX_FILES} images will be uploaded`);
        files.length = MAX_FILES;
      }

      setImages(files);
    }
  };

  return { images, handleImagesChange };
}
