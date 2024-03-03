import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Collapse,
  Flex,
  IconButton,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import { PUBLIC_ROUTE } from '@fixtures/constants';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { resetClientAuth, resetClientAuthStatus } from '@reducers/client/auth';
import { clientLogoutAsync } from '@reducers/client/auth/actions';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const {
    userInfo,
    status: { logoutLoading, logoutSuccess, logoutFailed },
    error: { logoutError },
  } = useAppSelector((state) => state.clientAuth);

  const isLoggedIn = !!userInfo;

  const handleLogout = () => {
    dispatch(resetClientAuth());
    dispatch(clientLogoutAsync());
  };

  useEffect(() => {
    if (logoutSuccess) {
      toast({
        title: '登出成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push('/public/auth/login');
    }

    if (logoutFailed && logoutError) {
      toast({
        title: '登出失败',
        description: logoutError,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    return () => {
      dispatch(resetClientAuthStatus());
    };
  }, [logoutSuccess, logoutFailed, logoutError, router, toast]);

  return (
    <LoadingLayout isLoading={logoutLoading}>
      <Flex
        bg='gray.100'
        color='black'
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        align={'center'}
        justify={'space-between'}
        p='1.5rem'
        background='none'
        fontSize='lg'
      >
        <Link href='/'>LOGO</Link>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={onToggle}
          bg='none'
          _hover={{ bg: 'none' }}
          _active={{ bg: 'none' }}
        />
        <Stack
          direction={'row'}
          display={{ base: 'none', md: 'flex' }}
          width={{ md: 'auto' }}
          flexGrow={1}
          justify={'flex-end'}
          spacing={6}
        >
          <Link href='/storyMap'>
            <Text cursor='pointer'>故事地圖</Text>
          </Link>
          <Text cursor='pointer'>購買方案</Text>
          <Text cursor='pointer'>使用說明</Text>
          {isLoggedIn ? (
            <>
              <Link href='/client'>
                <Text cursor='pointer'>後台管理</Text>
              </Link>
              <Box as='span' cursor='pointer' onClick={handleLogout}>
                登出
              </Box>
            </>
          ) : (
            <Link href={`${PUBLIC_ROUTE}/auth/login`}>
              <Box as='span' cursor='pointer'>
                登入
              </Box>
            </Link>
          )}
        </Stack>
      </Flex>
      {isMobile && (
        <Collapse in={isOpen} animateOpacity>
          <Stack
            bg='black'
            p={4}
            display='flex'
            spacing={4}
            cursor='pointer'
            color='white'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <Link href='/'>故事地圖</Link>
            <Link href='/'>購買方案</Link>
            <Link href='/'>使用說明</Link>
            {isLoggedIn ? (
              <Box as='span' cursor='pointer' onClick={handleLogout}>
                登出
              </Box>
            ) : (
              <Link href={`${PUBLIC_ROUTE}/auth/login`}>
                <Box as='span' cursor='pointer'>
                  登入
                </Box>
              </Link>
            )}
          </Stack>
        </Collapse>
      )}
    </LoadingLayout>
  );
};

export default Navbar;
