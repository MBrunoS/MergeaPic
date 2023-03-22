import {
  Card,
  CardBody,
  chakra,
  Image,
  Text,
  VisuallyHiddenInput,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Preview } from "../@types";
import { useImagesUpload } from "../hooks/";
import { PreviewList } from "./PreviewList";

export const UploadCard: React.FC = () => {
  const { images, handleImagesChange } = useImagesUpload();
  const [previews, setPreviews] = useState<Preview[]>([]);

  useEffect(() => {
    const previews = images.map((image) => ({
      src: URL.createObjectURL(image),
      alt: image.name,
    }));
    setPreviews(previews);
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.src));
    };
  }, [images]);

  return (
    <Card w={{ base: "full", md: "50%" }}>
      <CardBody>
        {previews.length > 0 ? (
          <PreviewList items={previews} />
        ) : (
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
              (Max file size: 2MB)
            </Text>
            <VisuallyHiddenInput
              id="overlay"
              type="file"
              onChange={handleImagesChange}
              accept="image/*"
              multiple
            />
          </chakra.label>
        )}
      </CardBody>
    </Card>
  );
};
