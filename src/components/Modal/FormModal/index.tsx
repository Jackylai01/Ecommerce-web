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
  onSubmit: any;
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

  const handleFormSubmit: SubmitHandler<T> = (data) => {
    onSubmit(data);
    onClose();
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
        <ModalContent minH='620px' bg='white' color='black'>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' color='white' mr={3} type='submit'>
                Submit
              </Button>
              <Button color='black' onClick={handleClose}>
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
