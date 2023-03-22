import { Button, ButtonGroup } from "@chakra-ui/react";
import { ArrowRight, House } from "@phosphor-icons/react";
import { useContext } from "react";
import { Steps } from "../@types";
import { AppContext } from "../context/AppContext";
import { PreviewImages } from "./PreviewImages";

export const PreviewScreen: React.FC = () => {
  const { photos, setPhotos, setCurrentStep } = useContext(AppContext);

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
          onClick={handleReturn}
        >
          Return
        </Button>
        <Button
          rightIcon={<ArrowRight weight="bold" />}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </ButtonGroup>
    </>
  );
};
