import { ChangeEvent, useState } from "react";

type UseImagesUpload = {
  maxFiles: number;
  maxFileSize: number;
};

export function useImagesUpload({
  maxFiles,
  maxFileSize,
}: UseImagesUpload): [File[], (e: ChangeEvent<HTMLInputElement>) => void] {
  const [imagesFiles, setImagesFiles] = useState<File[]>([]);

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

  return [imagesFiles, handleImagesChange];
}
