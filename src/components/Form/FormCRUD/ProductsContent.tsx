import { VStack } from '@chakra-ui/react';

import { TextInput } from './Field/TextInput';

export const ProductFormContent = () => {
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
    </VStack>
  );
};
