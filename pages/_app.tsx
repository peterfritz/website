import type { AppProps } from "next/app";
import { useEffect } from "react";
import {
  Button,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import { NextIntlProvider } from "next-intl";
import { RouterTransition } from "../components/RouterTransition";
import { LinkProvider } from "../context/LinkContext";
import Spotlight from "../components/Spotlight";
import SEOTags from "../components/SEOTags";

import "../styles/globals.css";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useEffect(() => {
    console.log(
      "By %cptr",
      `background: linear-gradient(to right, #FF033E 0%, #FA0442 4.7%, #F40646 8.9%, #ED084C 12.8%, #E60A52 16.56%, #DC0C58 20.37%, #D20F61 24.4%, #C5136A 28.83%, #B71675 33.84%, #A61B82 39.6%, #932091 46.3%, #7D26A2 54.1%, #632DB5 63.2%, #4735CB 73.76%, #273DE4 85.97%, #0347FF 100%); padding: 0.5rem; margin: 0; border-radius: 0.25rem; color: #f2f2f2; font-weight: 600; margin-bottom: 2.5px`,
      "https://peterfritz.dev"
    );
  }, []);

  return (
    <div className="px-3">
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <NextIntlProvider messages={pageProps.messages}>
            <NotificationsProvider>
              <LinkProvider>
                <Spotlight>
                  <SEOTags />
                  <RouterTransition />
                  <Button
                    component="a"
                    href="#main"
                    styles={{
                      root: {
                        position: "fixed",
                        left: "50%",
                        transition: "opacity 0.25s, transform 0.5s",
                        transform: "translateX(-50%) translateY(-5rem)",
                        opacity: "0%",
                        pointerEvents: "none",
                        cursor: "initial",
                        "&:focus-visible": {
                          transform: "translateX(-50%) translateY(0.75rem)",
                          opacity: "100%",
                          pointerEvents: "auto",
                          cursor: "pointer",
                        },
                      },
                    }}
                  >
                    Skip to content
                  </Button>
                  <Component {...pageProps} />
                  <Footer />
                </Spotlight>
              </LinkProvider>
            </NotificationsProvider>
          </NextIntlProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}

export default MyApp;
