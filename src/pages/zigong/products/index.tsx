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
  const { uploadedImages } = useAppSelector((state) => state.adminUpload);
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
    let detailDescription = data.detailDescription || [];

    const existingImageIds = new Set(
      detailDescription.flatMap((block: any) =>
        block.elements.map((el: any) => el.imageId),
      ),
    );

    const newImageElements = uploadedImages
      .filter((img) => !existingImageIds.has(img.imageId))
      .map((image) => ({
        className: 'image-selectable',
        elements: [
          {
            tagName: 'img',
            src: image.imageUrl,
            imageId: image.imageId,
          },
        ],
      }));
    detailDescription = [...detailDescription, ...newImageElements];

    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('minimumPurchase', data.minimumPurchase);
    formData.append('maximumPurchase', data.maximumPurchase);
    formData.append('cost', data.cost);
    formData.append('stock', data.stock);
    formData.append('status', data.status);
    formData.append('category', data.category);
    formData.append('detailDescription', JSON.stringify(detailDescription));
    // 處理封面圖片
    if (data.coverImage) {
      formData.append('coverImage', data.coverImage);
    }

    // 處理產品圖片
    if (data.images && data.images.length > 0) {
      data.images.forEach((image: File) => {
        formData.append('images', image);
      });
    }

    if (data.tags && data.tags.length > 0) {
      data.tags.forEach((tag: string) => formData.append('tags[]', tag));
    }

    // 發送請求
    dispatch(addProductAsync(formData));
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
