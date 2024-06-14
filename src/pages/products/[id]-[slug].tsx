import {
  Box,
  Button,
  Link as ChakraLink,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { AddToWishlistButton } from '@components/AddToWishlistButton';
import { AddToCartButton } from '@components/Cart/AddToCartButton';
import { CustomBreadcrumb } from '@components/CustomBreadcrumb';
import LoadingLayout from '@components/Layout/LoadingLayout';
import { Quantity } from '@components/Quantity/Quantity';
import { getSubstring } from '@helpers/products';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { IBreadcrumbItem } from '@models/requests/products';
import { AppState } from '@models/store';
import { addItem, isAdded, resetItems } from '@reducers/client/cart';
import { publicProductsDetailAsync } from '@reducers/public/products/actions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const items: IBreadcrumbItem[] = [
  {
    name: 'Products',
    link: '/products',
  },
  {
    name: 'Categories',
    link: '/categories',
  },
];

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const fullPath = router.query['id]-[slug'];
      if (typeof fullPath === 'string') {
        const [id, slug] = fullPath.split('-');
        console.log('ID:', id); // 檢查 id 的值
        console.log('Slug:', slug); // 檢查 slug 的值
        if (id && slug) {
          dispatch(publicProductsDetailAsync(`${id}-${slug}`));
        }
      }
    }
  }, [router.isReady, router.query, dispatch]);

  const {
    detail: product,
    status: { productsDetailLoading },
  } = useAppSelector((state) => state.publicProducts);

  const productIsAddedToCart = useSelector((state: AppState) =>
    product ? isAdded(state, 'cart', product._id) : false,
  );

  const handleBuyNow = () => {
    dispatch(resetItems('checkout'));
    dispatch(addItem({ key: 'checkout', product, count: quantity }));
  };

  if (productsDetailLoading || !product) {
    return <LoadingLayout isLoading={productsDetailLoading} />;
  }

  // 確保 product 存在且包含 category 和 coverImage
  if (!product || !product.category || !product.coverImage) {
    return <div>產品未找到</div>;
  }

  const slug =
    typeof router.query['id]-[slug'] === 'string'
      ? router.query['id]-[slug'].split('-').slice(1).join('-')
      : ''; // 解析 slug

  return (
    <>
      <CustomBreadcrumb
        items={[
          ...items,
          {
            name: product.category.name,
            link: `/categories/${product.category._id}`,
          },
          {
            name: getSubstring(product.name, 20),
            link: `/products/${product._id}-${slug}`,
          },
        ]}
      />
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
        w={{ base: '100%', lg: '90%' }}
        mx='auto'
        p='2rem'
        gap='20'
      >
        <GridItem p='1rem' pos='relative'>
          <AddToWishlistButton product={product} />
          <Image
            src={product.coverImage.imageUrl}
            alt={product.name}
            mx='auto'
          />
          <Flex>
            {product.images?.length !== 0 &&
              product.images?.map((image: any, i: number) => (
                <Image
                  key={i}
                  src={image.imageUrl}
                  alt={product.name}
                  mx='auto'
                  boxSize='70px'
                  rounded='md'
                  shadow='sm'
                  borderWidth='1px'
                  borderColor='gray.100'
                />
              ))}
          </Flex>
        </GridItem>
        <GridItem p='1rem'>
          <Heading>{product.name}</Heading>
          <Text my='1rem'>{product.description}</Text>
          <Text fontWeight='bold' fontSize='2rem'>
            ${product.price}
          </Text>
          <Divider my='1rem' />
          <Quantity
            setQuantity={(_valueAsString, valueAsNumber) =>
              setQuantity(valueAsNumber)
            }
            disabled={productIsAddedToCart}
          />
          <Divider my='1rem' />
          <ChakraLink href='/checkout'>
            <Button
              variant='outline'
              bgColor='red.200'
              mr='1rem'
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </ChakraLink>
          <AddToCartButton product={product} count={quantity} />
          <Stack py='2rem'>
            <Box borderWidth={1} borderColor='gray.100' p='1rem'>
              <Text fontWeight='bold'>Free Delivery</Text>
              <ChakraLink textDecor='underline' color='gray.500'>
                Enter Your postal Code for Delivery Availability
              </ChakraLink>
            </Box>
            <Box borderWidth={1} borderColor='gray.100' p='1rem'>
              <Text fontWeight='bold'>Return Delivery</Text>
              <Text color='gray.500'>
                Free 30 Days Delivery Returns
                <ChakraLink textDecor='underline'> Details</ChakraLink>
              </Text>
            </Box>
          </Stack>
        </GridItem>
      </Grid>
    </>
  );
};

export default ProductDetails;
