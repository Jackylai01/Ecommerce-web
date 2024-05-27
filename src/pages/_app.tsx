import { ChakraProvider } from '@chakra-ui/react';
import Layout from '@components/Layout';
import LogoutModal from '@components/Modal/LogoutModal';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { adminLogoutAsync } from '@reducers/admin/auth/actions';
import wrapper from '@store';
import '@styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { theme } from 'src/theme/theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const {
    userInfo,
    status: { loginLoading, loginSuccess, loginFailed, logoutSuccess },
  } = useAppSelector((state) => state.adminAuth);

  useEffect(() => {
    let newSocket: Socket;

    if (loginSuccess && userInfo?._id) {
      console.log('Attempting WebSocket connection...');
      newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
        transports: ['websocket'],
      });
      setSocket(newSocket);

      newSocket.on('connect', () => {
        console.log('WebSocket Connected');
        newSocket.emit('registerSession', userInfo._id);
      });

      newSocket.on('logout', () => {
        console.log('Received logout event');
        setLogoutModalOpen(true);
        dispatch(adminLogoutAsync());
      });

      newSocket.on('connect_error', (error) => {
        console.error('WebSocket connect_error:', error);
      });
    }

    return () => {
      if (newSocket) {
        newSocket.close();
        console.log('WebSocket Disconnected');
      }
    };
  }, [loginSuccess, userInfo, dispatch]);

  useEffect(() => {
    if (logoutSuccess && socket) {
      socket.close();
      setSocket(null);
      console.log('WebSocket Disconnected on logout');
    }
  }, [logoutSuccess, socket]);

  return (
    <>
      <Head>
        <title>電子商務系統</title>
      </Head>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
          <LogoutModal
            isOpen={isLogoutModalOpen}
            onClose={() => setLogoutModalOpen(false)}
          />
        </Layout>
      </ChakraProvider>
    </>
  );
};

export default wrapper.withRedux(MyApp);
