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
} from '@chakra-ui/react';
import { EditProfileForm } from '@components/Form/FormCRUD/EditProfile';
import { ResetPasswordForm } from '@components/Form/FormCRUD/ResetPassword';
import FormModal from '@components/Modal/FormModal';
import { Separator } from '@components/Separator';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { adminModifyProfileAsync } from '@reducers/admin/auth/actions';

import { useRef, useState } from 'react';
import { useAdminColorMode } from 'src/context/colorMode';

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
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.adminAuth);
  const [switched, setSwitched] = useState(isChecked);
  const { colorMode, toggleColorMode } = useAdminColorMode();

  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const onOpenResetPasswordModal = () => setIsResetPasswordModalOpen(true);
  const onCloseResetPasswordModal = () => setIsResetPasswordModalOpen(false);

  const onOpenEditProfileModal = () => setIsEditProfileModalOpen(true);
  const onCloseEditProfileModal = () => setIsEditProfileModalOpen(false);

  let fixedDisplay = 'flex';
  if (secondary) {
    fixedDisplay = 'none';
  }

  const onSubmit = (data: any, id: string) => {
    dispatch(adminModifyProfileAsync({ data, id: userInfo?._id }));
  };

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
        <DrawerContent bg={colorMode === 'light' ? 'gray.50' : 'gray.700'}>
          <DrawerHeader pt='24px' px='24px'>
            <DrawerCloseButton
              color={colorMode === 'light' ? 'gray.800' : 'white'}
            />
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
                  color={colorMode === 'light' ? 'gray.50' : 'gray.800'}
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
                  bg='none'
                  color={colorMode === 'light' ? 'gray.800' : 'whiteAlpha.900'}
                >
                  Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
                </Button>
              </Flex>
              <Button colorScheme='blue' onClick={onOpenResetPasswordModal}>
                重設密碼
              </Button>
              <Separator />
              <Button
                colorScheme='teal'
                onClick={onOpenEditProfileModal}
                mt='1rem'
              >
                編輯個人檔案
              </Button>
            </Flex>
            <ResetPasswordForm
              isOpen={isResetPasswordModalOpen}
              onClose={onCloseResetPasswordModal}
            />
            <FormModal
              isOpen={isEditProfileModalOpen}
              onClose={onCloseEditProfileModal}
              onSubmit={onSubmit}
              title='編輯個人資訊'
            >
              <EditProfileForm />
            </FormModal>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Configurator;
