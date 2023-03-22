import { Button, ButtonGroup, Stack } from "@chakra-ui/react";
import { useContext } from "react";
import { ArrowRight, House } from "@phosphor-icons/react";
import { Header, PreviewList } from "./components";
import { UploadImagesCard } from "./components/UploadImagesCard";
import { AppContext } from "./context/AppContext";

export function App() {
  const { previews, setPreviews } = useContext(AppContext);

  function handleReturn() {
    setPreviews([]);
  }

  function handleContinue() {}

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

      {previews.length === 0 ? (
        <UploadImagesCard />
      ) : (
        <>
          <PreviewList />
          <ButtonGroup colorScheme="blue" position="fixed" bottom={4}>
            <Button
              leftIcon={<House weight="bold" />}
              variant="outline"
              background="white"
              onClick={handleReturn}
            >
              Return
            </Button>
            <Button
              rightIcon={<ArrowRight weight="bold" />}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </ButtonGroup>
        </>
      )}
    </Stack>
  );
}
