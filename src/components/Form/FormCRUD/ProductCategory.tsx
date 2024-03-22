import { VStack } from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getProductCategoryByIdAsync } from '@reducers/admin/product-category/actions';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import ImageUpload from './Field/ImageUpload';
import { TextInput } from './Field/TextInput';

interface ProductCategoryContentType {
  categoryId?: string;
}

export const ProductCategoryForm = ({
  categoryId,
}: ProductCategoryContentType) => {
  const dispatch = useAppDispatch();
  const [coverImagePreview, setCoverImagePreview] = useState('');
  const { setValue } = useFormContext();
  const { categoryDetails } = useAppSelector(
    (state) => state.adminProductsCategory,
  );

  useEffect(() => {
    if (categoryId) {
      dispatch(getProductCategoryByIdAsync(categoryId));
    }
  }, [categoryId, dispatch]);

  useEffect(() => {
    if (categoryDetails) {
      setValue('name', categoryDetails.name);
      setValue('description', categoryDetails.description);

      if (categoryDetails.coverImage) {
        setCoverImagePreview(categoryDetails.coverImage.imageUrl);
      }
    }
  }, [categoryDetails, setValue]);

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
      <ImageUpload
        name='coverImage'
        label='封面照片'
        isRequired
        previewUrl={coverImagePreview}
      />
    </VStack>
  );
};
