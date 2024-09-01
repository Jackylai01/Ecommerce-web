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
import FaqCategoryList from '@components/Layout/AdminLayout/Faq/FaqCategoryList';
import FaqList from '@components/Layout/AdminLayout/Faq/FaqList';
import LoadingLayout from '@components/Layout/LoadingLayout';
import CategoryModal from '@components/Modal/FaqCategoryModal';
import FaqModal from '@components/Modal/FaqModal';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { useNotification } from '@hooks/useNotification';
import { Metadata } from '@models/entities/shared/pagination';
import { Category } from '@models/entities/shared/products';
import { Faq } from '@models/responses/faq.res';
import { resetFaqState } from '@reducers/admin/admin-faq';
import { resetCategoryState } from '@reducers/admin/admin-faq-category';
import {
  deleteFaqCategoryAsync,
  getAllFaqCategoriesAsync,
  getFaqCategoryByIdAsync,
} from '@reducers/admin/admin-faq-category/actions';
import {
  deleteFaqAsync,
  getAllFaqsAsync,
} from '@reducers/admin/admin-faq/actions';
import { useEffect, useState } from 'react';

export default function FaqManagement() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFaq, setCurrentFaq] = useState<Faq | null>(null);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [modalType, setModalType] = useState<'faq' | 'category' | null>(null);

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
    list: faqs,
    metadata: faqsMetadata,
    status: {
      addFaqFailed,
      addFaqLoading,
      addFaqSuccess,
      deleteFaqSuccess,
      deleteFaqFailed,
      deleteFaqLoading,
      updateFaqFailed,
      updateFaqLoading,
      updateFaqSuccess,
    },
    error: { addFaqError, deleteFaqError, updateFaqError },
  } = useAppSelector((state) => state.adminFaq);

  const {
    list: categories,
    metadata: faqCategoriesMetadata,
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
  } = useAppSelector((state) => state.adminFaqCategory);

  useEffect(() => {
    dispatch(getAllFaqsAsync({ page: 1, limit: 10 }));
    dispatch(getAllFaqCategoriesAsync({ page: 1, limit: 10 }));
  }, [dispatch]);

  const defaultFaq: Faq = {
    _id: '',
    question: '',
    answer: '',
    category: {},
  };

  const defaultCategory: Category = {
    _id: '',
    name: '',
    description: '',
  };

  const openFaqModal = (faq: Faq | null = null) => {
    setCurrentFaq(faq || defaultFaq);
    setModalType('faq');
    onOpen();
  };

  const openCategoryModal = (category?: Category) => {
    if (category && category._id) {
      dispatch(getFaqCategoryByIdAsync(category._id)).then(() => {
        setCurrentCategory(category);
        setModalType('category');
        onOpen();
      });
    } else {
      setCurrentCategory(defaultCategory);
      setModalType('category');
      onOpen();
    }
  };
  const handleDeleteFaq = (faqId: string) => {
    dispatch(deleteFaqAsync(faqId));
  };

  const handleDeleteCategory = (categoryId: string) => {
    dispatch(deleteFaqCategoryAsync(categoryId));
  };

  const handleSearch = (searchTerm: string) => {
    dispatch(getAllFaqsAsync({ page: 1, limit: 10, search: searchTerm }));
  };

  const handleCategorySearch = (searchTerm: string) => {
    dispatch(
      getAllFaqCategoriesAsync({ page: 1, limit: 10, search: searchTerm }),
    );
  };

  useNotification({
    success: addFaqSuccess,
    error: addFaqFailed,
    successTitle: '新增常見問答成功',
    successDescription: '新增常見問答建立成功',
    errorTitle: '新增常見問答失敗',
    errorDescription: addFaqError,
  });

  useNotification({
    success: updateFaqSuccess,
    error: updateFaqFailed,
    successTitle: '更新常見問答成功',
    errorTitle: '更新常見問答失敗',
    errorDescription: updateFaqError,
  });

  useNotification({
    success: deleteFaqSuccess,
    error: deleteFaqFailed,
    successTitle: '刪除常見問答成功',
    errorTitle: '刪除常見問答失敗',
    errorDescription: deleteFaqError,
  });

  useNotification({
    success: addCategorySuccess,
    error: addCategoryFailed,
    successTitle: '新增常見問答類別成功',
    errorTitle: '新增常見問答類別失敗',
    errorDescription: addCategoryError,
  });

  useNotification({
    success: deleteCategorySuccess,
    error: deleteCategoryFailed,
    successTitle: '刪除常見問答類別成功',
    errorTitle: '刪除常見問答類別失敗',
    errorDescription: deleteCategoryError,
  });

  useNotification({
    success: updateCategorySuccess,
    error: updateCategoryFailed,
    successTitle: '更新常見問答類別成功',
    errorTitle: '更新常見問答類別失敗',
    errorDescription: updateCategoryError,
  });

  useEffect(() => {
    dispatch(getAllFaqsAsync({ page: 1, limit: 10 }));
    dispatch(getAllFaqCategoriesAsync({ page: 1, limit: 10 }));

    return () => {
      dispatch(resetFaqState());
      dispatch(resetCategoryState());
    };
  }, [dispatch]);

  return (
    <LoadingLayout
      isLoading={
        addFaqLoading ||
        addCategoryLoading ||
        deleteCategoryLoading ||
        updateCategoryLoading ||
        updateFaqLoading ||
        deleteFaqLoading
      }
    >
      <Box py='2rem' w='100%'>
        <Heading as='h1' mb='2rem' textAlign='center'>
          常見問答管理後台
        </Heading>
        <Tabs>
          <TabList>
            <Tab>常見問答管理</Tab>
            <Tab>常見問答類別管理</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <FaqList
                faqs={faqs}
                metadata={faqsMetadata}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                openFaqModal={openFaqModal}
                handleDeleteFaq={handleDeleteFaq}
              />
            </TabPanel>
            <TabPanel>
              <FaqCategoryList
                categories={categories}
                metadata={faqCategoriesMetadata}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleCategorySearch={handleCategorySearch}
                openCategoryModal={openCategoryModal}
                handleDeleteCategory={handleDeleteCategory}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>

        {modalType === 'faq' && currentFaq && (
          <FaqModal
            isOpen={isOpen}
            onClose={onClose}
            faq={currentFaq}
            isEditing={Boolean(currentFaq?._id)}
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
