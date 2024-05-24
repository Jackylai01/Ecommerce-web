import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Button, Container, Flex, IconButton } from '@chakra-ui/react';
import { ProductFormContent } from '@components/Form/FormCRUD/ProductsContent';
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  getProductByIdAsync,
  updateProductAsync,
} from '@reducers/admin/products/actions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useAdminColorMode } from 'src/context/colorMode';

const ProductEditPage = () => {
  const router = useRouter();
  const { colorMode } = useAdminColorMode();
  const textColor = colorMode === 'light' ? 'gray.700' : 'white';
  const iconColor = colorMode === 'light' ? 'gray.700' : 'white';
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const methods = useForm();
  const {
    productDetails,
    status: {
      updateProductFailed,
      updateProductLoading,
      updateProductStatusSuccess,
    },
  } = useAppSelector((state) => state.adminProducts);
  const { uploadedImages } = useAppSelector((state) => state.adminUpload);

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

  const handleSubmit: SubmitHandler<any> = async (data) => {
    if (typeof id === 'string') {
      let detailDescription = data.detailDescription || [];

      const existingImageIds = new Set(
        detailDescription.flatMap((block: any) =>
          block.elements.map((el: any) => el.imageId),
        ),
      );

      const newImageElements = uploadedImages
        .filter((img: any) => !existingImageIds.has(img.imageId))
        .map((image: any) => ({
          className: 'image-selectable',
          elements: [
            {
              tagName: 'img',
              src: image.imageUrl,
              imageId: image.imageId,
            },
          ],
        }));

      detailDescription = [...detailDescription, ...newImageElements];

      const formData = new FormData();
      formData.append('detailDescription', JSON.stringify(detailDescription));

      Object.keys(data).forEach((key) => {
        if (
          ![
            'detailDescription',
            'coverImage',
            'images',
            'specifications',
            'tags',
          ].includes(key)
        ) {
          formData.append(key, data[key]);
        }
      });

      if (data.coverImage) {
        formData.append('coverImage', data.coverImage);
      }
      if (data.images && data.images.length) {
        data.images.forEach((image: any) => {
          formData.append('images', image);
        });
      }
      if (data.tags && Array.isArray(data.tags)) {
        data.tags.forEach((tag: any) => {
          formData.append('tags', tag);
        });
      }
      if (data.specifications) {
        formData.append('specifications', JSON.stringify(data.specifications));
      }

      dispatch(updateProductAsync({ id, body: formData }));
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <LoadingLayout isLoading={updateProductLoading}>
      <Container maxW='container.2x1' mt='5rem'>
        <Flex justifyContent='space-between' alignItems='center' mb={4}>
          <IconButton
            icon={<ArrowBackIcon />}
            aria-label='Back'
            onClick={handleBack}
            color={iconColor}
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
    </LoadingLayout>
  );
};

export default ProductEditPage;
