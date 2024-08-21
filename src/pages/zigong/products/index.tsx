import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { ProductFormContent } from '@components/Form/FormCRUD/ProductsContent';
import AddButton from '@components/Icons/AddFormIcon';
import LoadingLayout from '@components/Layout/LoadingLayout';
import TabsLayout from '@components/Layout/TabsLayout';
import MessageModal from '@components/Modal/MessageModal';
import { ProductsConfig } from '@fixtures/Tabs-configs';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { resetProductState } from '@reducers/admin/products';
import {
  addProductAsync,
  bulkUploadProductsAsync,
} from '@reducers/admin/products/actions';
import { resetAdminUpload } from '@reducers/admin/upload';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';

const ProductTableContainer = dynamic(
  () => import('@components/Layout/AdminLayout/Products'),
  { ssr: false },
);

const ProductsPages: NextPage = () => {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    list,
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
  const { uploadedImages } = useAppSelector((state) => state.adminUpload);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('新增產品');
  const [file, setFile] = useState<File | null>(null);

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
    // 處理新增產品的邏輯
    dispatch(addProductAsync(data));
    dispatch(resetAdminUpload());
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  /** 處理批量上傳產品的API */
  const handleFileUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      dispatch(bulkUploadProductsAsync(formData));
    }
    onClose();
  };

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
        <IconButton
          icon={<AiOutlineUpload />}
          aria-label='Upload products'
          colorScheme='blue'
          ml={4}
          onClick={onOpen}
        />

        <TabsLayout tabsConfig={ProductsConfig}>
          <ProductTableContainer />
        </TabsLayout>

        {/* 批量上傳模態框 */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>批量上傳產品</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <input type='file' onChange={handleFileChange} />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' onClick={handleFileUpload}>
                上傳
              </Button>
              <Button variant='ghost' onClick={onClose}>
                取消
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

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
