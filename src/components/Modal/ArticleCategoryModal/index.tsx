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
  useToast,
} from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import { Category } from '@models/entities/shared/products';

import {
  addArticleCategoryAsync,
  updateArticleCategoryAsync,
} from '@reducers/admin/admin-articles-category/actions';
import { useState } from 'react';

type CategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
  isEditing: boolean;
};

export default function CategoryModal({
  isOpen,
  onClose,
  category,
  isEditing,
}: CategoryModalProps) {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [categoryName, setCategoryName] = useState(category?.name || '');
  const [categoryDescription, setCategoryDescription] = useState(
    category?.description || '',
  );

  const handleSaveCategory = async () => {
    const categoryData = {
      name: categoryName,
      description: categoryDescription,
    };

    if (isEditing && category?._id) {
      dispatch(
        updateArticleCategoryAsync({ id: category._id, body: categoryData }),
      );
    } else {
      dispatch(addArticleCategoryAsync(categoryData));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='5xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEditing ? '編輯文章類別' : '新增文章類別'}</ModalHeader>
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
