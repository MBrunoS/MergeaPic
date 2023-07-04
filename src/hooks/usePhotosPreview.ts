import { useContext, useState } from "react";
import { AppContext } from "../context";
import { PhotosPreview } from "../@types";

export function usePhotosPreview() {
  const { photos } = useContext(AppContext);

  const photosPreview = useState(() => {
    let photosPreview: PhotosPreview = {};
    for (const photo of photos) {
      photosPreview[photo.name] = {
        src: photo.src,
        name: photo.name,
        zoom: 1,
        crop: { x: 0, y: 0 },
      };
    }
    return photosPreview;
  });

  return photosPreview;
}
