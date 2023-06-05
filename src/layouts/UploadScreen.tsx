import React, { useContext, useEffect } from "react";
import { Steps } from "../@types";
import { AppContext } from "../context/AppContext";
import { useImagesUpload } from "../hooks";
import { UploadImagesCard } from "../components";
import { useTranslation } from "react-i18next";

export const UploadScreen: React.FC = () => {
  const { setPhotos, setCurrentStep } = useContext(AppContext);
  const [images, handleImagesChange] = useImagesUpload({
    maxFiles: 25,
    maxFileSize: 2 * 1024 * 1024,
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (!images.length) return;

    setPhotos(images);
    setCurrentStep(Steps.Overlay);
  }, [images]);

  return (
    <UploadImagesCard
      text={t("uploadImagesCard.photos.text")}
      subtitle={t("uploadImagesCard.photos.subtitle", {
        maxFiles: 25,
        maxFileSize: "2MB",
      })}
      handleImagesChange={handleImagesChange}
    />
  );
};
