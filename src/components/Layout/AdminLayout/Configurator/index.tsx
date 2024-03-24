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
import { ResetPasswordForm } from '@components/Form/FormCRUD/ResetPassword';
import { Separator } from '@components/Separator';

import { useRef, useState } from 'react';

interface ConfiguratorProps {
  secondary?: boolean;
  isOpen: boolean;
  onClose: () => void;
  fixed?: boolean;
  onSwitch: (state: boolean) => void;
  onOpaque?: () => void;
  onTransparent?: () => void;
  isChecked: boolean;
}

const Configurator = ({
  secondary,
  isChecked,
  isOpen,
  onClose,
  onSwitch,
}: ConfiguratorProps) => {
  const [switched, setSwitched] = useState(isChecked);
  const { colorMode, toggleColorMode } = useColorMode();
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);

  const onOpenResetPasswordModal = () => setIsResetPasswordModalOpen(true);
  const onCloseResetPasswordModal = () => setIsResetPasswordModalOpen(false);

  let fixedDisplay = 'flex';
  if (secondary) {
    fixedDisplay = 'none';
  }

  const settingsRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement='right'
        finalFocusRef={settingsRef}
        blockScrollOnMount={false}
      >
        <DrawerContent>
          <DrawerHeader pt='24px' px='24px'>
            <DrawerCloseButton />
            <Text
              fontSize='xl'
              fontWeight='bold'
              mt='16px'
              color={colorMode === 'light' ? 'gray.800' : 'white'}
            >
              Purity UI Configurator
            </Text>
            <Text
              fontSize='md'
              mb='16px'
              color={colorMode === 'light' ? 'gray.800' : 'white'}
            >
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
                <Text
                  fontSize='md'
                  fontWeight='600'
                  mb='4px'
                  color={colorMode === 'light' ? 'gray.800' : 'whiteAlpha.900'}
                >
                  Navbar Fixed
                </Text>
                <Switch
                  colorScheme='teal'
                  isChecked={switched}
                  onChange={(event) => {
                    if (switched === true) {
                      onSwitch(false);
                      setSwitched(false);
                    } else {
                      onSwitch(true);
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
                <Text
                  fontSize='md'
                  fontWeight='600'
                  mb='4px'
                  color={colorMode === 'light' ? 'gray.800' : 'whiteAlpha.900'}
                >
                  Dark/Light
                </Text>
                <Button
                  onClick={toggleColorMode}
                  color={colorMode === 'light' ? 'gray.800' : 'whiteAlpha.900'}
                >
                  Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
                </Button>
              </Flex>
              <Button
                mt='4'
                colorScheme='blue'
                onClick={onOpenResetPasswordModal}
              >
                重設密碼
              </Button>
              <Separator />
            </Flex>
            <ResetPasswordForm
              isOpen={isResetPasswordModalOpen}
              onClose={onCloseResetPasswordModal}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Configurator;
