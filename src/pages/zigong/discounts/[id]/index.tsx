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
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  addDiscountAsync,
  getAllDiscountsAsync,
  getDiscountByIdAsync,
  updateDiscountAsync,
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
  startDate: string;
  endDate: string;
  selectedProducts: string[];
  usageLimit: number;
  unlimitedUse: boolean;
  combinableWithOtherDiscounts: boolean;
  generateCodesCount: number;
  priority: number;
  calculationMethod: 'percentage' | 'fixedAmount';
  minimumAmount: string;
  discountCodeInputMethod: 'manual' | 'generate';
}

const DiscountModule: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { list: productsList } = useAppSelector((state) => state.adminProducts);
  const {
    discountDetails,
    status: {
      addDiscountLoading,
      addDiscountFailed,
      addDiscountSuccess,
      updateDiscountLoading,
      updateDiscountFailed,
      updateDiscountSuccess,
    },
    error: { addDiscountError, updateDiscountError },
  } = useAppSelector((state) => state.adminDiscount);

  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    type: '',
    value: '',
    isStoreWide: false,
    selectedCategories: [],
    discountCode: '',
    startDate: '',
    endDate: '',
    selectedProducts: [],
    usageLimit: 0,
    unlimitedUse: false,
    combinableWithOtherDiscounts: false,
    generateCodesCount: 1,
    priority: 0,
    calculationMethod: 'fixedAmount',
    minimumAmount: '',
    discountCodeInputMethod: 'manual',
  });

  const toast = useToast();

  useEffect(() => {
    dispatch(getAllProductsAsync({ page: 1, limit: 10 }));
    dispatch(getAllProductsCategoryAsync({ page: 1, limit: 10 }));
    dispatch(getAllDiscountsAsync({ page: 1, limit: 10 }));

    if (id) {
      dispatch(getDiscountByIdAsync(id as string));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (discountDetails) {
      const startDate = new Date(discountDetails.startDate);
      const endDate = new Date(discountDetails.endDate);

      setFormValues({
        name: discountDetails.name,
        type: discountDetails.type,
        value: discountDetails.value.toString(),
        isStoreWide: discountDetails.isStoreWide || false,
        selectedCategories: discountDetails.selectedCategories || [],
        discountCode:
          discountDetails.discountCodes
            ?.map((code: any) => code.code)
            .join(', ') || '',
        startDate: !isNaN(startDate.getTime())
          ? startDate.toISOString().split('T')[0]
          : '',
        endDate: !isNaN(endDate.getTime())
          ? endDate.toISOString().split('T')[0]
          : '',
        selectedProducts: discountDetails.productId || [],
        usageLimit: discountDetails.usageLimit ?? 0,
        unlimitedUse: discountDetails.usageLimit === -1,
        combinableWithOtherDiscounts:
          discountDetails.combinableWithOtherDiscounts || false,
        generateCodesCount: discountDetails.generateCodesCount || 1,
        priority: discountDetails.priority || 0,
        calculationMethod: discountDetails.calculationMethod,
        minimumAmount: discountDetails.minimumAmount?.toString() || '',
        discountCodeInputMethod: 'manual', // 這裡預設為手動輸入
      });
    }
  }, [discountDetails]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
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
      customCodes:
        formValues.discountCodeInputMethod === 'manual'
          ? formValues.discountCode.split(',').map((code) => code.trim())
          : [],
      generateCodesCount:
        formValues.discountCodeInputMethod === 'generate'
          ? formValues.generateCodesCount
          : undefined,
      usageLimit: formValues.unlimitedUse ? -1 : formValues.usageLimit, // 根據unlimitedUse設置usageLimit
      unlimitedUse: formValues.unlimitedUse,
    };

    if (id) {
      dispatch(updateDiscountAsync({ id: id as string, body: payload }));
    } else {
      dispatch(addDiscountAsync(payload));
    }
  };

  const generateRandomCode = () => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  const handleGenerateCodes = () => {
    const { generateCodesCount, usageLimit, unlimitedUse } = formValues;
    const generatedCodes = Array.from({ length: generateCodesCount }, () => ({
      code: generateRandomCode(),
      usageLimit: unlimitedUse ? -1 : usageLimit, // 根據unlimitedUse設置usageLimit
      usedCount: 0,
    }));
    setFormValues((prev) => ({
      ...prev,
      discountCode: generatedCodes.map((codeObj) => codeObj.code).join(', '),
    }));
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
    if (addDiscountSuccess || updateDiscountSuccess) {
      toast({
        title: '折扣設定已保存！',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      handleBack();
    } else if (addDiscountFailed || updateDiscountFailed) {
      toast({
        title: '折扣設定保存失敗',
        description: addDiscountError || updateDiscountError,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [
    toast,
    addDiscountFailed,
    addDiscountSuccess,
    addDiscountError,
    updateDiscountFailed,
    updateDiscountSuccess,
    updateDiscountError,
  ]);

  return (
    <LoadingLayout isLoading={addDiscountLoading || updateDiscountLoading}>
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
              value={formValues.name}
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

          {/* 針對折扣類型的特定設置 */}
          {(formValues.type === 'orderDiscount' ||
            formValues.type === 'productDiscount' ||
            formValues.type === 'productCodeDiscount' ||
            formValues.type === 'orderCodeDiscount') && (
            <React.Fragment>
              <FormControl id='value' mb='4'>
                <FormLabel>折扣值：</FormLabel>
                <Input
                  type='text'
                  name='value'
                  placeholder='例如：20% 或 100元'
                  onChange={handleValueChange}
                  value={formValues.value}
                />
              </FormControl>
              <FormControl id='minimumAmount' mb='4'>
                <FormLabel>滿足折扣的最低金額：</FormLabel>
                <Input
                  type='text'
                  name='minimumAmount'
                  placeholder='例如：1000元'
                  onChange={handleInputChange}
                  value={formValues.minimumAmount}
                />
              </FormControl>
            </React.Fragment>
          )}

          {/* 針對折扣碼的設置 */}
          {(formValues.type === 'productCodeDiscount' ||
            formValues.type === 'orderCodeDiscount') && (
            <React.Fragment>
              <FormControl id='discountCodeInputMethod' mb='4'>
                <FormLabel>折扣碼輸入方式：</FormLabel>
                <Select
                  name='discountCodeInputMethod'
                  onChange={handleInputChange}
                  value={formValues.discountCodeInputMethod}
                  placeholder='選擇輸入方式'
                >
                  <option value='manual'>自訂折扣碼</option>
                  <option value='generate'>生成折扣碼</option>
                </Select>
              </FormControl>
              {formValues.discountCodeInputMethod === 'manual' && (
                <FormControl id='discountCode' mb='4'>
                  <FormLabel>折扣碼：</FormLabel>
                  <Textarea
                    name='discountCode'
                    placeholder='輸入折扣碼（使用逗號分隔多個代碼）'
                    onChange={handleInputChange}
                    value={formValues.discountCode}
                  />
                </FormControl>
              )}
              {formValues.discountCodeInputMethod === 'generate' && (
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
                  <Box mt='4'>
                    <FormLabel>生成的折扣碼：</FormLabel>
                    <Textarea value={formValues.discountCode || ''} readOnly />
                  </Box>
                </FormControl>
              )}
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
            </React.Fragment>
          )}

          {/* 針對免運費的設置 */}
          {(formValues.type === 'orderFreeShipping' ||
            formValues.type === 'productFreeShipping') && (
            <FormControl id='minimumAmount' mb='4'>
              <FormLabel>免運費設置：</FormLabel>
              <Input
                type='text'
                name='minimumAmount'
                placeholder='例如：滿1000元免運費'
                onChange={handleInputChange}
                value={formValues.minimumAmount}
              />
            </FormControl>
          )}

          {/* 通用的設置 */}
          <FormControl id='startDate' mb='4'>
            <FormLabel>開始日期：</FormLabel>
            <Input
              type='date'
              name='startDate'
              onChange={handleInputChange}
              value={formValues.startDate}
            />
          </FormControl>
          <FormControl id='endDate' mb='4'>
            <FormLabel>結束日期：</FormLabel>
            <Input
              type='date'
              name='endDate'
              onChange={handleInputChange}
              value={formValues.endDate}
            />
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

          {/* 選擇適用產品 */}
          {(formValues.type === 'productDiscount' ||
            formValues.type === 'productFreeShipping' ||
            formValues.type === 'productCodeDiscount') && (
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
                      value={String(product._id)}
                      onChange={handleInputChange}
                      size='lg'
                      borderColor='gray.700'
                      isChecked={formValues.selectedProducts.includes(
                        String(product._id),
                      )}
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
