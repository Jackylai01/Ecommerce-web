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
  Switch,
  useToast,
} from '@chakra-ui/react';
import ArticleCustomBlocks from '@components/Layout/AdminLayout/ArticleManagement/ArticleCustomBlocks';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { Article } from '@models/responses/article.res';
import { getAllArticleCategoriesAsync } from '@reducers/admin/admin-articles-category/actions';
import {
  addArticleAsync,
  editArticleAsync,
} from '@reducers/admin/admin-articles/actions';
import { resetAdminUpload } from '@reducers/admin/upload';

import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

type ArticleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  article: Article | null;
  isEditing: boolean;
};

export default function ArticleModal({
  isOpen,
  onClose,
  article,
  isEditing,
}: ArticleModalProps) {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const methods = useForm({
    defaultValues: {
      title: article?.title || '',
      tags: article?.tags?.join(', ') || '',
      excerpt: article?.excerpt || '',
      status: article?.status || 'draft',
      isFeatured: article?.isFeatured || false,
      category: article?.category || '',
      blocks: article?.blocks || [],
      coverImage: null,
    },
  });

  const { userInfo } = useAppSelector((state) => state.adminAuth);
  const { list: categories } = useAppSelector(
    (state) => state.adminArticlesCategories,
  );
  const { uploadedImages } = useAppSelector((state) => state.adminUpload);

  useEffect(() => {
    if (isOpen && !isEditing) {
      dispatch(resetAdminUpload());
    }
    if (!categories) {
      dispatch(getAllArticleCategoriesAsync({ page: 1, limit: 100 }));
    }
    if (article) {
      methods.reset({
        title: article.title || '',
        tags: article.tags?.join(', ') || '',
        excerpt: article.excerpt || '',
        status: article.status || 'draft',
        isFeatured: article.isFeatured || false,
        category: article.category || '',
        blocks: article.blocks || [],
      });
    }
  }, [isOpen, isEditing, dispatch, categories, article, methods]);

  const onSubmit = async (data: any) => {
    if (!userInfo) return;

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

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append(
      'tags',
      data.tags
        .split(',')
        .map((tag: string) => tag.trim())
        .join(','),
    );
    formData.append('excerpt', data.excerpt);
    formData.append('status', data.status);
    formData.append('isFeatured', data.isFeatured.toString());
    formData.append('category', data.category);
    formData.append('author', userInfo._id);
    formData.append('blocks', JSON.stringify(updatedContentBlocks));

    if (data.coverImage && data.coverImage[0]) {
      formData.append('coverImage', data.coverImage[0]);
    }

    if (isEditing && article?._id) {
      dispatch(editArticleAsync({ articleId: article._id, body: formData }));
    } else {
      dispatch(addArticleAsync(formData));
    }
  };

  return (
    <FormProvider {...methods}>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW='90%'>
          <ModalHeader>{isEditing ? '編輯文章' : '新增文章'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <FormControl mb='1.5rem'>
                <FormLabel htmlFor='title'>標題</FormLabel>
                <Input
                  id='title'
                  {...methods.register('title', { required: '此欄位為必填' })}
                  placeholder='輸入文章標題'
                />
              </FormControl>
              <FormControl mb='1.5rem'>
                <FormLabel htmlFor='tags'>標籤</FormLabel>
                <Input
                  id='tags'
                  {...methods.register('tags')}
                  placeholder='輸入文章標籤 (用逗號分隔)'
                />
              </FormControl>
              <FormControl mb='1.5rem'>
                <FormLabel htmlFor='excerpt'>文章摘要</FormLabel>
                <Input
                  id='excerpt'
                  {...methods.register('excerpt')}
                  placeholder='輸入文章摘要'
                />
              </FormControl>

              <FormControl mb='1.5rem'>
                <Controller
                  name='blocks'
                  control={methods.control}
                  render={({ field }) => (
                    <ArticleCustomBlocks
                      name='blocks'
                      label='文章內容'
                      blocks={field.value}
                      setBlocks={field.onChange}
                    />
                  )}
                />
              </FormControl>

              <FormControl mb='1.5rem'>
                <FormLabel htmlFor='status'>狀態</FormLabel>
                <Select id='status' {...methods.register('status')}>
                  <option value='draft'>草稿</option>
                  <option value='published'>發佈</option>
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
              <FormControl mb='1.5rem'>
                <FormLabel htmlFor='isFeatured' mb='0'>
                  設為精選文章
                </FormLabel>
                <Switch
                  id='isFeatured'
                  {...methods.register('isFeatured')}
                  defaultChecked={article?.isFeatured || false}
                />
              </FormControl>
              <FormControl mb='1.5rem'>
                <FormLabel htmlFor='category'>文章類別</FormLabel>
                <Select id='category' {...methods.register('category')}>
                  {categories?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </Select>
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
