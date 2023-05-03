import { Button, ButtonGroup } from "@chakra-ui/react";
import { ArrowRight, House } from "@phosphor-icons/react";
import { useContext } from "react";
import { Steps } from "../@types";
import { AppContext } from "../context/AppContext";
import { PreviewImages } from "./PreviewImages";
import { useTranslation } from "react-i18next";

export const PreviewScreen: React.FC = () => {
  const { photos, setPhotos, setCurrentStep } = useContext(AppContext);
  const { t } = useTranslation();

  function handleReturn() {
    setPhotos([]);
    setCurrentStep(Steps.Home);
  }

  function handleContinue() {
    setCurrentStep(Steps.Overlay);
  }

  return (
    <>
      <PreviewImages images={photos} updateImages={setPhotos} />
      <ButtonGroup colorScheme="blue" position="fixed" bottom={4}>
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
          onClick={handleReturn}
        >
          {t("navButtons.return")}
        </Button>
        <Button
          rightIcon={<ArrowRight weight="bold" />}
          onClick={handleContinue}
        >
          {t("navButtons.continue")}
        </Button>
      </ButtonGroup>
    </>
  );
};
