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

interface FormModalProps<T extends FieldValues> {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<T>;
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

  const handleFormSubmit: SubmitHandler<T> = (data) => {
    onSubmit(data);
    onClose();
  };

  return (
    <FormProvider {...methods}>
      <Modal isOpen={isOpen} onClose={onClose} size='5xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} type='submit'>
                Submit
              </Button>
              <Button variant='ghost' onClick={onClose}>
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
