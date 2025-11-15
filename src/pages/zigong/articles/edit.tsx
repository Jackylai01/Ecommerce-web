import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Switch,
  VStack,
  useToast,
} from '@chakra-ui/react';
import ArticleCustomBlocks from '@components/Layout/AdminLayout/ArticleManagement/ArticleCustomBlocks';
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { useNotification } from '@hooks/useNotification';
import { getAllArticleCategoriesAsync } from '@reducers/admin/admin-articles-category/actions';
import {
  addArticleAsync,
  editArticleAsync,
  getArticleByIdAsync,
} from '@reducers/admin/admin-articles/actions';
import { resetAdminUpload } from '@reducers/admin/upload';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

const ArticleEditPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const isEditing = Boolean(id);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const methods = useForm({
    defaultValues: {
      title: '',
      tags: '',
      excerpt: '',
      status: 'draft',
      isFeatured: false,
      category: '',
      blocks: [],
      coverImage: null,
    },
  });

  const { userInfo } = useAppSelector((state) => state.adminAuth);
  const { list: categories } = useAppSelector(
    (state) => state.adminArticlesCategories,
  );
  const { uploadedImages } = useAppSelector((state) => state.adminUpload);
  const {
    articleDetails,
    status: {
      addArticleLoading,
      editArticleLoading,
      addArticleSuccess,
      editArticleSuccess,
      addArticleFailed,
      editArticleFailed,
    },
    error: { addArticleError, editArticleError },
  } = useAppSelector((state) => state.adminArticles);

  useEffect(() => {
    if (!isEditing) {
      dispatch(resetAdminUpload());
    }
    dispatch(getAllArticleCategoriesAsync({ page: 1, limit: 100 }));

    if (isEditing && id) {
      dispatch(getArticleByIdAsync(id as string));
    }
  }, [dispatch, isEditing, id]);

  useEffect(() => {
    if (articleDetails && isEditing) {
      methods.reset({
        title: articleDetails.title || '',
        tags: articleDetails.tags?.join(', ') || '',
        excerpt: articleDetails.excerpt || '',
        status: articleDetails.status || 'draft',
        isFeatured: articleDetails.isFeatured || false,
        category: articleDetails.category || '',
        blocks: articleDetails.blocks || [],
      });
    }
  }, [articleDetails, isEditing, methods]);

  useNotification({
    success: addArticleSuccess,
    error: addArticleFailed,
    successTitle: '新增文章成功',
    successDescription: '文章已成功建立',
    errorTitle: '新增文章失敗',
    errorDescription: addArticleError,
  });

  useNotification({
    success: editArticleSuccess,
    error: editArticleFailed,
    successTitle: '更新文章成功',
    successDescription: '文章已成功更新',
    errorTitle: '更新文章失敗',
    errorDescription: editArticleError,
  });

  useEffect(() => {
    if (addArticleSuccess || editArticleSuccess) {
      setTimeout(() => {
        router.push('/zigong/articles');
      }, 1500);
    }
  }, [addArticleSuccess, editArticleSuccess, router]);

  const onSubmit = async (data: any) => {
    if (!userInfo) {
      toast({
        title: '錯誤',
        description: '請先登入',
        status: 'error',
        duration: 3000,
      });
      return;
    }

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

    if (isEditing && id) {
      dispatch(editArticleAsync({ articleId: id as string, body: formData }));
    } else {
      dispatch(addArticleAsync(formData));
    }
  };

  return (
    <LoadingLayout isLoading={addArticleLoading || editArticleLoading}>
      <Box minH='100vh' bg='gray.50' py={8}>
        <Container maxW='1400px'>
          <VStack spacing={6} align='stretch'>
            {/* Header */}
            <HStack justify='space-between' mb={4}>
              <HStack spacing={4}>
                <Button
                  leftIcon={<ArrowBackIcon />}
                  variant='ghost'
                  onClick={() => router.push('/zigong/articles')}
                >
                  返回列表
                </Button>
                <Heading size='lg'>
                  {isEditing ? '編輯文章' : '新增文章'}
                </Heading>
              </HStack>
            </HStack>

            {/* Form */}
            <FormProvider {...methods}>
              <Box bg='white' p={8} borderRadius='lg' shadow='sm'>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <VStack spacing={6} align='stretch'>
                    {/* 標題 */}
                    <FormControl isRequired>
                      <FormLabel htmlFor='title' fontWeight='bold'>
                        文章標題
                      </FormLabel>
                      <Input
                        id='title'
                        size='lg'
                        {...methods.register('title', {
                          required: '此欄位為必填',
                        })}
                        placeholder='輸入文章標題'
                      />
                    </FormControl>

                    {/* 標籤 */}
                    <FormControl>
                      <FormLabel htmlFor='tags' fontWeight='bold'>
                        標籤
                      </FormLabel>
                      <Input
                        id='tags'
                        {...methods.register('tags')}
                        placeholder='輸入文章標籤 (用逗號分隔)'
                      />
                    </FormControl>

                    {/* 文章摘要 */}
                    <FormControl>
                      <FormLabel htmlFor='excerpt' fontWeight='bold'>
                        文章摘要
                      </FormLabel>
                      <Input
                        id='excerpt'
                        {...methods.register('excerpt')}
                        placeholder='輸入文章摘要'
                      />
                    </FormControl>

                    {/* 文章內容區塊 */}
                    <FormControl>
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

                    {/* 狀態和分類 */}
                    <HStack spacing={4} align='flex-start'>
                      <FormControl flex={1}>
                        <FormLabel htmlFor='status' fontWeight='bold'>
                          狀態
                        </FormLabel>
                        <Select id='status' {...methods.register('status')}>
                          <option value='draft'>草稿</option>
                          <option value='published'>發佈</option>
                        </Select>
                      </FormControl>

                      <FormControl flex={1}>
                        <FormLabel htmlFor='category' fontWeight='bold'>
                          文章類別
                        </FormLabel>
                        <Select id='category' {...methods.register('category')}>
                          <option value=''>請選擇分類</option>
                          {categories?.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                              {cat.name}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </HStack>

                    {/* 封面圖片 */}
                    <FormControl>
                      <FormLabel htmlFor='cover' fontWeight='bold'>
                        封面圖片
                      </FormLabel>
                      <Input
                        id='cover'
                        type='file'
                        accept='image/*'
                        {...methods.register('coverImage')}
                      />
                    </FormControl>

                    {/* 精選文章 */}
                    <FormControl display='flex' alignItems='center'>
                      <FormLabel htmlFor='isFeatured' mb='0' fontWeight='bold'>
                        設為精選文章
                      </FormLabel>
                      <Switch
                        id='isFeatured'
                        {...methods.register('isFeatured')}
                        colorScheme='purple'
                      />
                    </FormControl>

                    {/* 操作按鈕 */}
                    <HStack justify='flex-end' pt={4}>
                      <Button
                        variant='outline'
                        onClick={() => router.push('/zigong/articles')}
                      >
                        取消
                      </Button>
                      <Button
                        type='submit'
                        colorScheme='purple'
                        isLoading={addArticleLoading || editArticleLoading}
                        loadingText='保存中...'
                      >
                        {isEditing ? '更新文章' : '新增文章'}
                      </Button>
                    </HStack>
                  </VStack>
                </form>
              </Box>
            </FormProvider>
          </VStack>
        </Container>
      </Box>
    </LoadingLayout>
  );
};

export default ArticleEditPage;
