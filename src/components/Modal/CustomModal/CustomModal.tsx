import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';

// 定義footerButtons接口
interface FooterButton {
  text: string;
  colorScheme: string;
  onClick: () => void;
}

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  body: React.ReactNode; // React.ReactNode可以包括更多類型，如字串、元素或他們的陣列
  footerButtons: FooterButton[];
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  header,
  body,
  footerButtons,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>
        <ModalFooter>
          {footerButtons.map((button, index) => (
            <Button
              key={index}
              colorScheme={button.colorScheme}
              mr={3}
              onClick={button.onClick}
            >
              {button.text}
            </Button>
          ))}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
