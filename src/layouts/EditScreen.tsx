import { Button, ButtonGroup } from "@chakra-ui/react";
import { ArrowLeft, ArrowsMerge } from "@phosphor-icons/react";
import { useContext } from "react";
import { ImageFile, Steps } from "../@types";
import { AppContext } from "../context/AppContext";
import { ImageModal, PreviewImages } from "../components";
import { useTranslation } from "react-i18next";

export const EditScreen: React.FC = () => {
  const { setOverlay, setCurrentStep } = useContext(AppContext);
  const { t } = useTranslation();

  function handleReturn() {
    setOverlay({} as ImageFile);
    setCurrentStep(Steps.Overlay);
  }

  function handleContinue() {
    setCurrentStep(Steps.Merge);
  }

  return (
    <>
      <PreviewImages />

      <ButtonGroup
        colorScheme="blue"
        position="fixed"
        bottom={4}
        alignItems="center"
      >
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
        <Button
          rightIcon={<ArrowsMerge weight="bold" />}
          onClick={handleContinue}
          size="lg"
        >
          {t("navButtons.merge")}
        </Button>
      </ButtonGroup>

      <ImageModal />
    </>
  );
};
