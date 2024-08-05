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
import { ReactNode } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useAdminColorMode } from 'src/context/colorMode';

interface FormModalProps<T extends FieldValues> {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: any; // Todo
  children: ReactNode;
  title: string;
}

function FormModal<T extends FieldValues>({
  isOpen,
  onClose,
  onSubmit,
  children,
  title,
}: FormModalProps<T>) {
  const methods = useForm<T>();
  const { colorMode } = useAdminColorMode();
  const bgColor = colorMode === 'light' ? 'white' : 'gray.700';
  const textColor = colorMode === 'light' ? 'gray.700' : 'white';
  const buttonColor = colorMode === 'light' ? 'white' : 'white';

  const handleFormSubmit: SubmitHandler<T> = (data) => {
    onSubmit(data);
  };

  const handleClose = () => {
    methods.reset();
    onClose();
  };

  return (
    <FormProvider {...methods}>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        size='6xl'
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent minH='620px' bg={bgColor} color={textColor}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button
                colorScheme='blue'
                color={buttonColor}
                mr={3}
                type='submit'
              >
                Submit
              </Button>
              <Button color={textColor} onClick={handleClose}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </FormProvider>
  );
}

export default FormModal;
