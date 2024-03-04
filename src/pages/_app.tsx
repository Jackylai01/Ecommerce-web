import { ChakraProvider } from '@chakra-ui/react';
import Layout from '@components/Layout';
import { Navbar } from '@components/Navbar/NavBar';
import theme from '@fixtures/theme';
import wrapper from '@store';
import '@styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>電子商務系統</title>
      </Head>
      <ChakraProvider theme={theme}>
        <Navbar />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
};

export default wrapper.withRedux(MyApp);
