import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  VStack,
  useToast,
} from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { createInventoryAsync } from '@reducers/admin/admin-erp/inventory/actions';
import { getAllProductsAsync } from '@reducers/admin/products/actions';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface InventoryForm {
  productId: string;
  productDescription: string;
  quantity: number;
  reorderLevel: number;
  reorderAmount: number;
  stock: number;
}

const AddInventory = () => {
  const { control, handleSubmit, reset } = useForm<InventoryForm>();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { list: products } = useAppSelector((state) => state.adminProducts);

  useEffect(() => {
    dispatch(getAllProductsAsync({ page: 1, limit: 100 }));
  }, [dispatch]);

  const onSubmit = async (data: InventoryForm) => {
    const selectedProduct = products?.find(
      (product) => product._id === data.productId,
    );

    if (!selectedProduct) {
      toast({
        title: 'Product not found',
        description: 'The selected product does not exist.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newInventory = {
      ...data,
      productName: selectedProduct.name,
      stock: data.quantity, // 添加 stock 值
    };

    dispatch(createInventoryAsync(newInventory));
    toast({
      title: 'Inventory added',
      description: `${selectedProduct.name} has been added to inventory.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    reset();
  };

  return (
    <Box bg='white' p='25px' borderRadius='10px' boxShadow='md'>
      <Heading
        fontSize='20px'
        mb='20px'
        color='blue.400'
        borderBottom='2px'
        borderColor='blue.400'
        pb='10px'
      >
        新增庫存
      </Heading>
      <VStack as='form' onSubmit={handleSubmit(onSubmit)} spacing='15px'>
        <FormControl>
          <FormLabel>選擇產品</FormLabel>
          <Controller
            name='productId'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <Select placeholder='選擇產品' {...field}>
                {products?.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel>產品描述</FormLabel>
          <Controller
            name='productDescription'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <Input type='text' placeholder='產品描述' {...field} />
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel>數量</FormLabel>
          <Controller
            name='quantity'
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <Input
                type='number'
                placeholder='數量'
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel>補貨點</FormLabel>
          <Controller
            name='reorderLevel'
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <Input
                type='number'
                placeholder='補貨點'
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel>補貨量</FormLabel>
          <Controller
            name='reorderAmount'
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <Input
                type='number'
                placeholder='補貨量'
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
              />
            )}
          />
        </FormControl>
        <Button type='submit' colorScheme='blue'>
          新增
        </Button>
      </VStack>
    </Box>
  );
};

export default AddInventory;
