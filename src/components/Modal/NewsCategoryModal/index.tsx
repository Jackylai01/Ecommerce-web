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
  addNewsCategoryAsync,
  editNewsCategoryAsync,
} from '@reducers/admin/admin-news-categorys/actions';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type NewsCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
  isEditing: boolean;
};

export default function NewsCategoryModal({
  isOpen,
  onClose,
  category,
  isEditing,
}: NewsCategoryModalProps) {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: category?.name || '',
      description: category?.description || '',
    },
  });

  useEffect(() => {
    if (category) {
      reset({
        name: category.name || '',
        description: category.description || '',
      });
    }
  }, [category, reset]);

  const onSubmit = async (data: any) => {
    if (isEditing && category?._id) {
      dispatch(editNewsCategoryAsync({ categoryId: category._id, body: data }));
    } else {
      dispatch(addNewsCategoryAsync(data));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEditing ? '編輯最新消息類別' : '新增最新消息類別'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb='1.5rem'>
              <FormLabel htmlFor='name'>類別名稱</FormLabel>
              <Input
                id='name'
                {...register('name', { required: '此欄位為必填' })}
                placeholder='輸入類別名稱'
              />
            </FormControl>
            <FormControl mb='1.5rem'>
              <FormLabel htmlFor='description'>類別描述</FormLabel>
              <Input
                id='description'
                {...register('description')}
                placeholder='輸入類別描述'
              />
            </FormControl>
            <ModalFooter>
              <Button type='submit' colorScheme='purple' mr='3'>
                保存
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
