import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { Category } from '@models/entities/shared/products';
import {
  addFaqCategoryAsync,
  updateFaqCategoryAsync,
} from '@reducers/admin/admin-faq-category/actions';
import { useEffect, useState } from 'react';

type CategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
  isEditing: boolean;
};

export default function CategoryModal({
  isOpen,
  onClose,
  isEditing,
}: CategoryModalProps) {
  const dispatch = useAppDispatch();
  const { categoryDetails: category } = useAppSelector(
    (state) => state.adminFaqCategory,
  );

  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');

  useEffect(() => {
    if (category) {
      setCategoryName(category.name || '');
      setCategoryDescription(category.description || '');
    }
  }, [category]);

  const handleSaveCategory = async () => {
    const categoryData = {
      name: categoryName,
      description: categoryDescription,
    };

    if (isEditing && category?._id) {
      dispatch(
        updateFaqCategoryAsync({ id: category._id, body: categoryData }),
      );
    } else {
      dispatch(addFaqCategoryAsync(categoryData));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='5xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEditing ? '編輯常見問答類別' : '新增常見問答類別'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb='1.5rem'>
            <FormLabel htmlFor='categoryName'>類別名稱</FormLabel>
            <Input
              id='categoryName'
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder='輸入類別名稱'
            />
          </FormControl>
          <FormControl mb='1.5rem'>
            <FormLabel htmlFor='categoryDescription'>類別描述</FormLabel>
            <Input
              id='categoryDescription'
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              placeholder='輸入類別描述'
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='purple' mr='3' onClick={handleSaveCategory}>
            保存
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
