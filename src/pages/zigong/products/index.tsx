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
  updateProductAsync,
} from '@reducers/admin/products/actions';
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

  const {
    editingProductId,
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
  const { uploadedImages } = useAppSelector((state) => state.adminUpload);

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

    if (updateProductSuccess) {
      setIsModalOpen(true);
      setModalContent('產品更新成功！');
      setModalTitle('更新產品');
      dispatch(resetAdminUpload());
    }

    if (addProductFailed) {
      setIsModalOpen(true);
      setModalContent('');
      dispatch(resetAdminUpload());
    }
  }, [dispatch, addProductSuccess, updateProductSuccess, addProductFailed]);

  const handleSubmit = async (data: any) => {
    let detailDescription = [] as any;

    const imageElements = uploadedImages.map((image) => ({
      className: 'image-selectable',
      elements: [
        {
          tagName: 'img',
          src: image.imageUrl,
          id: image.imageId, // 假设每个上传的图片都有唯一ID
        },
      ],
    }));

    detailDescription = [...detailDescription, ...imageElements];

    const formData = new FormData();

    formData.append('detailDescription', JSON.stringify(detailDescription));

    Object.keys(data).forEach((key) => {
      if (
        ![
          'detailDescription',
          'coverImage',
          'images',
          'specifications',
          'tags',
        ].includes(key) &&
        data[key] !== undefined
      ) {
        formData.append(key, data[key]);
      }
    });

    // 特殊处理的字段
    if (data.coverImage) {
      formData.append('coverImage', data.coverImage);
    }
    if (data.images && data.images.length) {
      data.images.forEach((image: any) => {
        formData.append('images', image);
      });
    }

    if (data.tags && Array.isArray(data.tags)) {
      data.tags.forEach((tag: any) => {
        formData.append('tags', tag);
      });
    }
    if (data.specifications) {
      formData.append('specifications', JSON.stringify(data.specifications));
    }

    // 发送请求
    if (editingProductId) {
      dispatch(updateProductAsync({ id: editingProductId, body: formData }));
    } else {
      dispatch(addProductAsync(formData));
    }
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
          <ProductTableContainer onSubmit={handleSubmit} />
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
