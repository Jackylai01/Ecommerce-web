import { ChakraProvider } from '@chakra-ui/react';
import Layout from '@components/Layout';
import wrapper from '@store';
import '@styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import theme from 'src/theme/theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>電子商務系統</title>
      </Head>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
};

export default wrapper.withRedux(MyApp);
