import { Stack } from "@chakra-ui/react";
import { useContext } from "react";
import { Header, PreviewList } from "./components";
import { UploadImagesCard } from "./components/UploadImagesCard";
import { AppContext } from "./context/AppContext";

export function App() {
  const { images } = useContext(AppContext);

  return (
    <Stack
      p={10}
      minH="100vh"
      alignItems="center"
      justifyContent="center"
      gap={6}
      bg="gray.100"
      _dark={{
        bg: "gray.900",
      }}
    >
      <Header />

      {images.length === 0 ? <UploadImagesCard /> : <PreviewList />}
    </Stack>
  );
}
