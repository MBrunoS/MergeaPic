import axios from "axios";
import { useContext, useEffect, useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { AppContext } from "../context/AppContext";
import {
  Box,
  Button,
  ButtonGroup,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { DownloadSimple, House } from "@phosphor-icons/react";
import { Steps } from "../@types";

export const MergeScreen: React.FC = () => {
  const { photos, overlay, setCurrentStep } = useContext(AppContext);
  const [mergedPhotos, setMergedPhotos] = useState<string[]>([]);

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
        setMergedPhotos(res.data.images);
      });
  }, []);

  function handleReturn() {
    setCurrentStep(Steps.Home);
  }

  function handleDownload() {
    const zip = new JSZip();

    mergedPhotos.forEach((photo, i) => {
      zip.file(`merged_photo_${i}.jpg`, photo, { base64: true });
    });

    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "merged_photos.zip");
    });
  }

  if (!mergedPhotos.length) {
    return <div>Merging...</div>;
  }

  return (
    <>
      <Text textAlign="center">
        The images have been merged. You can download them below.
      </Text>
      <SimpleGrid columns={[2, null, 3, 5]} spacing={4} maxW="4xl">
        {mergedPhotos.map((photo) => (
          <Image
            key={photo}
            src={`data:image/jpeg;base64,${photo}`}
            rounded="md"
          />
        ))}
      </SimpleGrid>

      <ButtonGroup position="fixed" bottom={4} alignItems="center">
        <Button
          leftIcon={<House weight="bold" />}
          variant="outline"
          background="white"
          colorScheme="blue"
          onClick={handleReturn}
        >
          Return to Home
        </Button>
        <Button
          rightIcon={<DownloadSimple weight="bold" />}
          onClick={handleDownload}
          colorScheme="green"
          size="lg"
        >
          Download All
        </Button>
      </ButtonGroup>
    </>
  );
};
