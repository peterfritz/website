import type { GetServerSidePropsContext } from 'next';
import type { AppProps } from 'next/app';

import { ColorSchemeProvider, MantineProvider, type ColorScheme } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { JetBrains_Mono as JetBrainsMono } from '@next/font/google';
// import { JetBrains_Mono as JetBrainsMono, Roboto } from '@next/font/google';
import { printCredits, theme as brandTheme } from '@peterfritz/brand';
import { Analytics } from '@vercel/analytics/react';
import { getCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

import Layout from '@/components/Layout';
import Spotlight from '@/components/Spotlight';
import '@/styles/globals.css';

const jetBrainsMono = JetBrainsMono({
  subsets: ['latin'],
  display: 'swap',
});
// const roboto = Roboto({
//   subsets: ['latin'],
//   weight: ['400', '700'],
// });

const App = ({ Component, pageProps, theme }: AppProps & { theme: ColorScheme | 'system' }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(theme === 'system' ? 'dark' : theme);
  const systemTheme = useColorScheme();

  const toggleColorScheme = (value?: ColorScheme) => {
    const newColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');

    setColorScheme(newColorScheme);

    setCookie('theme', newColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  useEffect(() => {
    if (theme === 'system') {
      toggleColorScheme(systemTheme);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, systemTheme]);

  useEffect(() => {
    printCredits();
  }, []);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
          fontFamily: jetBrainsMono.style.fontFamily,
          fontFamilyMonospace: jetBrainsMono.style.fontFamily,
          headings: {
            fontFamily: jetBrainsMono.style.fontFamily,
          },
          defaultGradient: {
            deg: 45,
            from: brandTheme.colors.red,
            to: brandTheme.colors.blue,
          },
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Spotlight />
      </MantineProvider>
      <Analytics />
    </ColorSchemeProvider>
  );
};

App.getInitialProps = ({ ctx }: {ctx: GetServerSidePropsContext}) => ({
  theme: getCookie('theme', ctx) || 'system',
});

export default App;
