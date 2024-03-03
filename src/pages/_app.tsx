import { ChakraProvider } from '@chakra-ui/react';
import Layout from '@components/Layout';
import Navbar from '@components/Navbar';
import theme from '@fixtures/theme';
import wrapper from '@store';
import '@styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const hideComponent =
    router.pathname.includes('/login') || router.pathname.includes('/register');

  return (
    <>
      <Head>
        <title>土地調查系統</title>
      </Head>
      <ChakraProvider theme={theme}>
        {!hideComponent && <Navbar />}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
};

export default wrapper.withRedux(MyApp);
