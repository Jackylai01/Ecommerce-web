import { saveClientToken } from '@helpers/token'; // Helper to save token
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LoginSuccess = () => {
  const router = useRouter();
  const { token, userInfo } = router.query;

  useEffect(() => {
    if (token && userInfo) {
      try {
        // 解析 userInfo
        const parsedUserInfo = JSON.parse(
          decodeURIComponent(userInfo as string),
        );

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

        // 導向首頁
        router.push('/');
      } catch (error) {
        console.error('Error parsing user info:', error);
      }
    }
  }, [token, userInfo, router]);

  return <div>登入成功，正在重定向...</div>;
};

export default LoginSuccess;
