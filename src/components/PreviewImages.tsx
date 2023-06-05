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

type PreviewImagesProps = {
  images: File[];
  updateImages?: React.Dispatch<React.SetStateAction<File[]>>;
  variant?: "grid" | "list";
};

export const PreviewImages: React.FC<PreviewImagesProps> = ({
  images,
  updateImages,
  variant = "list",
}) => {
  function handleRemove(name: string) {
    if (!updateImages) return;
    const newImages = images.filter((image) => image.name !== name);
    updateImages(newImages);
  }

  if (variant === "grid") {
    return (
      <SimpleGrid columns={[2, null, 3, 5]} spacing={4} maxW="4xl">
        {images.map((image) => (
          <Image
            key={image.name}
            src={URL.createObjectURL(image)}
            alt={image.name}
            rounded="md"
            cursor="pointer"
          />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <Stack maxW="4xl">
      {images.map((image) => (
        <Flex
          key={image.name}
          align="center"
          gap={4}
          justify="space-between"
          rounded="md"
          backgroundColor="white"
          _dark={{ backgroundColor: "gray.800" }}
          overflow="hidden"
        >
          <Image
            src={URL.createObjectURL(image)}
            alt={image.name}
            w={{ base: "35%", md: "30%", lg: "20%" }}
          />
          <Text mr={updateImages ? 0 : 8}>{image.name}</Text>
          {updateImages && (
            <IconButton
              colorScheme="red"
              aria-label="Remove"
              variant="ghost"
              icon={<X />}
              onClick={() => handleRemove(image.name)}
              mr={4}
            />
          )}
        </Flex>
      ))}
    </Stack>
  );
};
