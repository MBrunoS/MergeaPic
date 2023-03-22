import { Image } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { Preview } from "../@types";
import { AppContext } from "../context/AppContext";

export const PreviewList: React.FC = () => {
  const [previews, setPreviews] = React.useState<Preview[]>([]);
  const { images } = useContext(AppContext);

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
    <>
      {previews.map((item) => (
        <Image src={item.src} alt={item.alt} key={item.alt} />
      ))}
    </>
  );
};
