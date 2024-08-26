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

import { Category } from '@models/entities/shared/products';
import { NewsItem } from '@models/responses/news';

import NewsCategoryModal from '@components/Modal/NewsCategoryModal';
import NewsModal from '@components/Modal/NewsModal';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { useNotification } from '@hooks/useNotification';
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

  const {
    list: news = [],
    metadata: newsMetadata,
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
      editNewsItemLoading,
      editNewsItemFailed,
      editNewsItemSuccess,
    },
    error: { addNewsItemError, deleteNewsItemError, editNewsItemError },
  } = useAppSelector((state) => state.adminNews);

  const {
    list: categories = [],
    metadata: newsCategoriesMetadata,
    status: {
      addNewsCategoryFailed,
      addNewsCategoryLoading,
      addNewsCategorySuccess,
      deleteNewsCategoryFailed,
      deleteNewsCategoryLoading,
      deleteNewsCategorySuccess,
      editNewsCategoryLoading,
      editNewsCategoryFailed,
      editNewsCategorySuccess,
    },
    error: {
      editNewsCategoryError,
      addNewsCategoryError,
      deleteNewsCategoryError,
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
    blocks: [],
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

  useNotification({
    success: addNewsItemSuccess,
    error: addNewsItemFailed,
    successTitle: '新增成功',
    successDescription: '新增最新消息建立成功',
    errorTitle: '新增最新消息失敗',
    errorDescription: addNewsItemError,
  });

  useNotification({
    success: editNewsItemSuccess,
    error: editNewsItemFailed,
    successTitle: '編輯成功',
    successDescription: '編輯最新消息成功',
    errorTitle: '編輯最新消息失敗',
    errorDescription: editNewsItemError,
  });

  useNotification({
    success: deleteNewsItemSuccess,
    error: deleteNewsItemFailed,
    successTitle: '刪除成功',
    successDescription: '刪除最新消息成功',
    errorTitle: '刪除最新消息失敗',
    errorDescription: deleteNewsItemError,
  });

  useNotification({
    success: addNewsCategorySuccess,
    error: addNewsCategoryFailed,
    successTitle: '新增成功',
    successDescription: '新增最新消息類別建立成功',
    errorTitle: '新增最新消息類別失敗',
    errorDescription: addNewsCategoryError,
  });

  useNotification({
    success: editNewsCategorySuccess,
    error: editNewsCategoryFailed,
    successTitle: '編輯成功',
    successDescription: '編輯最新消息類別建立成功',
    errorTitle: '編輯最新消息類別失敗',
    errorDescription: editNewsCategoryError,
  });
  deleteNewsCategorySuccess;

  useNotification({
    success: deleteNewsCategorySuccess,
    error: deleteNewsCategoryFailed,
    successTitle: '刪除成功',
    successDescription: '刪除最新消息類別建立成功',
    errorTitle: '刪除最新消息類別失敗',
    errorDescription: deleteNewsCategoryError,
  });

  return (
    <LoadingLayout
      isLoading={
        addNewsCategoryLoading ||
        deleteNewsItemLoading ||
        deleteNewsCategoryLoading ||
        addNewsItemLoading ||
        editNewsItemLoading ||
        editNewsCategoryLoading
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
          <NewsCategoryModal
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
