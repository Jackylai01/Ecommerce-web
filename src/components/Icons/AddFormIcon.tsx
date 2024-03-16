import { AddIcon } from '@chakra-ui/icons';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import FormModal from '@components/Modal/FormModal';
import { FC, ReactNode } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';

interface AddButtonProps<T extends FieldValues> {
  formTitle: string;
  formContent: ReactNode;
  onSubmit: SubmitHandler<T>;
}

const AddButton: FC<AddButtonProps<any>> = ({
  formTitle,
  formContent,
  onSubmit,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        icon={<AddIcon />}
        isRound
        size='lg'
        colorScheme='teal'
        position='absolute'
        top='80px'
        right='50px'
        aria-label='iconButton'
        onClick={onOpen}
      />

      <FormModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        title={formTitle}
      >
        {formContent}
      </FormModal>
    </>
  );
};

export default AddButton;
