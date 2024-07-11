import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  SimpleGrid,
  VStack,
  useToast,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  addDiscountAsync,
  generateMultipleDiscountCodesAsync,
  getAllDiscountsAsync,
} from '@reducers/admin/discount/actions';
import { getAllProductsCategoryAsync } from '@reducers/admin/product-category/actions';
import { getAllProductsAsync } from '@reducers/admin/products/actions';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface FormValues {
  name: string;
  type: string;
  value: string;
  isStoreWide: boolean;
  selectedCategories: string[];
  discountCode: string;
  invitationCode: string;
  startDate: string;
  endDate: string;
  selectedProducts: string[];
  usageLimit: number | string;
  unlimitedUse: boolean;
  combinableWithOtherDiscounts: boolean;
  generateCodesCount: number;
  priority: number;
  calculationMethod: 'percentage' | 'fixedAmount';
  minimumAmount: string;
}

const DiscountModule: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { list: productsList } = useAppSelector((state) => state.adminProducts);
  const {
    status: { addDiscountLoading, addDiscountFailed, addDiscountSuccess },
    error: { addDiscountError },
  } = useAppSelector((state) => state.adminDiscount);

  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    type: '',
    value: '',
    isStoreWide: false,
    selectedCategories: [],
    discountCode: '',
    invitationCode: '',
    startDate: '',
    endDate: '',
    selectedProducts: [],
    usageLimit: '',
    unlimitedUse: false,
    combinableWithOtherDiscounts: false,
    generateCodesCount: 1,
    priority: 0,
    calculationMethod: 'fixedAmount',
    minimumAmount: '',
  });

  const toast = useToast();

  useEffect(() => {
    dispatch(getAllProductsAsync({ page: 1, limit: 10 }));
    dispatch(getAllProductsCategoryAsync({ page: 1, limit: 10 }));
    dispatch(getAllDiscountsAsync({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormValues((prev) => {
        if (name === 'selectedProducts') {
          const updatedProducts = checked
            ? [...(prev.selectedProducts || []), value]
            : (prev.selectedProducts || []).filter((id) => id !== value);
          return { ...prev, selectedProducts: updatedProducts };
        } else {
          return { ...prev, [name]: checked };
        }
      });
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    const isPercentage = value.includes('%');
    setFormValues((prev: any) => ({
      ...prev,
      value: isPercentage ? value.replace('%', '') : value,
      calculationMethod: isPercentage ? 'percentage' : 'fixedAmount',
    }));
  };

  const handleSubmit = () => {
    const payload = {
      ...formValues,
      value: parseFloat(formValues.value),
      minimumAmount: formValues.minimumAmount
        ? parseFloat(formValues.minimumAmount)
        : undefined,
      productId: formValues.selectedProducts,
    };

    console.log(payload); // 用於調試

    dispatch(addDiscountAsync(payload));
  };

  const handleGenerateCodes = async () => {
    const { discountCode, generateCodesCount } = formValues;
    await dispatch(
      generateMultipleDiscountCodesAsync({
        discountId: discountCode,
        count: generateCodesCount,
      }),
    );
    toast({
      title: '折扣碼已生成！',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleBack = () => {
    router.push('/zigong/discounts');
  };

  useEffect(() => {
    if (addDiscountSuccess) {
      toast({
        title: '折扣設定已保存！',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else if (addDiscountFailed) {
      toast({
        title: '折扣設定保存失敗',
        description: addDiscountError,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toast, addDiscountFailed, addDiscountSuccess, addDiscountError]);

  return (
    <LoadingLayout isLoading={addDiscountLoading}>
      <Box
        w='90%'
        mx='auto'
        my='8'
        bg='white'
        borderRadius='lg'
        boxShadow='lg'
        overflow='hidden'
      >
        <Box
          bg='purple.500'
          color='white'
          p='6'
          display='flex'
          justifyContent='space-between'
          alignItems='center'
        >
          <Button colorScheme='blue' onClick={handleBack}>
            返回
          </Button>
          <Heading as='h1' fontSize='2xl' fontWeight='bold'>
            折扣設定
          </Heading>
          <Button colorScheme='teal' onClick={handleSubmit}>
            保存設定
          </Button>
        </Box>
        <VStack as='form' p='8' spacing='8'>
          <FormControl id='name' mb='4'>
            <FormLabel>活動名稱</FormLabel>
            <Input
              type='text'
              name='name'
              onChange={handleInputChange}
              placeholder='請輸入活動名稱'
            />
          </FormControl>
          <FormControl id='type' mb='4'>
            <FormLabel>選擇折扣類型：</FormLabel>
            <Select
              name='type'
              onChange={handleInputChange}
              value={formValues.type}
              placeholder='選擇類型'
            >
              <option value='orderDiscount'>訂單折扣</option>
              <option value='productDiscount'>商品折扣</option>
              <option value='orderFreeShipping'>訂單免運費</option>
              <option value='productFreeShipping'>商品免運費</option>
              <option value='productCodeDiscount'>商品折扣碼</option>
              <option value='orderCodeDiscount'>訂單折扣碼</option>
            </Select>
          </FormControl>

          {/* 全館通用設置 */}
          {(formValues.type === 'orderDiscount' ||
            formValues.type === 'orderFreeShipping') && (
            <FormControl id='store-wide' mb='4'>
              <Checkbox
                name='isStoreWide'
                onChange={handleInputChange}
                size='lg'
                borderColor='gray.700'
                isChecked={formValues.isStoreWide}
              >
                全館通用
              </Checkbox>
            </FormControl>
          )}

          {/* 針對商品折扣碼的設置 */}
          {formValues.type === 'productCodeDiscount' && (
            <React.Fragment>
              <FormControl id='value' mb='4'>
                <FormLabel>折扣值：</FormLabel>
                <Input
                  type='text'
                  name='value'
                  placeholder='例如：20% 或 100元'
                  onChange={handleValueChange}
                />
              </FormControl>
              <FormControl id='discountCode' mb='4'>
                <FormLabel>折扣碼：</FormLabel>
                <Input
                  type='text'
                  name='discountCode'
                  placeholder='輸入折扣碼'
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id='generateCodesCount' mb='4'>
                <FormLabel>生成多組代碼數量：</FormLabel>
                <Input
                  type='number'
                  name='generateCodesCount'
                  placeholder='生成多組代碼'
                  onChange={handleInputChange}
                  value={formValues.generateCodesCount}
                />
                <Button
                  colorScheme='teal'
                  onClick={handleGenerateCodes}
                  mt='1rem'
                >
                  生成折扣碼
                </Button>
              </FormControl>
              <FormControl id='usageLimit' mb='4'>
                <FormLabel>使用次數限制：</FormLabel>
                <Input
                  type='number'
                  name='usageLimit'
                  placeholder='輸入使用次數限制'
                  onChange={handleInputChange}
                  value={formValues.usageLimit}
                />
                <Checkbox
                  name='unlimitedUse'
                  onChange={handleInputChange}
                  size='lg'
                  borderColor='gray.700'
                  isChecked={formValues.unlimitedUse}
                  mt='1rem'
                >
                  無限制
                </Checkbox>
              </FormControl>
              <FormControl id='priority' mb='4'>
                <FormLabel>優先順序：</FormLabel>
                <Input
                  type='number'
                  name='priority'
                  placeholder='例如：1'
                  onChange={handleInputChange}
                  value={formValues.priority}
                />
              </FormControl>
            </React.Fragment>
          )}

          {/* 針對訂單折扣和免運費的設置 */}
          {(formValues.type === 'orderDiscount' ||
            formValues.type === 'orderFreeShipping') && (
            <React.Fragment>
              <FormControl id='value' mb='4'>
                <FormLabel>折扣值：</FormLabel>
                <Input
                  type='text'
                  name='value'
                  placeholder='例如：20% 或 100元'
                  onChange={handleValueChange}
                />
              </FormControl>
              <FormControl id='minimumAmount' mb='4'>
                <FormLabel>滿足折扣的最低金額：</FormLabel>
                <Input
                  type='text'
                  name='minimumAmount'
                  placeholder='例如：1000元'
                  onChange={handleInputChange}
                />
              </FormControl>
            </React.Fragment>
          )}

          {/* 針對商品折扣的設置 */}
          {formValues.type === 'productDiscount' && (
            <React.Fragment>
              <FormControl id='value' mb='4'>
                <FormLabel>折扣值：</FormLabel>
                <Input
                  type='text'
                  name='value'
                  placeholder='例如：20% 或 100元'
                  onChange={handleValueChange}
                />
              </FormControl>
              <FormControl id='minimumAmount' mb='4'>
                <FormLabel>滿足折扣的最低金額：</FormLabel>
                <Input
                  type='text'
                  name='minimumAmount'
                  placeholder='例如：1000元'
                  onChange={handleInputChange}
                />
              </FormControl>
            </React.Fragment>
          )}

          {/* 針對商品免運費的設置 */}
          {formValues.type === 'productFreeShipping' && (
            <React.Fragment>
              <FormControl id='minimumAmount' mb='4'>
                <FormLabel>免運費設置：</FormLabel>
                <Input
                  type='text'
                  name='minimumAmount'
                  placeholder='例如：滿1000元免運費'
                  onChange={handleInputChange}
                />
              </FormControl>
            </React.Fragment>
          )}

          {/* 通用的設置 */}
          <FormControl id='startDate' mb='4'>
            <FormLabel>開始日期：</FormLabel>
            <Input type='date' name='startDate' onChange={handleInputChange} />
          </FormControl>
          <FormControl id='endDate' mb='4'>
            <FormLabel>結束日期：</FormLabel>
            <Input type='date' name='endDate' onChange={handleInputChange} />
          </FormControl>

          <FormControl id='combinableWithOtherDiscounts' mb='4'>
            <Checkbox
              name='combinableWithOtherDiscounts'
              onChange={handleInputChange}
              size='lg'
              borderColor='gray.700'
              isChecked={formValues.combinableWithOtherDiscounts}
            >
              可與其他折扣同時使用
            </Checkbox>
          </FormControl>

          {formValues.type !== 'orderFreeShipping' &&
            formValues.type !== 'orderDiscount' && (
              <Box w='100%'>
                <Heading as='h2' size='md' color='purple.500' mb='4'>
                  選擇適用產品
                </Heading>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing='8'>
                  {productsList?.map((product) => (
                    <Box
                      key={product._id}
                      bg='white'
                      borderRadius='lg'
                      p='4'
                      boxShadow='md'
                      textAlign='center'
                    >
                      <Image
                        src={product.coverImage.imageUrl}
                        alt={product.name}
                        w='100%'
                        minH='150px'
                        objectFit='cover'
                      />
                      <Heading as='h3' size='md' mb='2'>
                        {product.name}
                      </Heading>
                      <Box color='teal.500' fontWeight='bold' mb='4'>
                        NT$ {product.price}
                      </Box>
                      <Checkbox
                        name='selectedProducts'
                        value={product._id}
                        onChange={handleInputChange}
                        size='lg'
                        borderColor='gray.700'
                      >
                        套用折扣
                      </Checkbox>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
            )}

          {/* 隱藏的 calculationMethod 輸入框 */}
          <Input
            type='hidden'
            name='calculationMethod'
            value={formValues.calculationMethod}
          />
        </VStack>
      </Box>
    </LoadingLayout>
  );
};

export default DiscountModule;
