import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
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
import { useNotification } from '@hooks/useNotification';
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
  const [searchTerm, setSearchTerm] = useState('');
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

  const handleSearch = (searchTerm: string) => {
    dispatch(getAllArticlesAsync({ page: 1, limit: 10, search: searchTerm }));
  };
  const handleCategorySearch = (searchTerm: string) => {
    dispatch(
      getAllArticleCategoriesAsync({ page: 1, limit: 10, search: searchTerm }),
    );
  };

  useNotification({
    success: addArticleSuccess,
    error: addArticleFailed,
    successTitle: '新增文章成功',
    successDescription: '新增文章建立成功',
    errorTitle: '新增文章失敗',
    errorDescription: addArticleError,
    onSuccess: () => dispatch(getAllArticlesAsync({ page: 1, limit: 10 })),
  });

  useNotification({
    success: editArticleSuccess,
    error: editArticleFailed,
    successTitle: '更新文章成功',
    errorTitle: '更新文章失敗',
    errorDescription: editArticleError,
  });

  useNotification({
    success: deleteArticleSuccess,
    error: deleteArticleFailed,
    successTitle: '刪除文章成功',
    errorTitle: '刪除文章失敗',
    errorDescription: deleteArticleError,
    onSuccess: () => dispatch(resetArticleState()),
  });

  useNotification({
    success: addCategorySuccess,
    error: addCategoryFailed,
    successTitle: '新增文章類別成功',
    errorTitle: '新增文章類別失敗',
    errorDescription: addCategoryError,
    onSuccess: () =>
      dispatch(getAllArticleCategoriesAsync({ page: 1, limit: 10 })),
  });

  useNotification({
    success: deleteCategorySuccess,
    error: deleteCategoryFailed,
    successTitle: '刪除文章類別成功',
    errorTitle: '刪除文章類別失敗',
    errorDescription: deleteCategoryError,
    onSuccess: () =>
      dispatch(getAllArticleCategoriesAsync({ page: 1, limit: 10 })),
  });

  useNotification({
    success: updateCategorySuccess,
    error: updateCategoryFailed,
    successTitle: '更新文章類別成功',
    errorTitle: '更新文章類別失敗',
    errorDescription: updateCategoryError,
    onSuccess: () =>
      dispatch(getAllArticleCategoriesAsync({ page: 1, limit: 10 })),
  });

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
                <Box display='flex' flexDirection='row' mt='1rem'>
                  <Input
                    placeholder='搜尋文章'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button onClick={() => handleSearch(searchTerm)}>搜尋</Button>
                </Box>
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
                          <Td>{article.author.username}</Td>
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
                <Box display='flex' flexDirection='row' mt='1rem'>
                  <Input
                    placeholder='搜尋文章類別'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button onClick={() => handleCategorySearch(searchTerm)}>
                    搜尋
                  </Button>
                </Box>
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
