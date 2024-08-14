import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import CategoryModal from '@components/Modal/ArticleCategoryModal';
import ArticleModal from '@components/Modal/ArticleModal';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { useNotification } from '@hooks/useNotification';
import { Metadata } from '@models/entities/shared/pagination';
import { Category } from '@models/entities/shared/products';
import { Article } from '@models/responses/article.res';
import { resetArticleState } from '@reducers/admin/admin-articles';
import { resetCategoryState } from '@reducers/admin/admin-articles-category';
import {
  deleteArticleCategoryAsync,
  getAllArticleCategoriesAsync,
} from '@reducers/admin/admin-articles-category/actions';
import {
  deleteArticleAsync,
  getAllArticlesAsync,
} from '@reducers/admin/admin-articles/actions';
import { useEffect, useState } from 'react';
import ArticleList from './ArticleList';
import CategoryList from './CategoryList';

export default function ArticleManagement() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [modalType, setModalType] = useState<'article' | 'category' | null>(
    null,
  );

  const dispatch = useAppDispatch();

  const defaultMetadata: Metadata = {
    count: 0,
    page: 1,
    last: 1,
    limit: 10,
    sort: {},
    links: {
      first: '',
      previous: '',
      current: '',
      next: '',
      last: '',
    },
  };

  const {
    list: articles = [],
    metadata: articlesMetadata = defaultMetadata,
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
    list: categories = [],
    metadata: articlesCategoriesMetadata = defaultMetadata,
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

  const defaultArticle: Article = {
    _id: '',
    title: '',
    content: '',
    author: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    comments: [],
    tags: [],
    excerpt: '',
    status: 'draft',
    isFeatured: false,
    category: '',
    blocks: [],
    coverImage: null,
  };

  const defaultCategory: Category = {
    _id: '',
    name: '',
    description: '',
  };

  const openArticleModal = (article: Article | null = null) => {
    setCurrentArticle(article || defaultArticle);
    setModalType('article');
    onOpen();
  };

  const openCategoryModal = (category: Category | null = null) => {
    setCurrentCategory(category || defaultCategory);
    setModalType('category');
    onOpen();
  };

  const handleDeleteArticle = (articleId: string) => {
    dispatch(deleteArticleAsync(articleId));
  };

  const handleDeleteCategory = (categoryId: string) => {
    dispatch(deleteArticleCategoryAsync(categoryId));
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
    onSuccess: () => {
      onClose();
    },
  });

  useNotification({
    success: editArticleSuccess,
    error: editArticleFailed,
    successTitle: '更新文章成功',
    errorTitle: '更新文章失敗',
    errorDescription: editArticleError,
    onSuccess: () => {
      onClose();
    },
  });

  useNotification({
    success: deleteArticleSuccess,
    error: deleteArticleFailed,
    successTitle: '刪除文章成功',
    errorTitle: '刪除文章失敗',
    errorDescription: deleteArticleError,
  });

  useNotification({
    success: addCategorySuccess,
    error: addCategoryFailed,
    successTitle: '新增文章類別成功',
    errorTitle: '新增文章類別失敗',
    errorDescription: addCategoryError,
    onSuccess: () => {
      onClose();
    },
  });

  useNotification({
    success: deleteCategorySuccess,
    error: deleteCategoryFailed,
    successTitle: '刪除文章類別成功',
    errorTitle: '刪除文章類別失敗',
    errorDescription: deleteCategoryError,
  });

  useNotification({
    success: updateCategorySuccess,
    error: updateCategoryFailed,
    successTitle: '更新文章類別成功',
    errorTitle: '更新文章類別失敗',
    errorDescription: updateCategoryError,
    onSuccess: () => {
      onClose();
    },
  });

  useEffect(() => {
    dispatch(getAllArticlesAsync({ page: 1, limit: 10 }));
    dispatch(getAllArticleCategoriesAsync({ page: 1, limit: 10 }));

    return () => {
      dispatch(resetArticleState());
      dispatch(resetCategoryState());
    };
  }, [dispatch]);

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
              <ArticleList
                articles={articles}
                metadata={articlesMetadata}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                openArticleModal={openArticleModal}
                handleDeleteArticle={handleDeleteArticle}
              />
            </TabPanel>
            <TabPanel>
              <CategoryList
                categories={categories}
                metadata={articlesCategoriesMetadata}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleCategorySearch={handleCategorySearch}
                openCategoryModal={openCategoryModal}
                handleDeleteCategory={handleDeleteCategory}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>

        {modalType === 'article' && currentArticle && (
          <ArticleModal
            isOpen={isOpen}
            onClose={onClose}
            article={currentArticle}
            isEditing={Boolean(currentArticle?._id)}
          />
        )}
        {modalType === 'category' && currentCategory && (
          <CategoryModal
            isOpen={isOpen}
            onClose={onClose}
            category={currentCategory}
            isEditing={Boolean(currentCategory?._id)}
          />
        )}
      </Box>
    </LoadingLayout>
  );
}
