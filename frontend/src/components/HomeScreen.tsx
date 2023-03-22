import React, { useContext, useEffect } from "react";
import { Steps } from "../@types";
import { AppContext } from "../context/AppContext";
import { useImagesUpload } from "../hooks";
import { UploadImagesCard } from "./UploadImagesCard";

export const HomeScreen: React.FC = () => {
  const { setPhotos, setCurrentStep } = useContext(AppContext);
  const { images, handleImagesChange } = useImagesUpload({
    maxFiles: 20,
    maxFileSize: 2 * 1024 * 1024,
  });

  useEffect(() => {
    if (!images.length) return;

    setPhotos(images);
    setCurrentStep(Steps.Preview);
  }, [images]);

  return (
    <UploadImagesCard
      text="Click here to choose the photos"
      subtitle="(Max number of files: 20 / Max file size: 2MB)"
      handleImagesChange={handleImagesChange}
    />
  );
};
