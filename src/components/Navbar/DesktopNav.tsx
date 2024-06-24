import { Box, Button, Flex, Stack } from '@chakra-ui/react';
import { navItems } from '@helpers/products';
import useAppSelector from '@hooks/useAppSelector';

import useAppDispatch from '@hooks/useAppDispatch';
import { clientLogoutAsync } from '@reducers/client/auth/actions';
import Link from 'next/link';
import router from 'next/router';
import { AppLogo } from '../AppLogo';
import { Cart } from '../Cart/Cart';
import { Search } from '../Search/Search';
import { Wishlist } from '../Wishlist/Wishlist';

export function DesktopNav() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.clientAuth.userInfo);

  const handleLogout = () => {
    dispatch(clientLogoutAsync());
  };

  return (
    <Flex
      justify='space-between'
      alignItems='center'
      display={{ base: 'none', lg: 'flex' }}
      px='2rem'
      py='1rem'
      borderBottom='1px'
      borderColor='gray.200'
    >
      <Stack direction='row' gap={6} flex={1} alignItems='center'>
        <Box mr='1rem'>
          <AppLogo />
        </Box>

        {navItems.map((navItem) => (
          <Box key={navItem.label} color='black'>
            <Link href={navItem.href}>{navItem.label}</Link>
          </Box>
        ))}

        <Search />
      </Stack>
      <Stack direction='row' spacing={2}>
        <Wishlist />
        <Cart />
        {userInfo ? (
          <Button colorScheme='blue' onClick={handleLogout}>
            登出
          </Button>
        ) : (
          <Button
            colorScheme='blue'
            onClick={() => router.push('/public/auth/login')}
          >
            登入
          </Button>
        )}
      </Stack>
    </Flex>
  );
}
