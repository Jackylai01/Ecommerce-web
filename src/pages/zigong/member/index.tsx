import { ProductCategoryForm } from '@components/Form/FormCRUD/ProductCategory';
import AddButton from '@components/Icons/AddFormIcon';
import Authors from '@components/Layout/AdminLayout/Tables/components/Authors';
import LoadingLayout from '@components/Layout/LoadingLayout';
import TabsLayout from '@components/Layout/TabsLayout';
import MessageModal from '@components/Modal/MessageModal';
import { UsersConfig } from '@fixtures/Tabs-configs';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { resetCategoryState } from '@reducers/admin/product-category';
import { addProductCategoryAsync } from '@reducers/admin/product-category/actions';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { tablesTableData } from 'src/variables/general';

const MembersPages: NextPage = () => {
  const dispatch = useAppDispatch();
  const {
    status: {
      addProductsCategoryFailed,
      addProductsCategoryLoading,
      addProductsCategorySuccess,
      updateProductsCategoryLoading,
      updateProductsCategorySuccess,
    },
    error: { addProductsCategoryError },
  } = useAppSelector((state) => state.adminProductsCategory);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState<string>('新增產品類別');

  useEffect(() => {
    if (addProductsCategorySuccess) {
      setIsModalOpen(true);
      setModalContent('產品類別新增成功！');
      setModalTitle('新增產品類別');
    }
    if (updateProductsCategorySuccess) {
      setIsModalOpen(true);
      setModalContent('產品類別更新成功！');
      setModalTitle('更新產品類別');
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
    <LoadingLayout
      isLoading={addProductsCategoryLoading || updateProductsCategoryLoading}
    >
      <AddButton
        formTitle='Add Members Category'
        formContent={<ProductCategoryForm />}
        onSubmit={handleSubmit}
      />
      <TabsLayout tabsConfig={UsersConfig}>
        <Authors
          title={'會員管理'}
          captions={['Author', 'Function', 'Status', 'Employed', '']}
          data={tablesTableData}
        />
      </TabsLayout>
      <MessageModal
        title={modalTitle}
        isActive={isModalOpen}
        error={addProductsCategoryError}
        onClose={handleCloseModal}
      >
        {modalContent}
      </MessageModal>
    </LoadingLayout>
  );
};

export default MembersPages;
