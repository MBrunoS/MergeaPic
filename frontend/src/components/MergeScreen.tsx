import { useContext, useEffect, useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { AppContext } from "../context/AppContext";
import {
  Button,
  ButtonGroup,
  Image,
  Progress,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { DownloadSimple, House } from "@phosphor-icons/react";
import { Steps } from "../@types";
import { useResponseBodyParser } from "../hooks";

export const MergeScreen: React.FC = () => {
  const { photos, overlay, setCurrentStep } = useContext(AppContext);
  const [mergedPhotos, setMergedPhotos] = useState<string[]>([]);
  const [counter, setCounter] = useState(0);
  const parser = useResponseBodyParser();

  const progress = (counter / photos.length) * 100;

  useEffect(() => {
    const apiCall = async () => {
      const formData = new FormData();

      formData.append("overlay", overlay);
      photos.forEach((photo) => {
        formData.append("photos", photo);
      });

      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        body: formData,
      });

      const chunks = parser.parse(response);

      for await (const chunk of chunks) {
        setCounter((prev) => prev + 1);
        setMergedPhotos((prev) => [...prev, chunk]);
      }
    };
    apiCall();
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

  if (counter === 0) {
    return (
      <>
        <div>Merging...</div>
        <Progress size="xs" isIndeterminate w="full" maxW="4xl" />
      </>
    );
  }

  return (
    <>
      {counter === photos.length && (
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          Merged {counter} photos
        </Text>
      )}
      <Progress size="xs" value={progress} w="full" maxW="4xl" />
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
