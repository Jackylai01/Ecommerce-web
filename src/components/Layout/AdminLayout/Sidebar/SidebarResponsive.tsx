import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Link as ChakraLink,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import IconBox from '@components/Icons/IconBox';
import { CreativeTimLogo } from '@components/Icons/Icons';
import React, { useRef, useState } from 'react';
import { Separator } from '../Separator';
import SidebarHelp from './SidebarHelp';

interface StateType {
  [key: string]: boolean;
}

const SidebarResponsive = (props: any) => {
  const [state, setState] = useState<StateType>({});
  const mainPanel = React.useRef<HTMLDivElement | any>();

  const createLinks = (routes: any) => {
    const activeBg = useColorModeValue('white', 'gray.700');
    const inactiveBg = useColorModeValue('white', 'gray.700');
    const activeColor = useColorModeValue('gray.700', 'white');
    const inactiveColor = useColorModeValue('gray.400', 'gray.400');

    return routes.map((prop: any, key: number) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.category) {
        var st = {} as any;
        st[prop['state']] = !state[prop.state];
        return (
          <div key={prop.name}>
            <Text
              color={activeColor}
              fontWeight='bold'
              mb={{
                xl: '12px',
              }}
              mx='auto'
              ps={{
                sm: '10px',
                xl: '16px',
              }}
              py='12px'
            >
              {document.documentElement.dir === 'rtl'
                ? prop.rtlName
                : prop.name}
            </Text>
            {createLinks(prop.views)}
          </div>
        );
      }
      return (
        <Link href={prop.layout + prop.path} key={key}>
          <ChakraLink w='100%'>
            <Button
              boxSize='initial'
              justifyContent='flex-start'
              alignItems='center'
              bg={
                prop.layout + prop.path === props.router.asPath
                  ? activeBg
                  : 'transparent'
              }
              mb={{
                xl: '12px',
              }}
              mx={{
                xl: 'auto',
              }}
              ps={{
                sm: '10px',
                xl: '16px',
              }}
              py='12px'
              borderRadius='15px'
              _hover={{ bg: activeBg }}
              w='100%'
              _active={{
                bg: 'inherit',
                transform: 'none',
                borderColor: 'transparent',
              }}
              _focus={{
                boxShadow: 'none',
              }}
            >
              <Flex>
                <IconBox
                  bg={
                    prop.layout + prop.path === props.router.asPath
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
                    prop.layout + prop.path === props.router.asPath
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
  };

  const { logoText, routes, ...rest } = props;

  var links = <>{createLinks(routes)}</>;

  let hamburgerColor = useColorModeValue('gray.500', 'gray.200');
  if (props.secondary === true) {
    hamburgerColor = 'white';
  }
  var brand = (
    <Box pt={'35px'} mb='8px'>
      <Link
        href='/'
        target='_blank'
        display='flex'
        lineHeight='100%'
        mb='30px'
        fontWeight='bold'
        justifyContent='center'
        alignItems='center'
        fontSize='11px'
      >
        <CreativeTimLogo w='32px' h='32px' me='10px' />
        <Text fontSize='sm' mt='3px'>
          {logoText}
        </Text>
      </Link>
      <Separator></Separator>
    </Box>
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<any>();

  return (
    <Flex
      display={{ sm: 'flex', xl: 'none' }}
      ref={mainPanel}
      alignItems='center'
    >
      <Button onClick={onOpen} variant='unstyled'>
        <HamburgerIcon color={hamburgerColor} w='18px' h='18px' />
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={document.documentElement.dir === 'rtl' ? 'right' : 'left'}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          w='250px'
          maxW='250px'
          ms={{
            sm: '16px',
          }}
          my={{
            sm: '16px',
          }}
          borderRadius='16px'
        >
          <DrawerCloseButton
            _focus={{ boxShadow: 'none' }}
            _hover={{ boxShadow: 'none' }}
          />
          <DrawerBody maxW='250px' px='1rem'>
            <Box maxW='100%' h='100vh'>
              <Box>{brand}</Box>
              <Stack direction='column' mb='40px'>
                <Box>{links}</Box>
              </Stack>
              <SidebarHelp></SidebarHelp>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default SidebarResponsive;
