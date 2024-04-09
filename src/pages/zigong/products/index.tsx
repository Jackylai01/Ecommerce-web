import { ProductFormContent } from '@components/Form/FormCRUD/ProductsContent';
import AddButton from '@components/Icons/AddFormIcon';
import dynamic from 'next/dynamic';

import LoadingLayout from '@components/Layout/LoadingLayout';
import TabsLayout from '@components/Layout/TabsLayout';
import MessageModal from '@components/Modal/MessageModal';
import { ProductsConfig } from '@fixtures/Tabs-configs';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { resetProductState } from '@reducers/admin/products';
import { addProductAsync } from '@reducers/admin/products/actions';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const ProductTableContainer = dynamic(
  () => import('@components/Layout/AdminLayout/Products'),
  { ssr: false },
);

const ProductsPages: NextPage = () => {
  const dispatch = useAppDispatch();
  const {
    status: {
      addProductSuccess,
      addProductFailed,
      addProductLoading,
      updateProductLoading,
      updateProductSuccess,
      updateProductFailed,
    },
    error: { addProductError },
  } = useAppSelector((state) => state.adminProducts);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('新增產品');

  useEffect(() => {
    if (addProductSuccess) {
      setIsModalOpen(true);
      setModalContent('產品新增成功！');
      setModalTitle('新增產品');
    }

    if (updateProductSuccess) {
      setIsModalOpen(true);
      setModalContent('產品更新成功！');
      setModalTitle('更新產品');
    }

    if (addProductFailed) {
      setIsModalOpen(true);
      setModalContent('');
    }
  }, [addProductSuccess, updateProductSuccess, addProductFailed]);

  const handleSubmit = async (data: any) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (
        key !== 'coverImage' &&
        key !== 'images' &&
        key !== 'specifications' &&
        key !== 'tags' &&
        data[key] !== undefined
      ) {
        formData.append(key, data[key]);
      }
    });

    if (data.coverImage) {
      formData.append('coverImage', data.coverImage);
    }
    if (data.images && data.images.length) {
      data.images.forEach((image: any) => {
        formData.append('images', image);
      });
    }

    if (data.tags && Array.isArray(data.tags)) {
      data.tags.forEach((tagId: any) => {
        formData.append('tags', tagId);
      });
    }
    if (data.specifications) {
      formData.append('specifications', JSON.stringify(data.specifications));
    }
    if (data.detailDescription) {
      formData.append(
        'detailDescription',
        JSON.stringify(data.detailDescription),
      );
    }
    dispatch(addProductAsync(formData));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    return () => {
      dispatch(resetProductState());
    };
  }, [dispatch]);

  return (
    <>
      <LoadingLayout isLoading={addProductLoading || updateProductLoading}>
        <AddButton
          formTitle='Add Product'
          formContent={<ProductFormContent />}
          onSubmit={handleSubmit}
        />
        <TabsLayout tabsConfig={ProductsConfig}>
          <ProductTableContainer />
        </TabsLayout>
        <MessageModal
          title={modalTitle}
          isActive={isModalOpen}
          error={addProductError}
          onClose={handleCloseModal}
        >
          {modalContent}
        </MessageModal>
      </LoadingLayout>
    </>
  );
};

export default ProductsPages;
