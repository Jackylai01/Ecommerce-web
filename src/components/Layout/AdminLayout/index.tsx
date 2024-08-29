import { Box, Flex, Portal, useDisclosure } from '@chakra-ui/react';
import MessageModal from '@components/Modal/MessageModal';
import { AsideRouterType, allAdminRouter } from '@fixtures/admin-router';
import { ADMIN_ROUTE } from '@fixtures/constants';
import { isAdminLoggedIn, loadAdminToken } from '@helpers/token';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { resetAdminAuth, setAdminUserInfo } from '@reducers/admin/auth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAdminColorMode } from 'src/context/colorMode';
import { default as routes } from 'src/routes';
import LoadingLayout from '../LoadingLayout';
import MainPanel from '../MainPanel';
import AdminNavbar from './AdminNavbar/AdminNavbar';
import Configurator from './Configurator';
import FixedPlugin from './FixedPlugin';
import Sidebar from './Sidebar';

type Props = {
  children?: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  const router = useRouter();
  const currentPath = router.pathname;
  const dispatch = useAppDispatch();
  const { colorMode } = useAdminColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pageInfo, setPageInfo] = useState<AsideRouterType>();
  const [hasTriedRefreshing, setHasTriedRefreshing] = useState(false);
  const [sidebarVariant, setSidebarVariant] = useState('transparent');
  const [fixed, setFixed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');

  const {
    userInfo,
    status: { modifyProfileFailed, modifyProfileLoading, modifyProfileSuccess },
    error: { refreshTokenError, modifyProfileError },
  } = useAppSelector((state) => state.adminAuth);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const tokenInfo = loadAdminToken();
    if (tokenInfo && !userInfo) {
      dispatch(setAdminUserInfo(tokenInfo));
    }
  }, [dispatch, userInfo]);

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

  const getActiveNavbar = (routes: any) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].path && currentPath === routes[i].layout + routes[i].path) {
        return routes[i].name;
      }
      if (routes[i].views) {
        for (let j = 0; j < routes[i].views.length; j++) {
          if (currentPath === routes[i].layout + routes[i].views[j].path) {
            return routes[i].views[j].name;
          }
        }
      }
    }
    return 'DashBoard page';
  };

  useEffect(() => {
    if (modifyProfileSuccess) {
      setIsModalOpen(true);
      setModalContent('編輯個人資料成功！');
    }

    if (modifyProfileFailed) {
      setIsModalOpen(true);
      setModalContent('');
    }
  }, [modifyProfileFailed, modifyProfileSuccess]);

  useEffect(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <Head>
        <title>{pageInfo?.label && `${pageInfo?.label} - `}營運管理平台</title>
      </Head>
      <Flex
        w='100%'
        h='100vh'
        justifyContent='space-between'
        bg={colorMode === 'light' ? 'gray.50' : 'gray.800'}
      >
        <Box>
          <Sidebar
            routes={routes}
            sidebarVariant={sidebarVariant}
            currentPath={router.pathname}
          />
        </Box>
        <MainPanel
          w={{
            base: '100%',
            xl: 'calc(100% - 275px)',
          }}
          mt='5rem'
        >
          <Box as='article'>
            <Portal>
              <AdminNavbar
                secondary={getActiveNavbar(routes)}
                onOpen={onOpen}
                fixed={fixed}
              />
            </Portal>
            <LoadingLayout isLoading={modifyProfileLoading}>
              {children}
            </LoadingLayout>
          </Box>
        </MainPanel>
        <Portal>
          <FixedPlugin
            secondary={getActiveNavbar(routes)}
            fixed={fixed}
            onOpen={onOpen}
          />
        </Portal>
        <Configurator
          secondary={getActiveNavbar(routes)}
          isOpen={isOpen}
          isChecked={fixed}
          onClose={onClose}
          onSwitch={(value: any) => {
            setFixed(value);
          }}
          onOpaque={() => setSidebarVariant('opaque')}
          onTransparent={() => setSidebarVariant('transparent')}
        />
      </Flex>
      <MessageModal
        title='編輯個人資料'
        isActive={isModalOpen}
        error={modifyProfileError}
        onClose={handleCloseModal}
      >
        {modalContent}
      </MessageModal>
    </>
  );
};

export default AdminLayout;
