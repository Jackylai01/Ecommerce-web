import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { ADMIN_ROUTE } from '@fixtures/constants';
import NextLink from 'next/link';

interface MessageModalProps {
  title: string;
  isActive: boolean;
  error: string | null;
  onClose: () => void;
  children?: React.ReactNode;
}

const MessageModal: React.FC<MessageModalProps> = ({
  title,
  isActive,
  error,
  onClose,
  children,
}) => {
  return (
    <Modal isOpen={isActive} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg='white' color='black'>
        <ModalHeader>
          {title}
          {error ? ' 失敗' : ' 成功'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {error ? <Text color='red.500'>{error}</Text> : children}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            關閉
          </Button>
          <NextLink href={`/${ADMIN_ROUTE}`} passHref>
            <Link color='teal.500'>返回</Link>
          </NextLink>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MessageModal;
