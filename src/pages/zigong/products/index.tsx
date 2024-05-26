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
import { FormProvider, useForm } from 'react-hook-form';

const ProductTableContainer = dynamic(
  () => import('@components/Layout/AdminLayout/Products'),
  { ssr: false },
);

const ProductsPages: NextPage = () => {
  const dispatch = useAppDispatch();
  const methods = useForm();

  const {
    status: { addProductSuccess, addProductFailed, addProductLoading },
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

    if (addProductFailed) {
      setIsModalOpen(true);
      setModalContent('');
      dispatch(resetAdminUpload());
    }
  }, [dispatch, addProductSuccess, addProductFailed]);

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
    formData.append('detailDescription', JSON.stringify(detailDescription));

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

    if (data.coverImage && data.coverImage[0]) {
      formData.append('coverImage', data.coverImage[0]);
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

    dispatch(addProductAsync(formData));
    dispatch(resetAdminUpload());
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
      <FormProvider {...methods}>
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
            title={modalTitle}
            isActive={isModalOpen}
            error={addProductError}
            onClose={handleCloseModal}
          >
            {modalContent}
          </MessageModal>
        </LoadingLayout>
      </FormProvider>
    </>
  );
};

export default ProductsPages;
