import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

export const Header: React.FC = () => {
  const { t } = useTranslation();
  return (
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
  );
};
