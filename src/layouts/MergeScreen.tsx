import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { AppContext } from "../context/AppContext";
import {
  Button,
  ButtonGroup,
  Image as ChakraImage,
  SimpleGrid,
} from "@chakra-ui/react";
import { DownloadSimple, House } from "@phosphor-icons/react";
import { Steps } from "../@types";
import { useTranslation } from "react-i18next";
import { EditContext } from "../context";

export const MergeScreen: React.FC = () => {
  const { setPhotos, overlay, setCurrentStep } = useContext(AppContext);
  const { photosPreview, setPhotosPreview } = useContext(EditContext);
  const { t } = useTranslation();

  const [overlayImg, setOverlayImg] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setOverlayImg(img);
    };
    img.src = overlay.src;
  }, []);

  const mergedPhotos = useMemo(() => {
    if (!overlayImg) return [];

    return Object.values(photosPreview).map((photo) => {
      const canvas = document.createElement("canvas");
      canvas.width = overlayImg.width;
      canvas.height = overlayImg.height;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(
        photo.imgElement,
        0,
        0,
        overlayImg.width,
        overlayImg.height
      );
      ctx?.drawImage(overlayImg, 0, 0);

      return canvas
        .toDataURL("image/jpeg")
        .replace(/^data:image\/jpeg;base64,/, "");
    });
  }, [overlayImg, photosPreview]);

  const handleReturn = useCallback(() => {
    setPhotos([]);
    setPhotosPreview({});
    setCurrentStep(Steps.Upload);
  }, [setCurrentStep]);

  const handleDownload = useCallback(async () => {
    const zip = new JSZip();

    await Promise.all(
      mergedPhotos.map((photo, i) =>
        zip.file(`merged_photo_${i}.jpg`, photo, { base64: true })
      )
    );

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "merged_photos.zip");
  }, [mergedPhotos]);

  return (
    <>
      <SimpleGrid columns={[2, null, 3, 5]} spacing={4} maxW="4xl">
        {mergedPhotos.map((photo) => (
          <ChakraImage
            key={photo}
            src={`data:image/jpeg;base64,${photo}`}
            rounded="md"
          />
        ))}
      </SimpleGrid>

      <ButtonGroup position="fixed" bottom={4} alignItems="center">
        <Button
          leftIcon={<House weight="bold" />}
          variant="outline"
          background="white"
          _dark={{
            background: "gray.800",
            _hover: {
              background: "gray.700",
            },
          }}
          colorScheme="blue"
          onClick={handleReturn}
        >
          {t("navButtons.returnHome")}
        </Button>
        <Button
          rightIcon={<DownloadSimple weight="bold" />}
          onClick={handleDownload}
          colorScheme="green"
          size="lg"
        >
          {t("navButtons.download")}
        </Button>
      </ButtonGroup>
    </>
  );
};
