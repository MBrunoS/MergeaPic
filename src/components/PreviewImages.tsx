import { Image, SimpleGrid } from "@chakra-ui/react";
import React, { useContext } from "react";
import { EditContext } from "../context/";
import { CroppedImg } from "../@types";

type PreviewImagesProps = {
  canDelete?: boolean;
};

export const PreviewImages: React.FC<PreviewImagesProps> = ({
  canDelete = false,
}) => {
  const {
    setActiveImage,
    openModal,
    photosPreview: images,
    setPhotosPreview: setImages,
  } = useContext(EditContext);

  function handleClick(image: CroppedImg) {
    setActiveImage(image);
    openModal();
  }

  function handleRemove(name: string) {
    if (!canDelete) return;
    delete images[name];
    setImages(images);
  }

  return (
    <SimpleGrid columns={[2, null, 3, 5]} spacing={4} maxW="4xl">
      {Object.values(images).map((image) => (
        <Image
          key={image.name}
          src={image.src}
          alt={image.name}
          rounded="md"
          cursor="pointer"
          onClick={() => handleClick(image)}
        />
      ))}
    </SimpleGrid>
  );
};
