import axios from "axios";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

export const MergeScreen: React.FC = () => {
  const { photos, overlay } = useContext(AppContext);

  useEffect(() => {
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
