import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  Switch,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { Separator } from '@components/Separator';

import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

const Configurator = (props: any) => {
  const {
    secondary,
    isOpen,
    onClose,
    fixed,
    onSwitch,
    onOpaque,
    onTransparent,
  } = props;

  const [switched, setSwitched] = useState(props.isChecked);

  const { colorMode, toggleColorMode } = useColorMode();

  let fixedDisplay = 'flex';
  if (props.secondary) {
    fixedDisplay = 'none';
  }

  const settingsRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Drawer
        isOpen={props.isOpen}
        onClose={props.onClose}
        placement={document.documentElement.dir === 'rtl' ? 'left' : 'right'}
        finalFocusRef={settingsRef}
        blockScrollOnMount={false}
      >
        <DrawerContent>
          <DrawerHeader pt='24px' px='24px'>
            <DrawerCloseButton />
            <Text fontSize='xl' fontWeight='bold' mt='16px'>
              Purity UI Configurator
            </Text>
            <Text fontSize='md' mb='16px'>
              See your dashboard options.
            </Text>
            <Separator />
          </DrawerHeader>
          <DrawerBody w='340px' ps='24px' pe='40px'>
            <Flex flexDirection='column'>
              <Box
                display={fixedDisplay}
                justifyContent='space-between '
                mb='16px'
              >
                <Text fontSize='md' fontWeight='600' mb='4px'>
                  Navbar Fixed
                </Text>
                <Switch
                  colorScheme='teal'
                  isChecked={switched}
                  onChange={(event) => {
                    if (switched === true) {
                      props.onSwitch(false);
                      setSwitched(false);
                    } else {
                      props.onSwitch(true);
                      setSwitched(true);
                    }
                  }}
                />
              </Box>
              <Flex
                justifyContent='space-between'
                alignItems='center'
                mb='24px'
              >
                <Text fontSize='md' fontWeight='600' mb='4px'>
                  Dark/Light
                </Text>
                <Button onClick={toggleColorMode}>
                  Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
                </Button>
              </Flex>
              <Separator />
              <Box mt='24px'>
                <Text fontSize='md' fontWeight='600'>
                  Sidenav Type
                </Text>
                <Text fontSize='sm' mb='16px'>
                  Choose between 2 different sidenav types.
                </Text>
              </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

Configurator.propTypes = {
  secondary: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  fixed: PropTypes.bool,
  onSwitch: PropTypes.func,
  onOpaque: PropTypes.func,
  onTransparent: PropTypes.func,
};

export default Configurator;
