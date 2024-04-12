import { AddIcon } from '@chakra-ui/icons';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import FormModal from '@components/Modal/FormModal';
import useAppDispatch from '@hooks/useAppDispatch';
import { resetCustomPage } from '@reducers/admin/custom-page';
import { resetTagsDetailState } from '@reducers/admin/product-tags';
import { resetProductDetails } from '@reducers/admin/products';
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
  const dispatch = useAppDispatch();

  const handleAddButtonClick = () => {
    dispatch(resetProductDetails());
    dispatch(resetTagsDetailState());
    dispatch(resetCustomPage());
    onOpen();
  };

  return (
    <>
      <IconButton
        icon={<AddIcon />}
        isRound
        colorScheme='teal'
        aria-label='Add product button'
        type='button'
        onClick={handleAddButtonClick}
        position='fixed'
        right='20px'
        transform='translateY(0%)'
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
