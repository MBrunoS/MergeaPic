import { Button, ButtonGroup, Flex, Stack, Text } from "@chakra-ui/react";
import { ArrowLeft, ArrowsMerge } from "@phosphor-icons/react";
import { useContext } from "react";
import { Steps } from "../@types";
import { AppContext } from "../context/AppContext";
import { PreviewImages } from "./PreviewImages";
import { useTranslation } from "react-i18next";

export const ConfirmScreen: React.FC = () => {
  const { photos, overlay, setCurrentStep } = useContext(AppContext);
  const { t } = useTranslation();

  function handleReturn() {
    setCurrentStep(Steps.Overlay);
  }

  function handleContinue() {
    setCurrentStep(Steps.Merge);
  }

  return (
    <>
      <Stack maxW="4xl">
        <Text>{t("confirmScreen.overlay")}</Text>
        <Flex px={[8, null, 12, 16]} align="center">
          {overlay.name && <PreviewImages images={[overlay]} />}
        </Flex>

        <Text>{t("confirmScreen.photos")}</Text>
        <PreviewImages images={photos} variant="grid" />
      </Stack>

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
    </>
  );
};
