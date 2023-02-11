import { createGetInitialProps } from '@mantine/next';
import {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

const getInitialProps = createGetInitialProps();

const Document = () => (
  <Html lang="pt-BR">
    <Head />
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

Document.getInitialProps = getInitialProps;

export default Document;
