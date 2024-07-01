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
} from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { clientLogoutAsync } from '@reducers/client/auth/actions';
import router from 'next/router';
import { FaUser } from 'react-icons/fa';
import { Cart } from '../Cart/Cart';
import { Wishlist } from '../Wishlist/Wishlist';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.clientAuth.userInfo);

  const handleLogout = () => {
    dispatch(clientLogoutAsync());
  };

  return (
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
  );
};
