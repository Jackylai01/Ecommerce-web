import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Button, Container, Flex, IconButton } from '@chakra-ui/react';
import { ProductFormContent } from '@components/Form/FormCRUD/ProductsContent';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getProductByIdAsync } from '@reducers/admin/products/actions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAdminColorMode } from 'src/context/colorMode';

const ProductEditPage = () => {
  const router = useRouter();
  const { colorMode } = useAdminColorMode();
  const textColor = colorMode === 'light' ? 'gray.700' : 'white';
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const methods = useForm();
  const { productDetails } = useAppSelector((state) => state.adminProducts);

  useEffect(() => {
    if (id) {
      dispatch(getProductByIdAsync(id as string));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (productDetails) {
      methods.reset(productDetails);
    }
  }, [productDetails, methods]);

  const handleSubmit = async (data: any) => {
    // 處理表單提交邏輯
    console.log('提交的数据:', data);
    // 根據 id 判斷是更新還是新增產品
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <Container maxW='container.2x1' mt='5rem'>
      <Flex justifyContent='space-between' alignItems='center' mb={4}>
        <IconButton
          icon={<ArrowBackIcon />}
          aria-label='Back'
          onClick={handleBack}
        />
        <Box as='h1' fontSize='2xl' color={textColor}>
          編輯產品
        </Box>
        <Box width='40px' />
      </Flex>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Box
            border='1px'
            borderRadius='md'
            borderColor='gray.200'
            p={4}
            boxShadow='sm'
          >
            <ProductFormContent />
          </Box>
          <Button mt={4} colorScheme='teal' type='submit'>
            送出
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};

export default ProductEditPage;
