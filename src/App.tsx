import { Stack } from "@chakra-ui/react";
import { useContext } from "react";
import { Steps } from "./@types";
import { Header } from "./components";
import {
  UploadScreen,
  EditScreen,
  OverlayScreen,
  MergeScreen,
} from "./layouts";
import { AppContext } from "./context/AppContext";

export function App() {
  const { currentStep } = useContext(AppContext);

  return (
    <Stack
      p={{ base: 4, md: 8, lg: 12 }}
      pb={{ base: 12, md: 16, lg: 20 }}
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

      {currentStep === Steps.Upload && <UploadScreen />}
      {currentStep === Steps.Overlay && <OverlayScreen />}
      {currentStep === Steps.Edit && <EditScreen />}
      {currentStep === Steps.Merge && <MergeScreen />}
    </Stack>
  );
}
