import { VStack } from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getAllProductsCategoryAsync } from '@reducers/admin/product-category/actions';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import CustomSelect from './Field/CustomSelect';
import ImageUpload from './Field/ImageUpload';
import DynamicSpecifications from './Field/Specifications';
import { TextInput } from './Field/TextInput';
import ToggleSwitch from './Field/ToggleSwitch';

export const ProductFormContent = () => {
  const { control } = useFormContext();
  const dispatch = useAppDispatch();

  const categories = useAppSelector(
    (state) => state.adminProductsCategory.list,
  );

  useEffect(() => {
    dispatch(getAllProductsCategoryAsync({ page: 1, limit: 100 }));
  }, [dispatch]);

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
      <ImageUpload name='coverImage' label='封面照片' isRequired />
      <ImageUpload name='images' multiple label='產品圖片' isRequired />
    </VStack>
  );
};
