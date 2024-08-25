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
  Select,
} from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { NewsItem } from '@models/responses/news';
import {
  addNewsCategoryAsync,
  editNewsCategoryAsync,
} from '@reducers/admin/admin-news-categorys/actions';

import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type NewsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  news: NewsItem | null;
  isEditing: boolean;
};

export default function NewsModal({
  isOpen,
  onClose,
  news,
  isEditing,
}: NewsModalProps) {
  const dispatch = useAppDispatch();
  const methods = useForm({
    defaultValues: {
      title: news?.title || '',
      category: news?.category || '',
      date: news?.date || '',
      coverImage: null,
    },
  });

  const { list: categories } = useAppSelector(
    (state) => state.adminNewsCategories,
  );

  useEffect(() => {
    if (news) {
      methods.reset({
        title: news.title || '',
        category: news.category || '',
        date: news.date || '',
      });
    }
  }, [news, methods]);

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('category', data.category);
    formData.append('date', data.date);

    if (data.coverImage && data.coverImage[0]) {
      formData.append('coverImage', data.coverImage[0]);
    }

    if (isEditing && news?._id) {
      dispatch(editNewsCategoryAsync({ newsId: news._id, body: formData }));
    } else {
      dispatch(addNewsCategoryAsync(formData));
    }
  };

  return (
    <FormProvider {...methods}>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW='90%'>
          <ModalHeader>
            {isEditing ? '編輯最新消息' : '新增最新消息'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <FormControl mb='1.5rem'>
                <FormLabel htmlFor='title'>標題</FormLabel>
                <Input
                  id='title'
                  {...methods.register('title', { required: '此欄位為必填' })}
                  placeholder='輸入最新消息標題'
                />
              </FormControl>

              <FormControl mb='1.5rem'>
                <FormLabel htmlFor='date'>日期</FormLabel>
                <Input
                  id='date'
                  type='date'
                  {...methods.register('date', { required: '此欄位為必填' })}
                />
              </FormControl>

              <FormControl mb='1.5rem'>
                <FormLabel htmlFor='category'>類別</FormLabel>
                <Select id='category' {...methods.register('category')}>
                  {categories?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl mb='1.5rem'>
                <FormLabel htmlFor='cover'>封面圖片</FormLabel>
                <Input
                  id='cover'
                  type='file'
                  accept='image/*'
                  {...methods.register('coverImage')}
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
    </FormProvider>
  );
}
