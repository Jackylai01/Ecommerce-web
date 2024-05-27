import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal = ({ isOpen, onClose }: LogoutModalProps) => {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      router.push('/public/auth/login');
    }
  }, [isOpen, router]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>登出通知</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>您的帳戶已在其他裝置上登入。</Box>
          <Button colorScheme='blue' onClick={handleClose} mt={4}>
            關閉
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LogoutModal;
