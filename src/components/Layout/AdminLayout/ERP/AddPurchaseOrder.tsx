import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { PurchaseOrder } from '@models/responses/purchaseOrder.res';
import { createPurchaseOrderAsync } from '@reducers/admin/admin-erp/purchaseOrder/actions';
import {
  createSuppliersAsync,
  getSuppliersAsync,
} from '@reducers/admin/admin-erp/supplier/actions';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface FormValues {
  supplier: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  orderDate: string;
  expectedDeliveryDate: string;
}

interface SupplierFormValues {
  name: string;
  contactInfo: string;
  address: string;
  principal: string;
}

const AddPurchaseOrder = () => {
  const dispatch = useAppDispatch();
  const [isAddingSupplier, setIsAddingSupplier] = useState(false);

  const {
    status: {
      createPurchaseOrderFailed,
      createPurchaseOrderLoading,
      createPurchaseOrderSuccess,
    },
    error: { createPurchaseOrderError },
  } = useAppSelector((state) => state.adminERPPurchaseOrder);

  const { list: productLists } = useAppSelector((state) => state.adminProducts);
  const {
    list: suppliersList,
    status: {
      createSuppliersFailed,
      createSuppliersLoading,
      createSuppliersSuccess,
    },
    error: { createSuppliersError },
  } = useAppSelector((state) => state.adminERPSuppliers);

  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>();

  const {
    register: supplierRegister,
    handleSubmit: handleSupplierSubmit,
    formState: { errors: supplierErrors },
    reset: resetSupplierForm,
  } = useForm<SupplierFormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const purchaseOrder: PurchaseOrder = {
      supplier: data.supplier,
      products: [
        {
          productId: data.productId,
          quantity: data.quantity,
          price: data.unitPrice,
        },
      ],
      totalAmount: data.quantity * data.unitPrice,
      orderDate: new Date(data.orderDate),
      expectedDeliveryDate: new Date(data.expectedDeliveryDate),
      status: 'Pending',
    };
    dispatch(createPurchaseOrderAsync(purchaseOrder));
  };

  const onSubmitSupplier: SubmitHandler<SupplierFormValues> = (data) => {
    dispatch(createSuppliersAsync(data));
    resetSupplierForm();
    setIsAddingSupplier(false);
  };

  useEffect(() => {
    if (createPurchaseOrderSuccess) {
      toast({
        title: '進貨訂單已創建',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else if (createPurchaseOrderFailed) {
      toast({
        title: '進貨訂單建立失敗',
        description: createPurchaseOrderError,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [
    toast,
    createPurchaseOrderFailed,
    createPurchaseOrderSuccess,
    createPurchaseOrderError,
  ]);

  useEffect(() => {
    if (createSuppliersSuccess) {
      toast({
        title: '建立廠商成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else if (createSuppliersFailed) {
      toast({
        title: '建立廠商失敗',
        description: createSuppliersError,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [
    toast,
    createSuppliersFailed,
    createSuppliersSuccess,
    createSuppliersError,
  ]);

  useEffect(() => {
    dispatch(getSuppliersAsync({ page: 1, limit: 100 }));
  }, [dispatch]);

  return (
    <LoadingLayout
      isLoading={createPurchaseOrderLoading || createSuppliersLoading}
    >
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
          新增進貨訂單
        </Heading>
        <Button
          mb='20px'
          colorScheme='teal'
          w='full'
          onClick={() => setIsAddingSupplier(!isAddingSupplier)}
        >
          {isAddingSupplier ? '取消新增供應商' : '新增供應商'}
        </Button>
        {isAddingSupplier && (
          <Box mb='20px'>
            <Heading
              fontSize='18px'
              mb='15px'
              color='blue.400'
              borderBottom='2px'
              borderColor='blue.400'
              pb='8px'
            >
              新增供應商
            </Heading>
            <form onSubmit={handleSupplierSubmit(onSubmitSupplier)}>
              <FormControl mb='15px' isInvalid={Boolean(supplierErrors.name)}>
                <FormLabel>
                  供應商名稱
                  <Text as='span' color='red.500'>
                    *
                  </Text>
                </FormLabel>
                <Input
                  type='text'
                  placeholder='供應商名稱'
                  {...supplierRegister('name', {
                    required: '供應商名稱為必填項',
                  })}
                />
                {supplierErrors.name && (
                  <span style={{ color: 'red' }}>
                    {supplierErrors.name.message}
                  </span>
                )}
              </FormControl>
              <FormControl
                mb='15px'
                isInvalid={Boolean(supplierErrors.contactInfo)}
              >
                <FormLabel>
                  聯繫信息
                  <Text as='span' color='red.500'>
                    *
                  </Text>
                </FormLabel>
                <Input
                  type='text'
                  placeholder='聯繫信息'
                  {...supplierRegister('contactInfo', {
                    required: '聯繫信息為必填項',
                  })}
                />
                {supplierErrors.contactInfo && (
                  <span style={{ color: 'red' }}>
                    {supplierErrors.contactInfo.message}
                  </span>
                )}
              </FormControl>
              <FormControl
                mb='15px'
                isInvalid={Boolean(supplierErrors.address)}
              >
                <FormLabel>
                  地址
                  <Text as='span' color='red.500'>
                    *
                  </Text>
                </FormLabel>
                <Input
                  type='text'
                  placeholder='地址'
                  {...supplierRegister('address', { required: '地址為必填項' })}
                />
                {supplierErrors.address && (
                  <span style={{ color: 'red' }}>
                    {supplierErrors.address.message}
                  </span>
                )}
              </FormControl>
              <FormControl
                mb='15px'
                isInvalid={Boolean(supplierErrors.principal)}
              >
                <FormLabel>
                  負責人
                  <Text as='span' color='red.500'>
                    *
                  </Text>
                </FormLabel>
                <Input
                  type='text'
                  placeholder='負責人'
                  {...supplierRegister('principal', {
                    required: '負責人為必填項',
                  })}
                />
                {supplierErrors.principal && (
                  <span style={{ color: 'red' }}>
                    {supplierErrors.principal.message}
                  </span>
                )}
              </FormControl>
              <Button type='submit' colorScheme='blue' w='full'>
                創建供應商
              </Button>
            </form>
          </Box>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb='15px' isInvalid={Boolean(errors.supplier)}>
            <FormLabel>選擇供應商</FormLabel>
            <Controller
              name='supplier'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <Select placeholder='選擇供應商' {...field} required>
                  {suppliersList?.map((supplier) => (
                    <option key={supplier._id} value={supplier._id}>
                      {supplier.name}
                    </option>
                  ))}
                </Select>
              )}
            />
            {errors.supplier && (
              <span style={{ color: 'red' }}>{errors.supplier.message}</span>
            )}
          </FormControl>
          <FormControl mb='15px' isInvalid={Boolean(errors.productId)}>
            <FormLabel>選擇產品</FormLabel>
            <Controller
              name='productId'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <Select placeholder='選擇產品' {...field} required>
                  {productLists?.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  ))}
                </Select>
              )}
            />
            {errors.productId && (
              <span style={{ color: 'red' }}>{errors.productId.message}</span>
            )}
          </FormControl>
          <FormControl mb='15px' isInvalid={Boolean(errors.quantity)}>
            <FormLabel>數量</FormLabel>
            <Input
              type='number'
              placeholder='數量'
              {...register('quantity', { required: '數量為必填項' })}
            />
            {errors.quantity && (
              <span style={{ color: 'red' }}>{errors.quantity.message}</span>
            )}
          </FormControl>
          <FormControl mb='15px' isInvalid={Boolean(errors.unitPrice)}>
            <FormLabel>單價</FormLabel>
            <Input
              type='number'
              placeholder='單價'
              {...register('unitPrice', { required: '單價為必填項' })}
            />
            {errors.unitPrice && (
              <span style={{ color: 'red' }}>{errors.unitPrice.message}</span>
            )}
          </FormControl>
          <FormControl mb='15px' isInvalid={Boolean(errors.orderDate)}>
            <FormLabel>訂單日期</FormLabel>
            <Input
              type='date'
              {...register('orderDate', { required: '訂單日期為必填項' })}
            />
            {errors.orderDate && (
              <span style={{ color: 'red' }}>{errors.orderDate.message}</span>
            )}
          </FormControl>
          <FormControl
            mb='15px'
            isInvalid={Boolean(errors.expectedDeliveryDate)}
          >
            <FormLabel>預計到貨日期</FormLabel>
            <Input
              type='date'
              {...register('expectedDeliveryDate', {
                required: '預計到貨日期為必填項',
              })}
            />
            {errors.expectedDeliveryDate && (
              <span style={{ color: 'red' }}>
                {errors.expectedDeliveryDate.message}
              </span>
            )}
          </FormControl>
          <Button type='submit' colorScheme='blue' w='full'>
            創建進貨訂單
          </Button>
        </form>
      </Box>
    </LoadingLayout>
  );
};

export default AddPurchaseOrder;
