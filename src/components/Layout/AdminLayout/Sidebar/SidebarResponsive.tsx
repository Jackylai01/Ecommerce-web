import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import IconBox from '@components/Icons/IconBox';
import NextLink from 'next/link';
import React, { useRef } from 'react';

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
  const hamburgerColor = useColorModeValue('gray.500', 'white');

  const renderLink = (route: any, key: number) => {
    const IconComponent = route.icon;
    const href = `${route.layout}${route.path}`;

    return (
      <NextLink href={href} passHref key={key}>
        <Button
          as='a'
          display='flex'
          alignItems='center'
          justifyContent='flex-start'
          variant='ghost'
          w='full'
          mb='2'
          py='2'
          px='4'
          bg={route.active ? 'teal.300' : 'transparent'}
          color={route.active ? 'white' : 'gray.400'}
          _hover={{ bg: 'teal.300' }}
          leftIcon={
            IconComponent && (
              <IconBox
                color='white'
                bg={route.active ? 'teal.300' : 'transparent'}
              >
                <IconComponent />
              </IconBox>
            )
          }
        >
          {route.name}
        </Button>
      </NextLink>
    );
  };

  const createLinks = (routes: any) => {
    return routes.map((route: any, key: number) => {
      if (route.category) {
        // 如果存在category属性，表示这是一个包含嵌套views的路由
        return (
          <React.Fragment key={key}>
            <div>{route.name}</div> {/* 渲染category名称 */}
            {route.views && createLinks(route.views)}{' '}
            {/* 递归渲染views中的路由 */}
          </React.Fragment>
        );
      } else {
        return renderLink(route, key); // 渲染普通路由
      }
    });
  };

  return (
    <Flex display={{ base: 'flex', xl: 'none' }} alignItems='center'>
      <Button ref={btnRef} onClick={onOpen} variant='unstyled'>
        <HamburgerIcon color={hamburgerColor} w='5' h='5' />
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
          <DrawerBody>
            <Stack spacing='1' mt='4'>
              {createLinks(routes)}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default SidebarResponsive;
