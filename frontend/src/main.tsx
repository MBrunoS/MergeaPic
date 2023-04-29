import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./App";
import { AppProvider } from "./context/AppContext";
import "./i18n";

const rootElement = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </ChakraProvider>
  </React.StrictMode>
);
