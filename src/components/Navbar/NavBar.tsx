import {
  Box,
  Flex,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useToast,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { clientLogoutAsync } from '@reducers/client/auth/actions';
import router from 'next/router';
import { useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { Cart } from '../Cart/Cart';
import { Wishlist } from '../Wishlist/Wishlist';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const {
    userInfo,
    status: { logoutLoading, logoutSuccess, logoutFailed },
  } = useAppSelector((state) => state.clientAuth);

  const handleLogout = () => {
    dispatch(clientLogoutAsync());
  };

  useEffect(() => {
    if (logoutSuccess) {
      toast({
        title: '成功登出',
        description: '您已成功登出。',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      router.push('/public/auth/login');
    } else if (logoutFailed) {
      toast({
        title: '登出失敗',
        description: '登出過程中出現問題，請稍後再試。',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [logoutSuccess, logoutFailed, toast, router]);

  return (
    <LoadingLayout isLoading={logoutLoading}>
      <Box className='navbar-wrapper' h='120px'>
        <Box pos='fixed' w='100%' bgColor='white' mb='1rem' zIndex={10}>
          <Flex justify='space-between' alignItems='center'>
            <DesktopNav />
            <MobileNav />
            <Stack direction='row' spacing={2} alignItems='center'>
              <Wishlist />
              <Cart />
              {userInfo ? (
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<FaUser />}
                    variant='ghost'
                    color='black'
                    mr='1rem'
                    _hover={{ bg: 'transparent' }}
                  />
                  <MenuList>
                    <MenuItem>
                      <Link href='/client'>會員管理</Link>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>登出</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <IconButton
                  icon={<FaUser />}
                  variant='ghost'
                  color='black'
                  _hover={{ bg: 'transparent' }}
                  onClick={() => router.push('/public/auth/login')}
                  aria-label='Login'
                />
              )}
            </Stack>
          </Flex>
        </Box>
      </Box>
    </LoadingLayout>
  );
};
