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

import { Metadata } from '@models/entities/shared/pagination';
import { Category } from '@models/entities/shared/products';
import { NewsItem } from '@models/responses/news';

import CategoryModal from '@components/Modal/ArticleCategoryModal';
import NewsModal from '@components/Modal/NewsModal';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  deleteNewsCategoryAsync,
  getAllNewsCategoriesAsync,
} from '@reducers/admin/admin-news-categorys/actions';
import {
  deleteNewsItemAsync,
  getAllNewsItemsAsync,
} from '@reducers/admin/admin-news/actions';
import { useEffect, useState } from 'react';
import CategoryList from '../ArticleManagement/CategoryList';
import NewsList from './NewsList';

export default function NewsManagement() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentNews, setCurrentNews] = useState<NewsItem | null>(null);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [modalType, setModalType] = useState<'news' | 'category' | null>(null);

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
    list: news = [],
    metadata: newsMetadata = defaultMetadata,
    status: {
      addNewsItemFailed,
      addNewsItemLoading,
      addNewsItemSuccess,
      getAllNewsItemsLoading,
      getAllNewsItemsFailed,
      getAllNewsItemsSuccess,
      getNewsItemByIdFailed,
      getNewsItemByIdLoading,
      getNewsItemByIdSuccess,
      deleteNewsItemLoading,
      deleteNewsItemFailed,
      deleteNewsItemSuccess,
    },
    error: { addNewsItemError, getAllNewsItemsError, getNewsItemByIdError },
  } = useAppSelector((state) => state.adminNews);

  const {
    list: categories = [],
    metadata: newsCategoriesMetadata = defaultMetadata,
    status: {
      addNewsCategoryFailed,
      addNewsCategoryLoading,
      addNewsCategorySuccess,
      getAllNewsCategoriesFailed,
      getAllNewsCategoriesLoading,
      getAllNewsCategoriesSuccess,
      getNewsCategoryByIdFailed,
      getNewsCategoryByIdLoading,
      getNewsCategoryByIdSuccess,
      deleteNewsCategoryFailed,
      deleteNewsCategoryLoading,
      deleteNewsCategorySuccess,
    },
    error: {
      getAllNewsCategoriesError,
      getNewsCategoryByIdError,
      addNewsCategoryError,
    },
  } = useAppSelector((state) => state.adminNewsCategories);

  useEffect(() => {
    dispatch(getAllNewsItemsAsync({ page: 1, limit: 10 }));
    dispatch(getAllNewsCategoriesAsync({ page: 1, limit: 10 }));
  }, [dispatch]);

  const defaultNews: NewsItem = {
    _id: '',
    title: '',
    content: '',
    date: new Date().toISOString(),
    coverImage: {
      imageUrl: '',
      imageId: '',
    },
  };

  const defaultCategory: Category = {
    _id: '',
    name: '',
    description: '',
  };

  const openNewsModal = (news: NewsItem | null = null) => {
    setCurrentNews(news || defaultNews);
    setModalType('news');
    onOpen();
  };

  const openCategoryModal = (category: Category | null = null) => {
    setCurrentCategory(category || defaultCategory);
    setModalType('category');
    onOpen();
  };

  const handleDeleteNews = (newsId: string) => {
    dispatch(deleteNewsItemAsync(newsId));
  };

  const handleDeleteCategory = (categoryId: string) => {
    dispatch(deleteNewsCategoryAsync(categoryId));
  };

  const handleSearch = (searchTerm: string) => {
    dispatch(getAllNewsItemsAsync({ page: 1, limit: 10, search: searchTerm }));
  };

  const handleCategorySearch = (searchTerm: string) => {
    dispatch(
      getAllNewsCategoriesAsync({ page: 1, limit: 10, search: searchTerm }),
    );
  };

  return (
    <LoadingLayout
      isLoading={
        addNewsCategoryLoading ||
        deleteNewsItemLoading ||
        deleteNewsCategoryLoading ||
        addNewsItemLoading
      }
    >
      <Box py='2rem' w='100%'>
        <Heading as='h1' mb='2rem' textAlign='center'>
          最新消息管理後台
        </Heading>
        <Tabs>
          <TabList>
            <Tab>最新消息管理</Tab>
            <Tab>最新消息類別管理</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <NewsList
                news={news ?? []}
                metadata={newsMetadata}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                openNewsModal={openNewsModal}
                handleDeleteNews={handleDeleteNews}
              />
            </TabPanel>
            <TabPanel>
              <CategoryList
                categories={categories}
                metadata={newsCategoriesMetadata}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleCategorySearch={handleCategorySearch}
                openCategoryModal={openCategoryModal}
                handleDeleteCategory={handleDeleteCategory}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>

        {modalType === 'news' && currentNews && (
          <NewsModal
            isOpen={isOpen}
            onClose={onClose}
            news={currentNews}
            isEditing={Boolean(currentNews?._id)}
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
