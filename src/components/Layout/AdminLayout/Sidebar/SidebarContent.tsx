import {
  Box,
  Button,
  Link as ChakraLink,
  Flex,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react';
import IconBox from '@components/Icons/IconBox';
import { CreativeTimLogo } from '@components/Icons/Icons';
import { ADMIN_ROUTE } from '@fixtures/constants';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAdminColorMode } from 'src/context/colorMode';
import { Separator } from '../Separator';

interface SideBarContentType {
  logoText: string;
  routes: any;
  display?: string;
  sidebarVariant?: any;
  currentPath: string;
}

const SidebarContent = ({
  logoText,
  routes,
  currentPath,
}: SideBarContentType) => {
  const router = useRouter();
  const { colorMode } = useAdminColorMode();

  const activeBg = colorMode === 'light' ? 'white' : 'gray.700';
  const inactiveBg = colorMode === 'light' ? 'gray.500' : 'gray.700';
  const activeColor = colorMode === 'light' ? 'gray.700' : 'white';
  const inactiveColor = colorMode === 'light' ? 'gray.400' : 'gray.400';

  const activeRoute = (routePath: string) => {
    if (
      routePath === '/' &&
      (router.pathname === ADMIN_ROUTE || router.pathname === `${ADMIN_ROUTE}/`)
    ) {
      return true;
    }

    if (router.pathname === routePath) {
      return true;
    }

    if (
      router.pathname.includes('/categories') &&
      routePath.includes('/products')
    ) {
      return true;
    }

    if (router.pathname.includes('/member') && routePath.includes('/tables')) {
      return true;
    }

    return router.pathname === routePath;
  };

  const links = routes.map((prop: any, key: number) => {
    const isActive = activeRoute(`${prop.layout}${prop.path}`);
    if (prop.category) {
      return (
        <div key={prop.name}>
          <Text
            color={activeColor}
            fontWeight='bold'
            mb={{ xl: '12px' }}
            mx='auto'
            py='12px'
            fontSize='20px'
          >
            {prop.name}
          </Text>
          {prop.views.map((viewProp: any, viewKey: number) => (
            <Link
              href={viewProp.layout + viewProp.path}
              passHref
              key={`view-${viewKey}`}
            >
              <ChakraLink w='100%'>
                <Button
                  boxSize='initial'
                  justifyContent='flex-start'
                  alignItems='center'
                  bg={isActive ? 'teal.300' : 'transparent'}
                  color={isActive ? 'white' : 'gray.400'}
                  mb={{ xl: '12px' }}
                  mx={{ xl: 'auto' }}
                  ps={{ sm: '10px', xl: '16px' }}
                  py='12px'
                  borderRadius='15px'
                  _active={{
                    bg: 'inherit',
                    transform: 'none',
                    borderColor: 'transparent',
                  }}
                  _focus={{ boxShadow: 'none' }}
                >
                  <Flex>
                    <IconBox
                      bg={
                        activeRoute(viewProp.layout + viewProp.path)
                          ? 'teal.300'
                          : inactiveBg
                      }
                      color='white'
                      h='30px'
                      w='30px'
                      me='12px'
                    >
                      <Icon as={viewProp.icon} />
                    </IconBox>
                    <Text
                      color={
                        activeRoute(viewProp.layout + viewProp.path)
                          ? activeColor
                          : inactiveColor
                      }
                      my='auto'
                      fontSize='sm'
                    >
                      {viewProp.name}
                    </Text>
                  </Flex>
                </Button>
              </ChakraLink>
            </Link>
          ))}
        </div>
      );
    }

    return (
      <Link href={prop.layout + prop.path} passHref key={key}>
        <ChakraLink w='100%'>
          <Button
            boxSize='initial'
            justifyContent='flex-start'
            alignItems='center'
            bg={activeRoute(prop.layout + prop.path) ? activeBg : 'transparent'}
            mb={{ xl: '12px' }}
            mx={{ xl: 'auto' }}
            ps={{ sm: '10px', xl: '16px' }}
            py='12px'
            borderRadius='15px'
            _active={{
              bg: 'inherit',
              transform: 'none',
              borderColor: 'transparent',
            }}
            _focus={{ boxShadow: 'none' }}
          >
            <Flex>
              <IconBox
                bg={
                  activeRoute(prop.layout + prop.path) ? 'teal.300' : inactiveBg
                }
                color='white'
                h='30px'
                w='30px'
                me='12px'
              >
                <Icon as={prop.icon} />
              </IconBox>
              <Text
                color={
                  activeRoute(prop.layout + prop.path)
                    ? activeColor
                    : inactiveColor
                }
                my='auto'
                fontSize='sm'
              >
                {prop.name}
              </Text>
            </Flex>
          </Button>
        </ChakraLink>
      </Link>
    );
  });

  return (
    <>
      <Box pt={'25px'} mb='12px'>
        <Link href='/' passHref>
          <ChakraLink
            display='flex'
            lineHeight='100%'
            mb='30px'
            fontWeight='bold'
            justifyContent='center'
            alignItems='center'
            fontSize='11px'
          >
            <CreativeTimLogo w='32px' h='32px' me='10px' color={activeColor} />
            <Text fontSize='xs' mt='3px' lineHeight='1.5' color={activeColor}>
              {logoText}
            </Text>
          </ChakraLink>
        </Link>
        <Separator />
      </Box>
      <Stack direction='column' mb='40px'>
        {links}
      </Stack>
    </>
  );
};

export default SidebarContent;
