import { Flex, IconButton, Image, Stack, Text } from "@chakra-ui/react";
import { X } from "@phosphor-icons/react";
import React, { useContext } from "react";
import { Preview } from "../@types";
import { AppContext } from "../context/AppContext";

export const PreviewList: React.FC = () => {
  const { previews, setPreviews } = useContext(AppContext);

  function handleRemove(name: string) {
    const newPreviews = previews.filter((preview) => preview.alt !== name);
    setPreviews(newPreviews);
  }

  return (
    <Stack maxW="4xl">
      {previews.map((item) => (
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
          <Text>{item.alt}</Text>
          <IconButton
            colorScheme="red"
            aria-label="Remove"
            variant="ghost"
            icon={<X />}
            onClick={() => handleRemove(item.alt)}
            mr={4}
          />
        </Flex>
      ))}
    </Stack>
  );
};
