import { Box, Flex, Stack } from '@chakra-ui/react';
import { navItems } from '@helpers/products';
import useAppSelector from '@hooks/useAppSelector';

import useAppDispatch from '@hooks/useAppDispatch';
import { clientLogoutAsync } from '@reducers/client/auth/actions';
import Link from 'next/link';
import { AppLogo } from '../AppLogo';
import { Search } from '../Search/Search';

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
      flex={1}
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
    </Flex>
  );
}
