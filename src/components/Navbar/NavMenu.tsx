import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import { navItems } from '@helpers/products';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { clientLogoutAsync } from '@reducers/client/auth/actions';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { VscListFlat } from 'react-icons/vsc';
import { AppLogo } from '../AppLogo';

export const NavMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef: any = useRef();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userInfo = useAppSelector((state) => state.clientAuth.userInfo);

  const handleLogout = () => {
    dispatch(clientLogoutAsync());
    onClose();
  };

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        <VscListFlat />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <AppLogo />
          </DrawerHeader>
          <Divider />

          <DrawerBody>
            {navItems.map((navItem) => (
              <Link href={navItem.href} key={navItem.label}>
                <Box
                  p='0.5rem'
                  _hover={{ bgColor: 'brand.primaryLight', color: 'white' }}
                  onClick={onClose}
                >
                  {navItem.label}
                </Box>
              </Link>
            ))}
          </DrawerBody>

          <DrawerFooter>
            {userInfo ? (
              <Button
                bg='blue.600'
                color='white'
                _hover={{ bg: 'blue.700' }}
                onClick={handleLogout}
              >
                登出
              </Button>
            ) : (
              <Button
                colorScheme='blue'
                color='white'
                _hover={{ bg: 'green.700' }}
                onClick={() => {
                  router.push('/public/auth/login');
                  onClose();
                }}
              >
                登入
              </Button>
            )}
            <Button variant='outline' ml={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
