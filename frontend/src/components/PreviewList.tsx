import { Image } from "@chakra-ui/react";
import React from "react";
import { Preview } from "../@types";

type PreviewListProps = {
  items: Preview[];
};

export const PreviewList: React.FC<PreviewListProps> = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <Image src={item.src} alt={item.alt} key={item.alt} />
      ))}
    </>
  );
};
