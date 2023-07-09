import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { AppContext } from "../context";
import { PhotosPreview } from "../@types";

export function usePhotosPreview(): [
  PhotosPreview,
  Dispatch<SetStateAction<PhotosPreview>>
] {
  const { photos } = useContext(AppContext);
  const [photosPreview, setPhotosPreview] = useState<PhotosPreview>({});

  useEffect(() => {
    let previews: PhotosPreview = {};
    for (const photo of photos) {
      previews[photo.name] = {
        src: photo.src,
        name: photo.name,
        zoom: 1,
        crop: { x: 0, y: 0 },
      };
    }
    setPhotosPreview(previews);
  }, [photos]);

  return [photosPreview, setPhotosPreview];
}
