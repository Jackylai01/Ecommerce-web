import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import CategoryModal from '@components/Modal/ArticleCategoryModal';
import ArticleModal from '@components/Modal/ArticleModal';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { resetArticleState } from '@reducers/admin/admin-articles';

import {
  deleteArticleCategoryAsync,
  getAllArticleCategoriesAsync,
} from '@reducers/admin/admin-articles-category/actions';
import {
  deleteArticleAsync,
  getAllArticlesAsync,
} from '@reducers/admin/admin-articles/actions';
import { useEffect, useState } from 'react';

export default function ArticleManagement() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState<'article' | 'category' | null>(
    null,
  );
  const [currentArticle, setCurrentArticle] = useState<any>(null);
  const [currentCategory, setCurrentCategory] = useState<any>(null);

  const dispatch = useAppDispatch();
  const {
    list: articles,
    status: {
      addArticleFailed,
      addArticleLoading,
      addArticleSuccess,
      editArticleLoading,
      editArticleFailed,
      editArticleSuccess,
      deleteArticleSuccess,
      deleteArticleFailed,
      deleteArticleLoading,
    },
    error: { addArticleError, deleteArticleError, editArticleError },
  } = useAppSelector((state) => state.adminArticles);
  const {
    list: categories,
    status: {
      addCategoryLoading,
      deleteCategoryLoading,
      updateCategoryLoading,
      addCategoryFailed,
      addCategorySuccess,
      updateCategoryFailed,
      updateCategorySuccess,
      deleteCategoryFailed,
      deleteCategorySuccess,
    },
    error: { addCategoryError, updateCategoryError, deleteCategoryError },
  } = useAppSelector((state) => state.adminArticlesCategories);

  useEffect(() => {
    dispatch(getAllArticlesAsync({ page: 1, limit: 10 }));
    dispatch(getAllArticleCategoriesAsync({ page: 1, limit: 10 }));
  }, [dispatch]);

  const openArticleModal = (article: any = null) => {
    if (!article) {
      setCurrentArticle({
        title: '',
        tags: [],
        excerpt: '',
        status: 'draft',
        coverImage: null,
        isFeatured: false,
        category: '',
        blocks: [],
      });
    } else {
      setCurrentArticle(article);
    }
    setModalType('article');
    onOpen();
  };

  const handleDeleteArticle = (articleId: string) => {
    dispatch(deleteArticleAsync(articleId));
  };

  const handleDeleteCategory = (categoryId: string) => {
    dispatch(deleteArticleCategoryAsync(categoryId));
  };

  const openCategoryModal = (category: any = null) => {
    setCurrentCategory(category);
    setModalType('category');
    onOpen();
  };

  useEffect(() => {
    if (addArticleSuccess) {
      toast({
        title: '新增文章成功',
        status: 'success',
        isClosable: true,
      });
      dispatch(getAllArticlesAsync({ page: 1, limit: 10 }));
    } else if (addArticleFailed) {
      toast({
        title: '新增文章失敗',
        description: addArticleError,
        status: 'error',
        isClosable: true,
      });
    }
  }, [
    toast,
    addArticleSuccess,
    addArticleFailed,
    addArticleError,
    onClose,
    dispatch,
  ]);

  useEffect(() => {
    if (editArticleSuccess) {
      toast({
        title: '更新文章成功',
        status: 'success',
        isClosable: true,
      });
    } else if (editArticleFailed) {
      toast({
        title: '更新文章失敗',
        description: editArticleError,
        status: 'error',
        isClosable: true,
      });
    }
  }, [toast, editArticleSuccess, editArticleFailed, editArticleError]);

  useEffect(() => {
    if (deleteArticleSuccess) {
      toast({
        title: '刪除文章成功',
        description: '刪除文章成功',
        status: 'success',
        isClosable: true,
      });
      dispatch(resetArticleState());
    } else if (deleteArticleFailed) {
      toast({
        title: '刪除文章失敗',
        description: deleteArticleError,
        status: 'error',
        isClosable: true,
      });
    }
  }, [toast, deleteArticleFailed, deleteArticleSuccess, deleteArticleError]);

  useEffect(() => {
    if (addCategorySuccess) {
      toast({
        title: '新增成功',
        status: 'success',
        isClosable: true,
      });
      onClose();

      dispatch(getAllArticleCategoriesAsync({ page: 1, limit: 10 }));
    } else if (addCategoryFailed) {
      toast({
        title: '新增文章類別失敗',
        description: addCategoryError,
        status: 'error',
        isClosable: true,
      });
    }
  }, [
    toast,
    addCategorySuccess,
    addCategoryFailed,
    addCategoryError,
    onClose,
    dispatch,
  ]);

  useEffect(() => {
    if (deleteCategorySuccess) {
      toast({
        title: '刪除文章類別成功',
        status: 'success',
        isClosable: true,
      });

      dispatch(getAllArticleCategoriesAsync({ page: 1, limit: 10 }));
    } else if (deleteCategoryFailed) {
      toast({
        title: '刪除文章類別失敗',
        description: deleteCategoryError,
        status: 'error',
        isClosable: true,
      });
    }
  }, [
    toast,
    dispatch,
    deleteCategoryFailed,
    deleteCategorySuccess,
    deleteCategoryError,
  ]);

  useEffect(() => {
    if (updateCategorySuccess) {
      toast({
        title: '更新文章類別成功',
        status: 'success',
        isClosable: true,
      });

      dispatch(getAllArticleCategoriesAsync({ page: 1, limit: 10 }));
    } else if (updateCategoryFailed) {
      toast({
        title: '更新文章類別失敗',
        description: updateCategoryError,
        status: 'error',
        isClosable: true,
      });
    }
  }, [
    toast,
    dispatch,
    updateCategoryFailed,
    updateCategorySuccess,
    updateCategoryError,
  ]);

  return (
    <LoadingLayout
      isLoading={
        addArticleLoading ||
        addCategoryLoading ||
        deleteCategoryLoading ||
        updateCategoryLoading ||
        editArticleLoading ||
        deleteArticleLoading
      }
    >
      <Box py='2rem' w='100%'>
        <Heading as='h1' mb='2rem' textAlign='center'>
          文章管理後台
        </Heading>
        <Tabs>
          <TabList>
            <Tab>文章管理</Tab>
            <Tab>文章類別管理</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box
                bg='white'
                boxShadow='lg'
                borderRadius='12px'
                p='2rem'
                mb='2rem'
              >
                <Button colorScheme='purple' onClick={() => openArticleModal()}>
                  + 新增文章
                </Button>
                <Box overflowX='auto' mt='2rem'>
                  <Table variant='simple'>
                    <Thead>
                      <Tr>
                        <Th>標題</Th>
                        <Th>狀態</Th>
                        <Th>編輯人</Th>
                        <Th>封面圖片</Th>
                        <Th>操作</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {articles?.map((article) => (
                        <Tr key={article._id}>
                          <Td>{article.title}</Td>
                          <Td>
                            <Badge
                              colorScheme={
                                article.status === 'published'
                                  ? 'green'
                                  : 'yellow'
                              }
                            >
                              {article.status === 'published'
                                ? '已發佈'
                                : '草稿'}
                            </Badge>
                          </Td>
                          <Td>{article.editor}</Td>
                          <Td>
                            <Image
                              src={article.coverImage}
                              alt='封面'
                              boxSize='48px'
                              borderRadius='6px'
                              objectFit='cover'
                              boxShadow='md'
                            />
                          </Td>
                          <Td>
                            <Flex gap='0.5rem'>
                              <Button
                                colorScheme='purple'
                                size='sm'
                                onClick={() => openArticleModal(article)}
                              >
                                編輯
                              </Button>
                              <Button
                                colorScheme='red'
                                size='sm'
                                onClick={() => handleDeleteArticle(article._id)}
                              >
                                刪除
                              </Button>
                            </Flex>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box
                bg='white'
                boxShadow='lg'
                borderRadius='12px'
                p='2rem'
                mb='2rem'
              >
                <Button
                  colorScheme='purple'
                  onClick={() => openCategoryModal()}
                >
                  + 新增文章類別
                </Button>
                <Box overflowX='auto' mt='2rem'>
                  <Table variant='simple'>
                    <Thead>
                      <Tr>
                        <Th>類別名稱</Th>
                        <Th>描述</Th>
                        <Th>操作</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {categories?.map((category) => (
                        <Tr key={category?._id}>
                          <Td>{category?.name || '無名'}</Td>
                          <Td>{category?.description || '無描述'}</Td>
                          <Td>
                            <Flex gap='0.5rem'>
                              <Button
                                colorScheme='purple'
                                size='sm'
                                onClick={() => openCategoryModal(category)}
                              >
                                編輯
                              </Button>
                              <Button
                                colorScheme='red'
                                size='sm'
                                onClick={() =>
                                  handleDeleteCategory(category._id)
                                }
                              >
                                刪除
                              </Button>
                            </Flex>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {modalType === 'article' && (
          <ArticleModal
            isOpen={isOpen}
            onClose={onClose}
            article={currentArticle}
            isEditing={Boolean(currentArticle)}
          />
        )}
        {modalType === 'category' && (
          <CategoryModal
            isOpen={isOpen}
            onClose={onClose}
            category={currentCategory}
            isEditing={Boolean(currentCategory)}
          />
        )}
      </Box>
    </LoadingLayout>
  );
}
