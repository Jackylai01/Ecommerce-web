import { VStack } from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getAllProductsCategoryAsync } from '@reducers/admin/product-category/actions';
import { getAllProductsTagsAsync } from '@reducers/admin/product-tags/actions';
import {
  deleteProductImageAsync,
  getProductByIdAsync,
} from '@reducers/admin/products/actions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import CustomSelect from './Field/CustomSelect';
import ImageUpload from './Field/ImageUpload';
import DynamicSpecifications from './Field/Specifications';
import { TagsMultiSelect } from './Field/TagsSelect';
import { TextInput } from './Field/TextInput';
import ToggleSwitch from './Field/ToggleSwitch';
import ProductCustomBlocks from './ProductCustomBlocks';

interface ProductFormContentType {
  productId?: string | null;
}

export const ProductFormContent = ({ productId }: ProductFormContentType) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { setValue, getValues } = useFormContext();

  const { uploadedImages } = useAppSelector((state) => state.adminUpload);
  const { list: categories } = useAppSelector(
    (state) => state.adminProductsCategory,
  );
  const { list: tags } = useAppSelector((state) => state.adminProductsTags);
  const {
    productDetails,
    status: { deleteProductImageLoading, deleteProductImageSuccess },
  } = useAppSelector((state) => state.adminProducts);

  const [coverImagePreview, setCoverImagePreview] = useState<any>(null);
  const [productImagesPreviews, setProductImagesPreviews] = useState<any>([]);

  const handleRemoveProductImage = () => {
    if (productId && coverImagePreview?.imageId) {
      dispatch(
        deleteProductImageAsync({
          productId,
          imageId: coverImagePreview.imageId,
        }),
      ).then(() => {
        setCoverImagePreview(null);
      });
    }
  };

  const categoryOptions =
    categories
      ?.map((category) => ({
        value: category._id ?? '',
        label: category.name ?? '',
      }))
      .filter((option) => option.value !== '' && option.label !== '') || [];

  const tagsOptions =
    tags
      ?.map((tag) => ({
        value: tag._id ?? '',
        label: tag.name ?? '',
      }))
      .filter((option) => option.value !== '' && option.label !== '') || [];

  useEffect(() => {
    dispatch(getAllProductsCategoryAsync({ page: 1, limit: 100 }));
    if (productId) {
      dispatch(getProductByIdAsync(productId));
    }
  }, [productId, dispatch]);

  useEffect(() => {
    if (productDetails) {
      setValue('name', productDetails.name);
      setValue('description', productDetails.description);
      setValue('price', productDetails.price);
      setValue('category', productDetails.category[0]);
      setValue('status', productDetails.status);
      setValue('stock', productDetails.stock);
      setValue('minimumPurchase', productDetails.minimumPurchase);
      setValue('maximumPurchase', productDetails.maximumPurchase);
      setValue('cost', productDetails.cost);
      setValue('tags', productDetails.tags);

      if (productDetails.specifications) {
        setValue(
          'specifications',
          productDetails.specifications.map((spec: any) => ({
            ...spec,
          })),
        );
      }

      if (productDetails && productDetails.coverImage) {
        const coverImagePreviews = productDetails.coverImage;
        setCoverImagePreview(coverImagePreviews);
      }

      const imagesPreviews = productDetails.images.map((image) => ({
        url: image.imageUrl,
        imageId: image.imageId,
      }));

      setProductImagesPreviews(imagesPreviews);

      const detailDescription = productDetails.detailDescription.map(
        (block: any) => {
          if (block.className === 'image-selectable') {
            return {
              ...block,
              elements: block.elements.map((element: any) => {
                if (element.tagName === 'img') {
                  return { ...element, src: element.src };
                }
                return element;
              }),
            };
          }
          return block;
        },
      );

      setValue('detailDescription', detailDescription);
    }
  }, [productDetails, setValue]);

  useEffect(() => {
    if (uploadedImages.length > 0) {
      const currentDetailDescription = getValues('detailDescription') || [];
      const newBlocks = uploadedImages.map((image) => ({
        className: 'image-selectable',
        elements: [
          {
            tagName: 'img',
            src: image.imageUrl,
            id: image.imageId,
          },
        ],
      }));

      const updatedDetailDescription = [
        ...currentDetailDescription,
        ...newBlocks,
      ];
      setValue('detailDescription', updatedDetailDescription);
    }
  }, [uploadedImages, setValue, getValues]);

  useEffect(() => {
    if (productDetails && productDetails.coverImage) {
      setCoverImagePreview({
        url: productDetails.coverImage.imageUrl,
        file: null,
        imageId: productDetails.coverImage.imageId,
      });
    }
  }, [productDetails]);

  useEffect(() => {
    const page = parseInt(router.query.page as string, 10) || 1;
    dispatch(getAllProductsTagsAsync({ page, limit: 10 }));
  }, [dispatch, router.query.page]);

  return (
    <VStack spacing={4} align='flex-start'>
      <TextInput
        name='name'
        label='商品名稱'
        placeholder='請輸入商品名稱'
        isRequired
      />
      <TextInput
        name='description'
        label='商品描述'
        placeholder='請輸入商品描述'
        isRequired
      />
      <TextInput
        name='price'
        label='價格'
        placeholder='請輸入商品價格'
        isRequired
      />
      <TextInput
        name='minimumPurchase'
        label='最低購買數量'
        placeholder='請輸入商品最低購買數量(選填)'
        isRequired
      />
      <TextInput
        name='maximumPurchase'
        label='最高購買數量'
        placeholder='請輸入商品最高購買數量(選填)'
        isRequired
      />
      <TextInput
        name='cost'
        label='商品總成本'
        placeholder='請輸入商品總成本'
      />
      <TextInput name='stock' label='庫存' placeholder='請輸入商品總庫存' />

      <CustomSelect
        name='category'
        label='產品類別'
        options={categoryOptions}
        isRequired
      />
      <TagsMultiSelect name='tags' label='產品標籤' options={tagsOptions} />
      <ToggleSwitch
        name='status'
        label='產品狀態'
        onValue='onSale'
        offValue='offShelf'
        onLabel='上架'
        offLabel='下架'
      />
      <DynamicSpecifications />
      <ImageUpload
        name='coverImage'
        label='封面照片'
        isRequired
        previewUrl={coverImagePreview}
        onRemoveImage={handleRemoveProductImage}
        deleteLoading={deleteProductImageLoading}
      />
      <ImageUpload
        name='images'
        label='產品圖片'
        isRequired
        multiple
        previewUrls={productImagesPreviews}
        productId={productId}
        onRemoveImage={handleRemoveProductImage}
        deleteLoading={deleteProductImageLoading}
      />
      <ProductCustomBlocks name='detailDescription' label='詳細商品內容' />
    </VStack>
  );
};
