import { Button, ButtonGroup, Flex, Stack, Text } from "@chakra-ui/react";
import { ArrowLeft, UploadSimple } from "@phosphor-icons/react";
import { useContext } from "react";
import { Steps } from "../@types";
import { AppContext } from "../context/AppContext";
import { PreviewImages } from "./PreviewImages";

export const ConfirmScreen: React.FC = () => {
  const { photos, setCurrentStep, overlay } = useContext(AppContext);

  function handleReturn() {
    setCurrentStep(Steps.Overlay);
  }

  function handleContinue() {
    setCurrentStep(Steps.Upload);
  }

  return (
    <>
      <Stack maxW="4xl">
        <Text>Overlay:</Text>
        <Flex px={[8, null, 12, 16]} align="center">
          <PreviewImages images={[overlay]} />
        </Flex>

        <Text>Photos:</Text>
        <PreviewImages images={photos} variant="grid" />
      </Stack>

      <ButtonGroup colorScheme="blue" position="fixed" bottom={4}>
        <Button
          leftIcon={<ArrowLeft weight="bold" />}
          variant="outline"
          background="white"
          onClick={handleReturn}
        >
          Return
        </Button>
        <Button
          rightIcon={<UploadSimple weight="bold" />}
          onClick={handleContinue}
        >
          Upload
        </Button>
      </ButtonGroup>
    </>
  );
};
