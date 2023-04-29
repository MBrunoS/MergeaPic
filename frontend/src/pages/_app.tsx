import type { AppProps } from "next/app";
import { appWithI18Next } from "ni18n";
import { ni18nConfig } from "../../ni18n.config";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProvider } from "../context/AppContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </ChakraProvider>
  );
}

export default appWithI18Next(MyApp, ni18nConfig);
