import { Box, Spinner, Text } from '@chakra-ui/react';
import { saveClientToken } from '@helpers/token'; // Helper to save token
import useAppDispatch from '@hooks/useAppDispatch';
import { setClientUserInfo } from '@reducers/client/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LoginSuccess = () => {
  const router = useRouter();
  const { token, userInfo } = router.query;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token && userInfo) {
      try {
        // 解析 userInfo
        const parsedUserInfo = JSON.parse(
          decodeURIComponent(userInfo as string),
        );

        if (parsedUserInfo) {
          dispatch(setClientUserInfo(parsedUserInfo));
        }

        // 構建完整的 AuthResponse 對象
        const authResponse = {
          accessToken: token as string,
          refreshToken: '', // 可以由後端返回或在後續流程中處理
          expirationDate: new Date(
            Date.now() + 24 * 60 * 60 * 1000,
          ).toISOString(), // 假設 1 天有效期
          userInfo: parsedUserInfo,
          currentSessionToken: '', // 可選
        };

        // 保存完整的 AuthResponse 對象
        saveClientToken(authResponse);

        window.location.href = '/';
      } catch (error) {
        console.error('Error parsing user info:', error);
      }
    }
  }, [token, userInfo, router, dispatch]);

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      height='100vh'
    >
      <Spinner size='xl' color='teal.500' />
      <Text mt={4} fontSize='lg'>
        登入成功，正在重定向...
      </Text>
    </Box>
  );
};

export default LoginSuccess;
