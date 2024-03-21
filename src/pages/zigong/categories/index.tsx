import { ProductCategoryForm } from '@components/Form/FormCRUD/ProductCategory';
import AddButton from '@components/Icons/AddFormIcon';
import ProductCategories from '@components/Layout/AdminLayout/Products/components/ProductCategories';
import LoadingLayout from '@components/Layout/LoadingLayout';
import TabsLayout from '@components/Layout/TabsLayout';
import MessageModal from '@components/Modal/MessageModal';
import { ProductsConfig } from '@fixtures/Tabs-configs';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { resetCategoryState } from '@reducers/admin/product-category';
import { addProductCategoryAsync } from '@reducers/admin/product-category/actions';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const CategoriesPages: NextPage = () => {
  const dispatch = useAppDispatch();
  const {
    status: {
      addProductsCategoryFailed,
      addProductsCategoryLoading,
      addProductsCategorySuccess,
    },
    error: { addProductsCategoryError },
  } = useAppSelector((state) => state.adminProductsCategory);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    if (addProductsCategorySuccess) {
      setIsModalOpen(true);
      setModalContent('產品類別新增成功！');
    }
    if (addProductsCategoryFailed) {
      setIsModalOpen(true);
      setModalContent('');
    }
  }, [
    addProductsCategoryFailed,
    addProductsCategoryLoading,
    addProductsCategorySuccess,
  ]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (data: any) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key !== 'coverImage') {
        formData.append(key, data[key]);
      }
    });

    if (data.coverImage) {
      formData.append('coverImage', data.coverImage);
    }

    dispatch(addProductCategoryAsync(formData));
  };
  useEffect(() => {
    return () => {
      dispatch(resetCategoryState());
    };
  }, [dispatch]);

  return (
    <LoadingLayout isLoading={addProductsCategoryLoading}>
      <AddButton
        formTitle='Add Product Category'
        formContent={<ProductCategoryForm />}
        onSubmit={handleSubmit}
      />
      <TabsLayout tabsConfig={ProductsConfig}>
        <ProductCategories />
      </TabsLayout>
      <MessageModal
        title='新增產品類別'
        isActive={isModalOpen}
        error={addProductsCategoryError}
        onClose={handleCloseModal}
      >
        {modalContent}
      </MessageModal>
    </LoadingLayout>
  );
};

export default CategoriesPages;
