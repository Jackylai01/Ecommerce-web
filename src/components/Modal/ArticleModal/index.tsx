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

import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

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
  const methods = useForm();
  const { setValue, getValues } = methods;
  const { userInfo } = useAppSelector((state) => state.adminAuth);

  const { list: categories } = useAppSelector(
    (state) => state.adminArticlesCategories,
  );
  const { uploadedImages } = useAppSelector((state) => state.adminUpload);
  const [title, setTitle] = useState(article?.title || '');
  const [tags, setTags] = useState(article?.tags || []);
  const [excerpt, setExcerpt] = useState(article?.excerpt || '');
  const [status, setStatus] = useState(article?.status || 'draft');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isFeatured, setIsFeatured] = useState(article?.isFeatured || false);
  const [category, setCategory] = useState(article?.category || '');
  const [contentBlocks, setContentBlocks] = useState<any[]>(
    article?.blocks || [],
  );

  useEffect(() => {
    if (isOpen && !isEditing) {
      // 如果是新增文章且模態框打開，重置上傳的圖片狀態
      dispatch(resetAdminUpload());
    }
    if (!categories) {
      dispatch(getAllArticleCategoriesAsync({ page: 1, limit: 100 }));
    }
  }, [isOpen, isEditing, dispatch, categories]);

  const handleSaveArticle = async () => {
    if (!userInfo) return;

    let updatedContentBlocks = [...contentBlocks];

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
    formData.append('title', title);
    formData.append('tags', tags.join(','));
    formData.append('excerpt', excerpt);
    formData.append('status', status);
    formData.append('isFeatured', isFeatured.toString());
    formData.append('category', category);
    formData.append('author', userInfo._id);
    formData.append('blocks', JSON.stringify(updatedContentBlocks));

    if (coverImage) {
      formData.append('coverImage', coverImage);
    }

    if (isEditing && article?._id) {
      dispatch(editArticleAsync({ articleId: article._id, body: formData }));
    } else {
      dispatch(addArticleAsync(formData));
    }
  };

  return (
    <FormProvider {...methods}>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size='5xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEditing ? '編輯文章' : '新增文章'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb='1.5rem'>
              <FormLabel htmlFor='title'>標題</FormLabel>
              <Input
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='輸入文章標題'
              />
            </FormControl>
            <FormControl mb='1.5rem'>
              <FormLabel htmlFor='tags'>標籤</FormLabel>
              <Input
                id='tags'
                placeholder='輸入文章標籤 (用逗號分隔)'
                value={tags.join(', ')}
                onChange={(e) =>
                  setTags(e.target.value.split(',').map((tag) => tag.trim()))
                }
              />
            </FormControl>
            <FormControl mb='1.5rem'>
              <FormLabel htmlFor='excerpt'>文章摘要</FormLabel>
              <Input
                id='excerpt'
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder='輸入文章摘要'
              />
            </FormControl>

            <FormControl mb='1.5rem'>
              <ArticleCustomBlocks
                name='blocks'
                label='文章內容'
                blocks={contentBlocks}
                setBlocks={setContentBlocks}
              />
            </FormControl>

            <FormControl mb='1.5rem'>
              <FormLabel htmlFor='status'>狀態</FormLabel>
              <Select
                id='status'
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
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
                onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
              />
            </FormControl>
            <FormControl mb='1.5rem'>
              <FormLabel htmlFor='isFeatured' mb='0'>
                設為精選文章
              </FormLabel>
              <Switch
                id='isFeatured'
                isChecked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
              />
            </FormControl>
            <FormControl mb='1.5rem'>
              <FormLabel htmlFor='category'>文章類別</FormLabel>
              <Select
                id='category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='purple' mr='3' onClick={handleSaveArticle}>
              保存
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </FormProvider>
  );
}
