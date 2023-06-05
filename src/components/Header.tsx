import {
  StepSeparator,
  Box,
  Heading,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { AppContext } from "../context/AppContext";

export const Header: React.FC = () => {
  const { currentStep } = useContext(AppContext);
  const { t } = useTranslation();

  const steps = [
    { title: t("header.steps.uploadPhotos") },
    { title: t("header.steps.uploadOverlay") },
    { title: t("header.steps.edit") },
    { title: t("header.steps.merge") },
  ];

  return (
    <>
      <Box textAlign="center">
        <Heading
          color="blue.500"
          _dark={{
            color: "blue.300",
          }}
        >
          MergeaPic
        </Heading>
        <Text
          fontSize="lg"
          color="gray.500"
          _dark={{
            color: "gray.400",
          }}
        >
          {t("header.subtitle")}
        </Text>
      </Box>

      <Stepper index={currentStep} w={{ base: "full", md: "4xl" }} my={4}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </>
  );
};
