import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./App";
import { AppProvider } from "./context/AppContext";
import { theme } from "./theme";
import "./i18n";

const rootElement = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <AppProvider>
        <App />
      </AppProvider>
    </ChakraProvider>
  </React.StrictMode>
);
