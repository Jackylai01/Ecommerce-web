import { useDisclosure } from '@chakra-ui/react';
import { ProductFormContent } from '@components/Form/FormCRUD/ProductsContent';
import AddButton from '@components/Icons/AddFormIcon';
import LoadingLayout from '@components/Layout/LoadingLayout';
import TabsLayout from '@components/Layout/TabsLayout';
import MessageModal from '@components/Modal/MessageModal';
import { ProductsConfig } from '@fixtures/Tabs-configs';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { resetProductState } from '@reducers/admin/products';
import { addProductAsync } from '@reducers/admin/products/actions';
import { resetAdminUpload } from '@reducers/admin/upload';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ProductTableContainer = dynamic(
  () => import('@components/Layout/AdminLayout/Products'),
  { ssr: false },
);

const ProductsPages: NextPage = () => {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    status: {
      addProductSuccess,
      addProductFailed,
      addProductLoading,
      bulkUploadProductsFailed,
      bulkUploadProductsLoading,
      bulkUploadProductsSuccess,
    },
    error: { addProductError, bulkUploadProductsError },
  } = useAppSelector((state) => state.adminProducts);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('新增產品');

  useEffect(() => {
    if (addProductSuccess) {
      setIsModalOpen(true);
      setModalContent('產品新增成功！');
      setModalTitle('新增產品');
      dispatch(resetAdminUpload());
    }

    if (addProductFailed) {
      setIsModalOpen(true);
      setModalContent('產品新增失敗');
      dispatch(resetAdminUpload());
    }

    if (bulkUploadProductsSuccess) {
      setIsModalOpen(true);
      setModalContent('批量上傳產品成功！');
      setModalTitle('批量上傳產品');
      dispatch(resetAdminUpload());
    }

    if (bulkUploadProductsFailed) {
      setIsModalOpen(true);
      setModalContent('批量上傳產品失敗');
      setModalTitle('批量上傳產品');
      dispatch(resetAdminUpload());
    }
  }, [
    dispatch,
    addProductSuccess,
    addProductFailed,
    bulkUploadProductsSuccess,
    bulkUploadProductsFailed,
  ]);

  const handleSubmit = async (data: any) => {
    dispatch(addProductAsync(data));
    dispatch(resetAdminUpload());
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  /** 處理批量上傳產品的API */

  useEffect(() => {
    return () => {
      dispatch(resetProductState());
    };
  }, [dispatch]);

  return (
    <>
      <LoadingLayout isLoading={addProductLoading || bulkUploadProductsLoading}>
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
          error={addProductError || bulkUploadProductsError}
          onClose={handleCloseModal}
        >
          {modalContent}
        </MessageModal>
      </LoadingLayout>
    </>
  );
};

export default ProductsPages;
