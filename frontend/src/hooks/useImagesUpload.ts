import { ChangeEvent, useState } from "react";
import { filterFiles, displayAlertMessage } from "../utils";

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
    if (!e.target.files) {
      return;
    }

    const files = Array.from(e.target.files);
    const filteredFiles = filterFiles(files, maxFileSize);

    if (filteredFiles.length < files.length) {
      displayAlertMessage("Some images are too big and will not be uploaded");
    }

    if (filteredFiles.length > maxFiles) {
      displayAlertMessage(`Only ${maxFiles} images will be uploaded`);
      filteredFiles.length = maxFiles;
    }

    setImagesFiles(filteredFiles);
  };

  return [imagesFiles, handleImagesChange];
}
