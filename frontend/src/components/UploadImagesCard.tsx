import {
  Card,
  CardBody,
  chakra,
  Text,
  VisuallyHiddenInput,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const UploadImagesCard: React.FC = () => {
  const { handleImagesChange } = useContext(AppContext);

  return (
    <Card w={{ base: "full", md: "50%" }}>
      <CardBody>
        <chakra.label
          display="flex"
          htmlFor="overlay"
          cursor="pointer"
          fontSize="md"
          borderWidth={2}
          borderStyle="dashed"
          rounded="md"
          p={6}
          color="gray.600"
          _dark={{
            color: "gray.200",
          }}
          _hover={{
            color: "blue.400",
            _dark: {
              color: "blue.300",
            },
          }}
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Text as="span">Click here to choose the photos</Text>
          <Text as="span" fontSize="sm">
            (Max number of files: 20 / Max file size: 2MB)
          </Text>
          <VisuallyHiddenInput
            id="overlay"
            type="file"
            onChange={handleImagesChange}
            accept="image/*"
            multiple
          />
        </chakra.label>
      </CardBody>
    </Card>
  );
};
