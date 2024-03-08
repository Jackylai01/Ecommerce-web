import {
  Box,
  Button,
  Link as ChakraLink,
  Flex,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import IconBox from '@components/Icons/IconBox';
import { CreativeTimLogo } from '@components/Icons/Icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Separator } from '../Separator';
import SidebarHelp from './SidebarHelp';

interface SideBarContentType {
  logoText: string;
  routes: any;
  display?: string;
  sidebarVariant?: any;
}

const SidebarContent = ({ logoText, routes }: SideBarContentType) => {
  const router = useRouter();
  const [state, setState] = useState<Record<string, boolean>>({});

  const activeBg = useColorModeValue('white', 'gray.700');
  const inactiveBg = useColorModeValue('white', 'gray.700');
  const activeColor = useColorModeValue('gray.700', 'white');
  const inactiveColor = useColorModeValue('gray.400', 'gray.400');

  const activeRoute = (routeName: any) => {
    return router.pathname === routeName ? 'active' : '';
  };

  const links = routes.map((prop: any, key: number) => {
    if (prop.category) {
      return (
        <div key={prop.name}>
          <Text
            color={activeColor}
            fontWeight='bold'
            mb={{ xl: '12px' }}
            mx='auto'
            ps={{ sm: '10px', xl: '16px' }}
            py='12px'
          >
            {prop.name}
          </Text>
          {prop.views.map((viewProp: any, viewKey: number) => (
            <Link href={viewProp.layout + viewProp.path} passHref key={viewKey}>
              <ChakraLink w='100%'>
                <Button
                  boxSize='initial'
                  justifyContent='flex-start'
                  alignItems='center'
                  bg={
                    activeRoute(viewProp.layout + viewProp.path) === 'active'
                      ? activeBg
                      : 'transparent'
                  }
                  mb={{ xl: '12px' }}
                  mx={{ xl: 'auto' }}
                  ps={{ sm: '10px', xl: '16px' }}
                  py='12px'
                  borderRadius='15px'
                  _hover={{ bg: activeBg }}
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
                        activeRoute(viewProp.layout + viewProp.path) ===
                        'active'
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
                        activeRoute(viewProp.layout + viewProp.path) ===
                        'active'
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
            bg={
              activeRoute(prop.layout + prop.path) === 'active'
                ? activeBg
                : 'transparent'
            }
            mb={{ xl: '12px' }}
            mx={{ xl: 'auto' }}
            ps={{ sm: '10px', xl: '16px' }}
            py='12px'
            borderRadius='15px'
            _hover={{ bg: activeBg }}
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
                  activeRoute(prop.layout + prop.path) === 'active'
                    ? 'teal.300'
                    : inactiveBg
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
                  activeRoute(prop.layout + prop.path) === 'active'
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
            <CreativeTimLogo w='32px' h='32px' me='10px' />
            <Text fontSize='sm' mt='3px' lineHeight='1.5'>
              {logoText}
            </Text>
          </ChakraLink>
        </Link>
        <Separator />
      </Box>
      <Stack direction='column' mb='40px'>
        {links}
      </Stack>
      <SidebarHelp />
    </>
  );
};

export default SidebarContent;
