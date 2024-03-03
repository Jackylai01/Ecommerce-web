import { Box, Flex } from '@chakra-ui/react';

import {
  loadClientToken,
  removeClientToken,
  saveClientToken,
} from '@helpers/token';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { resetClientAuth, setClientUserInfo } from '@reducers/client/auth';
import { clientDetailUserProfileAsync } from '@reducers/client/auth/actions';
import { apiClientUsersTokenRefresh } from '@services/client/client-auth/client-users';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ClientNavbar from './ClientNavbar';

type Props = {
  children?: React.ReactNode;
};

const ClientLayout = ({ children }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    userInfo,
    error: { refreshTokenError },
  } = useAppSelector((state) => state.clientAuth);

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const tokenData = loadClientToken();

      if (tokenData && tokenData.userInfo && tokenData.expirationDate) {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const expirationTimestamp = Math.floor(
          new Date(tokenData.expirationDate).getTime() / 1000,
        );
        const isTokenExpiringSoon =
          currentTimestamp > expirationTimestamp - 600;

        if (isTokenExpiringSoon) {
          try {
            const refreshTokenResponse = await apiClientUsersTokenRefresh();

            saveClientToken(refreshTokenResponse.result.data);
            dispatch(setClientUserInfo(refreshTokenResponse.result.data));
          } catch (error) {
            console.error('Error refreshing token:', error);
            dispatch(resetClientAuth());
            removeClientToken();
            router.push('/public/auth/login');
          }
        }
      }
    };

    checkTokenExpiration();
  }, [dispatch, router]);

  useEffect(() => {
    if (userInfo) {
      dispatch(clientDetailUserProfileAsync()).catch((error) => {
        if (error.response?.status === 401) {
          dispatch(resetClientAuth());
          router.push('/public/auth/login');
        }
      });
    }
  }, [dispatch, router, userInfo]);

  useEffect(() => {
    const tokenData = loadClientToken();
    if (tokenData && tokenData.userInfo) {
      dispatch(setClientUserInfo(tokenData));
    }
  }, [dispatch, router]);

  useEffect(() => {
    if (refreshTokenError) {
      dispatch(resetClientAuth());
      removeClientToken();
      router.push(`/public/auth/login`);
    }
  }, [refreshTokenError, dispatch, router]);

  return (
    <>
      <Flex direction='column'>
        <ClientNavbar />
        <Box>{children}</Box>
      </Flex>
    </>
  );
};

export default ClientLayout;
