import { VStack } from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getAllProductsCategoryAsync } from '@reducers/admin/product-category/actions';
import { getProductByIdAsync } from '@reducers/admin/products/actions';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import CustomSelect from './Field/CustomSelect';
import ImageUpload from './Field/ImageUpload';
import DynamicSpecifications from './Field/Specifications';
import { TextInput } from './Field/TextInput';
import ToggleSwitch from './Field/ToggleSwitch';

interface ProductFormContentType {
  productId?: string;
}

export const ProductFormContent = ({ productId }: ProductFormContentType) => {
  const { control, setValue, reset } = useFormContext();
  const dispatch = useAppDispatch();

  const { list: categories } = useAppSelector(
    (state) => state.adminProductsCategory,
  );
  const { productDetails } = useAppSelector((state) => state.adminProducts);
  const [coverImagePreview, setCoverImagePreview] = useState('');
  const [productImagesPreviews, setProductImagesPreviews] = useState<any>([]);

  useEffect(() => {
    dispatch(getAllProductsCategoryAsync({ page: 1, limit: 100 }));
    if (productId) {
      dispatch(getProductByIdAsync(productId));
    }
  }, [productId, dispatch, reset]);

  useEffect(() => {
    if (productDetails) {
      setValue('name', productDetails.name);
      setValue('description', productDetails.description);
      setValue('price', productDetails.price);
      setValue('category', productDetails.category[0]);
      setValue('status', productDetails.status);

      if (productDetails.specifications) {
        setValue(
          'specifications',
          productDetails.specifications.map((spec: any) => ({
            ...spec,
          })),
        );
      }

      if (productDetails.coverImage) {
        setCoverImagePreview(productDetails.coverImage.imageUrl);
      }

      const imagesPreviews = productDetails.images.map(
        (image) => image.imageUrl,
      );
      setProductImagesPreviews(imagesPreviews);
    }
  }, [productDetails, setValue]);

  const categoryOptions =
    categories?.map((category) => ({
      value: category._id,
      label: category.name,
    })) || [];

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
      <CustomSelect
        name='category'
        label='產品類別'
        options={categoryOptions}
        isRequired
      />
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
      />
      <ImageUpload
        name='images'
        label='產品圖片'
        isRequired
        multiple
        previewUrls={productImagesPreviews}
      />
    </VStack>
  );
};
