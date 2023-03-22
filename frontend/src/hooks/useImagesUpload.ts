import { ChangeEvent, useState } from "react";

const MAX_FILE_SIZE = 2 << 20; // 2 MB

export function useImagesUpload() {
  const [images, setImages] = useState<File[]>([]);

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(
        (file) => file.size <= MAX_FILE_SIZE
      );
      setImages(files);
    }
  };

  return { images, handleImagesChange };
}
