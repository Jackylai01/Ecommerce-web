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
import NewsCustomBlocks from '@components/Layout/AdminLayout/NewsManagement/NewsBlocks';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { NewsItem } from '@models/responses/news';
import {
  addNewsItemAsync,
  editNewsItemAsync,
} from '@reducers/admin/admin-news/actions';

import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

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
  const { uploadedImages } = useAppSelector((state) => state.adminUpload);
  const methods = useForm({
    defaultValues: {
      title: news?.title || '',
      category: news?.category || '',
      content: news?.content || '',
      coverImage: null,
      blocks: news?.blocks || [],
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
        content: news.content || '',
        blocks: news.blocks || [],
      });
    }
  }, [news, methods]);

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    // 如果 blocks 存在，則將它們轉換成 JSON 並添加到表單數據中
    let updatedContentBlocks = [...data.blocks];

    uploadedImages.forEach((image) => {
      const newBlock = {
        className: 'image-selectable',
        elements: [
          {
            tagName: 'img',
            src: image.imageUrl,
            imageId: image.imageId,
          },
        ],
      };
      updatedContentBlocks.push(newBlock);
    });

    formData.append('title', data.title);

    formData.append('category', data.category?._id || data.category);

    formData.append('content', data.content);
    formData.append('blocks', JSON.stringify(updatedContentBlocks));

    if (data.coverImage && data.coverImage[0]) {
      formData.append('coverImage', data.coverImage[0]);
    }

    // 提交表單數據
    if (isEditing && news?._id) {
      dispatch(editNewsItemAsync({ newsItemId: news?._id, body: formData }));
    } else {
      dispatch(addNewsItemAsync(formData));
    }
  };

  return (
    <FormProvider {...methods}>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent maxW='100%'>
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
                <FormLabel htmlFor='content'>描述</FormLabel>
                <Input
                  id='content'
                  type='text'
                  {...methods.register('content', { required: '此欄位為必填' })}
                  placeholder='輸入最新消息的描述短句'
                />
              </FormControl>

              <FormControl mb='1.5rem'>
                <Controller
                  name='blocks'
                  control={methods.control}
                  render={({ field }) => (
                    <NewsCustomBlocks
                      name='blocks'
                      label='文章內容'
                      blocks={field.value}
                      setBlocks={field.onChange}
                    />
                  )}
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
