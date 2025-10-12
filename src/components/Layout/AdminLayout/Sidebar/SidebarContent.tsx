import {
  Box,
  Button,
  Flex,
  Icon,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
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
  isCollapsed?: boolean;
}

const SidebarContent = ({
  logoText,
  routes,
  currentPath,
  isCollapsed = false,
}: SideBarContentType) => {
  const router = useRouter();
  const { colorMode } = useAdminColorMode();

  const activeBg = colorMode === 'light' ? 'teal.50' : 'teal.900';
  const inactiveBg = colorMode === 'light' ? 'transparent' : 'transparent';
  const activeColor = colorMode === 'light' ? 'teal.600' : 'teal.300';
  const inactiveColor = colorMode === 'light' ? 'gray.600' : 'gray.400';
  const hoverBg = colorMode === 'light' ? 'gray.50' : 'gray.800';

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
          {!isCollapsed && (
            <Text
              color={activeColor}
              fontWeight='bold'
              mb={{ xl: '12px' }}
              mx='auto'
              py='12px'
              fontSize='sm'
              textTransform='uppercase'
              letterSpacing='wider'
            >
              {prop.name}
            </Text>
          )}
          {prop.views.map((viewProp: any, viewKey: number) => {
            const viewIsActive = activeRoute(viewProp.layout + viewProp.path);
            const menuButton = (
              <Link
                href={viewProp.layout + viewProp.path}
                key={`view-${viewKey}`}
              >
                <Button
                  as='a'
                  boxSize='initial'
                  justifyContent={isCollapsed ? 'center' : 'flex-start'}
                  alignItems='center'
                  bg={viewIsActive ? activeBg : inactiveBg}
                  mb={{ xl: '8px' }}
                  mx={{ xl: 'auto' }}
                  px={isCollapsed ? '0' : '16px'}
                  py='12px'
                  w='100%'
                  borderRadius='12px'
                  borderLeft={viewIsActive ? '4px solid' : '4px solid transparent'}
                  borderLeftColor={viewIsActive ? 'teal.500' : 'transparent'}
                  transition='all 0.2s'
                  _hover={{
                    bg: hoverBg,
                    transform: 'translateX(4px)',
                    textDecoration: 'none',
                  }}
                  _active={{
                    bg: 'inherit',
                    transform: 'none',
                    borderColor: 'transparent',
                  }}
                  _focus={{ boxShadow: 'none' }}
                >
                  <Flex alignItems='center' w='100%'>
                    <Icon
                      as={viewProp.icon}
                      color={viewIsActive ? activeColor : inactiveColor}
                      boxSize='20px'
                      mr={isCollapsed ? '0' : '12px'}
                    />
                    {!isCollapsed && (
                      <Text
                        color={viewIsActive ? activeColor : inactiveColor}
                        fontSize='sm'
                        fontWeight={viewIsActive ? '600' : '400'}
                      >
                        {viewProp.name}
                      </Text>
                    )}
                  </Flex>
                </Button>
              </Link>
            );

            return isCollapsed ? (
              <Tooltip
                key={`view-${viewKey}`}
                label={viewProp.name}
                placement='right'
                hasArrow
              >
                {menuButton}
              </Tooltip>
            ) : menuButton;
          })}
        </div>
      );
    }

    const menuButton = (
      <Link href={prop.layout + prop.path} key={key}>
        <Button
          as='a'
          boxSize='initial'
          justifyContent={isCollapsed ? 'center' : 'flex-start'}
          alignItems='center'
          bg={isActive ? activeBg : inactiveBg}
          mb={{ xl: '8px' }}
          mx={{ xl: 'auto' }}
          px={isCollapsed ? '0' : '16px'}
          py='12px'
          w='100%'
          borderRadius='12px'
          borderLeft={isActive ? '4px solid' : '4px solid transparent'}
          borderLeftColor={isActive ? 'teal.500' : 'transparent'}
          transition='all 0.2s'
          _hover={{
            bg: hoverBg,
            transform: 'translateX(4px)',
            textDecoration: 'none',
          }}
          _active={{
            bg: 'inherit',
            transform: 'none',
            borderColor: 'transparent',
          }}
          _focus={{ boxShadow: 'none' }}
        >
          <Flex alignItems='center' w='100%'>
            <Icon
              as={prop.icon}
              color={isActive ? activeColor : inactiveColor}
              boxSize='20px'
              mr={isCollapsed ? '0' : '12px'}
            />
            {!isCollapsed && (
              <Text
                color={isActive ? activeColor : inactiveColor}
                fontSize='sm'
                fontWeight={isActive ? '600' : '400'}
              >
                {prop.name}
              </Text>
            )}
          </Flex>
        </Button>
      </Link>
    );

    return isCollapsed ? (
      <Tooltip
        key={key}
        label={prop.name}
        placement='right'
        hasArrow
      >
        {menuButton}
      </Tooltip>
    ) : menuButton;
  });

  return (
    <>
      <Box pt={'25px'} mb='20px'>
        <Link href='/'>
          <Box
            as='a'
            display='flex'
            lineHeight='100%'
            mb='20px'
            fontWeight='bold'
            justifyContent={isCollapsed ? 'center' : 'flex-start'}
            alignItems='center'
            fontSize='11px'
            transition='all 0.3s'
            cursor='pointer'
            _hover={{ opacity: 0.8 }}
          >
            <CreativeTimLogo
              w={isCollapsed ? '28px' : '32px'}
              h={isCollapsed ? '28px' : '32px'}
              me={isCollapsed ? '0' : '10px'}
              color={activeColor}
            />
            {!isCollapsed && (
              <Text
                fontSize='sm'
                mt='3px'
                lineHeight='1.5'
                color={activeColor}
                fontWeight='600'
              >
                {logoText}
              </Text>
            )}
          </Box>
        </Link>
        <Separator />
      </Box>
      <Box
        maxH='calc(100vh - 150px)'
        overflowY='auto'
        pr={isCollapsed ? '10px' : '4'}
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: colorMode === 'light' ? '#CBD5E0' : '#4A5568',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: colorMode === 'light' ? '#A0AEC0' : '#718096',
          },
        }}
      >
        <Stack direction='column' spacing='4px'>{links}</Stack>
      </Box>
    </>
  );
};

export default SidebarContent;
