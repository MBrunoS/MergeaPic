import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

export const Header: React.FC = () => {
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
        Simplify photos overlay merge
      </Text>
    </Box>
  );
};
