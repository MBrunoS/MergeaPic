import {
  Flex,
  IconButton,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { X } from "@phosphor-icons/react";
import React from "react";
import { Preview } from "../@types";

type PreviewImagesProps = {
  images: Preview[];
  updateImages?: React.Dispatch<React.SetStateAction<Preview[]>>;
  variant?: "grid" | "list";
};

export const PreviewImages: React.FC<PreviewImagesProps> = ({
  images,
  updateImages,
  variant = "list",
}) => {
  function handleRemove(name: string) {
    if (!updateImages) return;
    const newImages = images.filter((image) => image.alt !== name);
    updateImages(newImages);
  }

  if (variant === "grid") {
    return (
      <SimpleGrid columns={[2, null, 3, 5]} spacing={4}>
        {images.map((item) => (
          <Image key={item.alt} src={item.src} alt={item.alt} rounded="md" />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <Stack maxW="4xl">
      {images.map((item) => (
        <Flex
          key={item.alt}
          align="center"
          gap={4}
          justify="space-between"
          rounded="md"
          backgroundColor="white"
          _dark={{ backgroundColor: "gray.800" }}
          overflow="hidden"
        >
          <Image
            src={item.src}
            alt={item.alt}
            w={{ base: "35%", md: "30%", lg: "20%" }}
          />
          <Text mr={updateImages ? 0 : 8}>{item.alt}</Text>
          {updateImages && (
            <IconButton
              colorScheme="red"
              aria-label="Remove"
              variant="ghost"
              icon={<X />}
              onClick={() => handleRemove(item.alt)}
              mr={4}
            />
          )}
        </Flex>
      ))}
    </Stack>
  );
};
