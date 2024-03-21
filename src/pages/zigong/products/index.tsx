import { ProductFormContent } from '@components/Form/FormCRUD/ProductsContent';
import AddButton from '@components/Icons/AddFormIcon';
import ProductTableContainer from '@components/Layout/AdminLayout/Products';
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

const ProductsPages: NextPage = () => {
  const dispatch = useAppDispatch();
  const {
    status: { addProductSuccess, addProductFailed, addProductLoading },
    error: { addProductError },
  } = useAppSelector((state) => state.adminProducts);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    if (addProductSuccess) {
      setIsModalOpen(true);
      setModalContent('產品新增成功！');
    }
    if (addProductFailed) {
      setIsModalOpen(true);
      setModalContent('');
    }
  }, [addProductSuccess, addProductFailed, addProductLoading]);

  const handleSubmit = async (data: any) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (
        key !== 'coverImage' &&
        key !== 'images' &&
        key !== 'specifications'
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

    if (data.specifications) {
      formData.append('specifications', JSON.stringify(data.specifications));
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
      <LoadingLayout isLoading={addProductLoading}>
        <AddButton
          formTitle='Add Product'
          formContent={<ProductFormContent />}
          onSubmit={handleSubmit}
        />
        <TabsLayout tabsConfig={ProductsConfig}>
          <ProductTableContainer />
        </TabsLayout>
        <MessageModal
          title='新增產品'
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
