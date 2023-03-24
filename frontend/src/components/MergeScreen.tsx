import axios from "axios";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useDataURItoBlob } from "../hooks";

export const MergeScreen: React.FC = () => {
  const { photos, overlay } = useContext(AppContext);

  useEffect(() => {
    const formData = new FormData();
    const encodedPhotos = photos.map((photo) => useDataURItoBlob(photo.src));
    const encodedOverlay = useDataURItoBlob(overlay.src);

    formData.append("photos", encodedPhotos.join(","));
    formData.append("overlay", encodedOverlay);

    axios
      .post(
        import.meta.env.VITE_API_URL,
        {
          photos,
          overlay,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
  }, []);

  return <div>Merging...</div>;
};
