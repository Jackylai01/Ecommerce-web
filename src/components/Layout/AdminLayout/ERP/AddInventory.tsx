import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  createInventoryAsync,
  getInventoryAsync,
} from '@reducers/admin/admin-erp/inventory/actions';
import { getAllProductsAsync } from '@reducers/admin/products/actions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface InventoryForm {
  productId: string;
  reason: string;
  quantity: number;
  reorderLevel: number;
  reorderAmount: number;
}

const AddInventory = () => {
  const { control, handleSubmit, reset } = useForm<InventoryForm>();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const router = useRouter();
  const { list: products } = useAppSelector((state) => state.adminProducts);
  const {
    status: {
      createInventoryFailed,
      createInventoryLoading,
      createInventorySuccess,
    },
    error: { createInventoryError },
  } = useAppSelector((state) => state.adminERPInventory);

  useEffect(() => {
    dispatch(getAllProductsAsync({ page: 1, limit: 100 }));
  }, [dispatch]);

  const onSubmit = async (data: InventoryForm) => {
    const selectedProduct = products?.find(
      (product) => product._id === data.productId,
    );

    if (!selectedProduct) {
      toast({
        title: '找不到此產品',
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
      stock: data.quantity,
    };

    dispatch(createInventoryAsync(newInventory));
  };

  useEffect(() => {
    if (createInventorySuccess) {
      const page = parseInt(router.query.page as string) || 1;
      const limit = 10;
      toast({
        title: '建立庫存成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      dispatch(getAllProductsAsync({ page: 1, limit: 100 }));
      dispatch(getInventoryAsync({ page, limit }));
    }

    if (createInventoryFailed) {
      toast({
        title: '建立庫存失敗',
        description: createInventoryError,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      reset();
    }
  }, [
    createInventoryFailed,
    createInventoryLoading,
    createInventorySuccess,
    createInventoryError,
    toast,
  ]);

  return (
    <LoadingLayout isLoading={createInventoryLoading}>
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
            <FormLabel>
              選擇產品
              <Text as='span' color='red.500'>
                *
              </Text>
            </FormLabel>
            <Controller
              name='productId'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <Select placeholder='選擇產品' {...field} required>
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
              name='reason'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <Input type='text' placeholder='產品描述' {...field} />
              )}
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              數量
              <Text as='span' color='red.500'>
                *
              </Text>
            </FormLabel>
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
                  required
                />
              )}
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              補貨點
              <Text as='span' color='red.500'>
                *
              </Text>
            </FormLabel>
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
                  required
                />
              )}
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              補貨量
              <Text as='span' color='red.500'>
                *
              </Text>
            </FormLabel>
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
                  required
                />
              )}
            />
          </FormControl>
          <Button type='submit' colorScheme='blue'>
            新增
          </Button>
        </VStack>
      </Box>
    </LoadingLayout>
  );
};

export default AddInventory;
