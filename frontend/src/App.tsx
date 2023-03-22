import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Text,
  Icon,
  VisuallyHidden,
  chakra,
} from "@chakra-ui/react";
import { Header } from "./components";
import { UploadCard } from "./components/UploadCard";

export function App() {
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

      <UploadCard />
    </Stack>
  );
}
