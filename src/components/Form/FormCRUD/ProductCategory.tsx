import { VStack } from '@chakra-ui/react';
import ImageUpload from './Field/ImageUpload';
import { TextInput } from './Field/TextInput';

export const ProductCategoryForm = () => {
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

      <ImageUpload name='coverImage' label='封面照片' isRequired />
    </VStack>
  );
};
