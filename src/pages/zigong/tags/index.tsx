import { ProductTagsForm } from '@components/Form/FormCRUD/ProductsTags';
import AddButton from '@components/Icons/AddFormIcon';
import ProductTags from '@components/Layout/AdminLayout/Products/components/ProductTags';
import LoadingLayout from '@components/Layout/LoadingLayout';
import TabsLayout from '@components/Layout/TabsLayout';
import MessageModal from '@components/Modal/MessageModal';
import { ProductsConfig } from '@fixtures/Tabs-configs';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { resetTagsState } from '@reducers/admin/product-tags';
import { addProductTagsAsync } from '@reducers/admin/product-tags/actions';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const TagsPages: NextPage = () => {
  const dispatch = useAppDispatch();
  const {
    status: {
      addProductsTagsFailed,
      addProductsTagsLoading,
      addProductsTagsSuccess,
      updateProductsTagsLoading,
      updateProductsTagsFailed,
      updateProductsTagsSuccess,
    },
    error: { addProductsTagsError },
  } = useAppSelector((state) => state.adminProductsTags);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [mainTitle, setMainTitle] = useState('新增產品標籤');

  useEffect(() => {
    if (addProductsTagsSuccess) {
      setIsModalOpen(true);
      setModalContent('產品標籤新增成功！');
      setMainTitle('新增產品標籤');
    }

    if (updateProductsTagsSuccess) {
      setIsModalOpen(true);
      setModalContent('產品標籤更新成功！');
      setMainTitle('更新產品標籤');
    }

    if (addProductsTagsLoading || updateProductsTagsFailed) {
      setIsModalOpen(true);
      setModalContent('');
    }
  }, [
    addProductsTagsFailed,
    addProductsTagsSuccess,
    updateProductsTagsSuccess,
    updateProductsTagsFailed,
  ]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (data: any) => {
    dispatch(addProductTagsAsync(data));
  };

  useEffect(() => {
    return () => {
      dispatch(resetTagsState());
    };
  }, [dispatch]);

  return (
    <LoadingLayout
      isLoading={addProductsTagsLoading || updateProductsTagsLoading}
    >
      <AddButton
        formTitle='Add Product Tags'
        formContent={<ProductTagsForm />}
        onSubmit={handleSubmit}
      />
      <TabsLayout tabsConfig={ProductsConfig}>
        <ProductTags />
      </TabsLayout>
      <MessageModal
        title={mainTitle}
        isActive={isModalOpen}
        error={addProductsTagsError}
        onClose={handleCloseModal}
      >
        {modalContent}
      </MessageModal>
    </LoadingLayout>
  );
};

export default TagsPages;
