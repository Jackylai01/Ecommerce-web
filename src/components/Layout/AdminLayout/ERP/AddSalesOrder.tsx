import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  useToast,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  createSalesOrderAsync,
  getSalesOrdersAsync,
} from '@reducers/admin/admin-erp/salesOrder/actions';
import { adminGetAllClientUsersAsync } from '@reducers/admin/client-users/actions';
import { useEffect } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

interface FormValues {
  user: string;
  products: { product: string; quantity: number; price: number }[];
  totalAmount: number;
  orderDate: string;
  status: string;
}

const AddSalesOrder = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      products: [{ product: '', quantity: 0, price: 0 }],
    },
  });

  const { list: products } = useAppSelector((state) => state.adminProducts);
  const { list: clients } = useAppSelector((state) => state.adminClientUsers);
  const {
    status: {
      createSalesOrderFailed,
      createSalesOrderLoading,
      createSalesOrderSuccess,
    },
    error: { createSalesOrderError },
  } = useAppSelector((state) => state.adminERPSalesOrder);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  const dispatch = useAppDispatch();
  const toast = useToast();

  useEffect(() => {
    dispatch(adminGetAllClientUsersAsync({ page: 1, limit: 10 }));
  }, [dispatch]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const totalAmount = data.products.reduce(
      (sum, product) => sum + product.quantity * product.price,
      0,
    );
    const salesOrder = {
      ...data,
      totalAmount,
      isManual: true,
    };

    dispatch(createSalesOrderAsync(salesOrder));
  };

  useEffect(() => {
    if (createSalesOrderSuccess) {
      toast({
        title: '銷售訂單已創建',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    dispatch(getSalesOrdersAsync({ page: 1, limit: 10 }));
    reset();
    if (createSalesOrderFailed) {
      toast({
        title: '銷售訂單創建失敗',
        description: createSalesOrderError,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [
    createSalesOrderFailed,
    createSalesOrderSuccess,
    createSalesOrderError,
    toast,
  ]);

  return (
    <LoadingLayout isLoading={createSalesOrderLoading}>
      <Box
        bg='white'
        p='25px'
        borderRadius='10px'
        boxShadow='md'
        transition='all 0.3s ease'
        _hover={{
          transform: 'translateY(-5px)',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Heading
          fontSize='20px'
          mb='20px'
          color='blue.400'
          borderBottom='2px'
          borderColor='blue.400'
          pb='10px'
        >
          新增銷售訂單
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb='15px'>
            <FormLabel>客戶名稱</FormLabel>
            <Select
              placeholder='選擇客戶'
              {...register('user', { required: true })}
            >
              {clients?.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.username}
                </option>
              ))}
            </Select>
            {errors.user && <span>此字段為必填項</span>}
          </FormControl>
          {fields.map((field, index) => (
            <Box key={field.id} mb='15px'>
              <FormControl mb='15px'>
                <FormLabel>選擇產品</FormLabel>
                <Select
                  placeholder='選擇產品'
                  {...register(`products.${index}.product`, { required: true })}
                >
                  {products?.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name} - ${product.price}
                    </option>
                  ))}
                </Select>
                {errors.products && errors.products[index]?.product && (
                  <span>此字段為必填項</span>
                )}
              </FormControl>
              <FormControl mb='15px'>
                <FormLabel>數量</FormLabel>
                <Input
                  type='number'
                  placeholder='數量'
                  {...register(`products.${index}.quantity`, {
                    required: true,
                  })}
                />
                {errors.products && errors.products[index]?.quantity && (
                  <span>此字段為必填項</span>
                )}
              </FormControl>
              <FormControl mb='15px'>
                <FormLabel>單價</FormLabel>
                <Input
                  type='number'
                  placeholder='單價'
                  {...register(`products.${index}.price`, { required: true })}
                />
                {errors.products && errors.products[index]?.price && (
                  <span>此字段為必填項</span>
                )}
              </FormControl>
              <Button type='button' onClick={() => remove(index)}>
                移除產品
              </Button>
            </Box>
          ))}
          <Button
            type='button'
            colorScheme='teal'
            variant='outline'
            onClick={() => append({ product: '', quantity: 0, price: 0 })}
            mb='1rem'
          >
            新增產品
          </Button>
          <FormControl mb='15px'>
            <FormLabel>訂單日期</FormLabel>
            <Input type='date' {...register('orderDate', { required: true })} />
            {errors.orderDate && <span>此字段為必填項</span>}
          </FormControl>
          <FormControl mb='15px'>
            <FormLabel>狀態</FormLabel>
            <Select
              placeholder='選擇狀態'
              {...register('status', { required: true })}
            >
              <option value='Pending'>處理中</option>
              <option value='Completed'>已完成</option>
              <option value='Cancelled'>已取消</option>
            </Select>
            {errors.status && <span>此字段為必填項</span>}
          </FormControl>
          <Button type='submit' colorScheme='blue' w='full'>
            創建銷售訂單
          </Button>
        </form>
      </Box>
    </LoadingLayout>
  );
};

export default AddSalesOrder;
