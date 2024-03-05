import { Box, useMediaQuery } from '@chakra-ui/react';
import { AsideRouterType, allAdminRouter } from '@fixtures/admin-router';
import { ADMIN_ROUTE } from '@fixtures/constants';
import { isAdminLoggedIn, loadAdminToken } from '@helpers/token';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { AuthResponse } from '@models/responses/user.res';
import { resetAdminAuth, setAdminUserInfo } from '@reducers/admin/auth';
import { adminRefreshTokenAsync } from '@reducers/admin/auth/actions';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Props = {
  children?: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [pageInfo, setPageInfo] = useState<AsideRouterType>();
  const [hasTriedRefreshing, setHasTriedRefreshing] = useState(false);
  const [isLargeScreen] = useMediaQuery('(min-width: 1400px)');

  const {
    userInfo,
    error: { refreshTokenError },
  } = useAppSelector((state) => state.adminAuth);

  // 判定token是否過期，過期就重新取得token。後端回傳到期的時間(UTC)
  //  state 來確保只嘗試刷新 token 一次

  const checkAndRefreshToken = () => {
    let refreshTokenTimeout;

    if (refreshTokenTimeout) {
      // 如果之前已經設定了計時器，先清除
      clearTimeout(refreshTokenTimeout);
    }

    if (!userInfo?.expirationDate) return;

    const expiration = new Date(userInfo.expirationDate);
    const currentTime = new Date();
    const timeBeforeExpiration = expiration.getTime() - currentTime.getTime();

    if (timeBeforeExpiration <= 30 * 1000 && !hasTriedRefreshing) {
      dispatch(adminRefreshTokenAsync());
      setHasTriedRefreshing(true);
    } else if (timeBeforeExpiration > 30 * 1000) {
      refreshTokenTimeout = setTimeout(() => {
        dispatch(adminRefreshTokenAsync());
        setHasTriedRefreshing(true);
      }, timeBeforeExpiration - 30 * 1000);
    }
  };

  // 如果有 token 就直接載入Redux 的 狀態到 store
  useEffect(() => {
    const storedData = loadAdminToken();
    if (storedData && storedData.userInfo) {
      const authResponse: AuthResponse = {
        accessToken: storedData.accessToken,
        refreshToken: storedData.refreshToken,
        userInfo: storedData.userInfo,
        expirationDate: storedData.expirationDate,
        currentSessionToken: storedData.currentSessionToken,
      };
      dispatch(setAdminUserInfo(authResponse));
    }
  }, [dispatch]);

  // 檢查 token 是否過期。usrInfo 裡面有個欄位是expirationDate
  useEffect(() => {
    checkAndRefreshToken();
  }, [checkAndRefreshToken, userInfo]);

  useEffect(() => {
    if (!isAdminLoggedIn() || (hasTriedRefreshing && !userInfo)) {
      router.push(`/${ADMIN_ROUTE}/auth/login`);
    }
  }, [userInfo, hasTriedRefreshing, router]);

  useEffect(() => {
    if (refreshTokenError) {
      dispatch(resetAdminAuth());
      router.push(`/${ADMIN_ROUTE}/auth/login`);
    }
  }, [refreshTokenError, dispatch, router]);

  useEffect(() => {
    const mainRouter = router.asPath.split('/')[2] ?? ADMIN_ROUTE;
    const findMainRouter = allAdminRouter.find(({ href }) =>
      mainRouter.includes(href),
    );
    setPageInfo(findMainRouter);
  }, [router]);

  return (
    <>
      <Head>
        <title>{pageInfo?.label && `${pageInfo?.label} - `}營運管理平台</title>
      </Head>
      <Box w='100%' bg='#172034'>
        <Box as='article' w='100%'>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default AdminLayout;
