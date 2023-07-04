import { ChangeEvent, useState } from "react";
import { filterFiles, displayAlertMessage } from "../utils";
import { ImageFile } from "../@types";

type UseImagesUpload = {
  maxFiles: number;
  maxFileSize: number;
};

export function useImagesUpload({
  maxFiles,
  maxFileSize,
}: UseImagesUpload): [
  ImageFile[],
  (e: ChangeEvent<HTMLInputElement>) => Promise<void>
] {
  const [imagesFiles, setImagesFiles] = useState<ImageFile[]>([]);

  const handleImagesChange = async (e: ChangeEvent<HTMLInputElement>) => {
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

    const imgFiles: ImageFile[] = await Promise.all(
      filteredFiles.map(async (file) => {
        const base64 = await toBase64(file);
        return {
          src: base64,
          name: file.name,
        };
      })
    );

    setImagesFiles(imgFiles);
  };

  return [imagesFiles, handleImagesChange];
}

export async function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}
