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
  const { productDetails } = useAppSelector((state) => state.adminProducts);

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
    console.log('提交的数据:', data);

    const isUpdating = !!editingProductId;

    // 初始化或获取现有的 detailDescription
    let detailDescription = data.detailDescription || [];

    // 获取现有的所有图片 ID，用于检查重复
    const existingImageIds = new Set(
      detailDescription.flatMap((block: any) =>
        block.elements.map((el: any) => el.imageId),
      ),
    );

    // 过滤出未添加的图片并创建新的图片元素
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

    // 合并旧的 detailDescription 和新的图片元素
    detailDescription = [...detailDescription, ...newImageElements];

    const formData = new FormData();
    formData.append('detailDescription', JSON.stringify(detailDescription));

    // 添加其他表单字段到 formData
    Object.keys(data).forEach((key) => {
      if (
        ![
          'detailDescription',
          'coverImage',
          'images',
          'specifications',
          'tags',
        ].includes(key)
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
      data.tags.forEach((tag: any) => {
        formData.append('tags', tag);
      });
    }
    if (data.specifications) {
      formData.append('specifications', JSON.stringify(data.specifications));
    }

    // 根据是否有 id 判断是更新产品还是添加新产品
    if (isUpdating) {
      dispatch(updateProductAsync({ id: editingProductId, body: formData }));
    } else {
      dispatch(addProductAsync(formData));
      dispatch(resetAdminUpload());
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
