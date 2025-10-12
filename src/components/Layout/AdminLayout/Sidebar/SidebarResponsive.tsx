import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Stack,
  Text,
  useDisclosure,
  VStack,
  Divider,
} from '@chakra-ui/react';
import { CreativeTimLogo } from '@components/Icons/Icons';
import NextLink from 'next/link';
import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import { useAdminColorMode } from 'src/context/colorMode';
import { FiX } from 'react-icons/fi';

interface SidebarResponsiveProps {
  routes: any[];
  logoText: string;
  secondary?: boolean;
}

const SidebarResponsive: React.FC<SidebarResponsiveProps> = ({
  routes,
  logoText,
  secondary,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const { colorMode } = useAdminColorMode();
  const router = useRouter();

  const hamburgerColor = colorMode === 'light' ? 'gray.500' : 'gray.200';
  const bgColor = colorMode === 'light' ? 'white' : 'gray.900';
  const activeColor = colorMode === 'light' ? 'teal.600' : 'teal.300';
  const inactiveColor = colorMode === 'light' ? 'gray.600' : 'gray.400';
  const activeBg = colorMode === 'light' ? 'teal.50' : 'teal.900';
  const hoverBg = colorMode === 'light' ? 'gray.50' : 'gray.800';

  const isActiveRoute = (href: string) => {
    return router.pathname === href;
  };

  const renderLink = (route: any, key: number) => {
    const IconComponent = route.icon;
    const href = `${route.layout}${route.path}`;
    const isActive = isActiveRoute(href);

    return (
      <NextLink href={href} key={key}>
        <Button
          as='a'
          w='100%'
          justifyContent='flex-start'
          alignItems='center'
          bg={isActive ? activeBg : 'transparent'}
          mb='4px'
          py='14px'
          px='16px'
          borderRadius='12px'
          borderLeft={isActive ? '4px solid' : '4px solid transparent'}
          borderLeftColor={isActive ? 'teal.500' : 'transparent'}
          transition='all 0.2s'
          onClick={onClose}
          _hover={{
            bg: hoverBg,
            transform: 'translateX(4px)',
            textDecoration: 'none',
          }}
          _active={{
            bg: 'inherit',
            transform: 'none',
          }}
          _focus={{ boxShadow: 'none' }}
        >
          <Flex alignItems='center' w='100%'>
            {IconComponent && (
              <Icon
                as={IconComponent}
                color={isActive ? activeColor : inactiveColor}
                boxSize='20px'
                mr='12px'
              />
            )}
            <Text
              color={isActive ? activeColor : inactiveColor}
              fontSize='sm'
              fontWeight={isActive ? '600' : '400'}
            >
              {route.name}
            </Text>
          </Flex>
        </Button>
      </NextLink>
    );
  };

  const createLinks = (routes: any) => {
    return routes.map((route: any, key: number) => {
      if (route.category) {
        return (
          <Box key={key} mb='20px'>
            <Text
              color={activeColor}
              fontWeight='bold'
              mb='12px'
              px='16px'
              fontSize='xs'
              textTransform='uppercase'
              letterSpacing='wider'
            >
              {route.name}
            </Text>
            <VStack spacing='4px' align='stretch'>
              {route.views && createLinks(route.views)}
            </VStack>
          </Box>
        );
      } else {
        return renderLink(route, key);
      }
    });
  };

  return (
    <Flex display={{ base: 'flex', xl: 'none' }} alignItems='center'>
      <Button ref={btnRef} onClick={onOpen} variant='unstyled'>
        <HamburgerIcon color={hamburgerColor} ml='1rem' w='5' h='5' />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
        size='full'
      >
        <DrawerOverlay bg='blackAlpha.600' backdropFilter='blur(4px)' />
        <DrawerContent bg={bgColor} maxW='85vw'>
          <DrawerHeader
            borderBottomWidth='1px'
            borderBottomColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
            pb='16px'
            pt='20px'
          >
            <Flex justifyContent='space-between' alignItems='center'>
              <Flex alignItems='center'>
                <CreativeTimLogo
                  w='32px'
                  h='32px'
                  me='10px'
                  color={activeColor}
                />
                <Text
                  fontSize='md'
                  fontWeight='600'
                  color={activeColor}
                >
                  {logoText}
                </Text>
              </Flex>
              <IconButton
                aria-label='Close menu'
                icon={<FiX />}
                onClick={onClose}
                size='sm'
                borderRadius='full'
                variant='ghost'
                color={inactiveColor}
                _hover={{
                  bg: hoverBg,
                }}
              />
            </Flex>
          </DrawerHeader>
          <DrawerBody
            pt='24px'
            px='16px'
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
            <Stack spacing='8px'>
              {createLinks(routes)}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default SidebarResponsive;
