import { Button, ButtonGroup } from "@chakra-ui/react";
import { ArrowLeft } from "@phosphor-icons/react";
import React, { useContext, useEffect } from "react";
import { Steps } from "../@types";
import { AppContext } from "../context/AppContext";
import { useImagesUpload } from "../hooks";
import { UploadImagesCard } from "./UploadImagesCard";
import { useTranslation } from "react-i18next";

export const OverlayScreen: React.FC = () => {
  const { setOverlay, setCurrentStep } = useContext(AppContext);
  const [images, handleImagesChange] = useImagesUpload({
    maxFiles: 1,
    maxFileSize: 2 * 1024 * 1024,
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (!images.length) return;

    setOverlay(images[0]);
    setCurrentStep(Steps.Confirm);
  }, [images]);

  function handleReturn() {
    setCurrentStep(Steps.Preview);
  }

  return (
    <>
      <UploadImagesCard
        text={t("uploadImagesCard.overlay.text")}
        subtitle={t("uploadImagesCard.overlay.subtitle", {
          maxFileSize: "2MB",
        })}
        handleImagesChange={handleImagesChange}
        isMultiple={false}
      />

      <ButtonGroup colorScheme="blue" position="fixed" bottom={4}>
        <Button
          leftIcon={<ArrowLeft weight="bold" />}
          variant="outline"
          background="white"
          _dark={{
            background: "gray.800",
            _hover: {
              background: "gray.700",
            },
          }}
          onClick={handleReturn}
        >
          {t("navButtons.return")}
        </Button>
      </ButtonGroup>
    </>
  );
};
