import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

import { AddToWishlistButton } from '@components/AddToWishlistButton';
import { AddToCartButton } from '@components/Cart/AddToCartButton';
import { CustomBreadcrumb } from '@components/CustomBreadcrumb';
import { Quantity } from '@components/Quantity/Quantity';
import { Rating } from '@components/Rating';
import { getSubstring } from '@helpers/products';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { IBreadcrumbItem, IProduct } from '@models/requests/products';
import { addItem, isAdded, resetItems } from '@reducers/client/cart';

interface ProductDetailsProps {
  product: IProduct;
}
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

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const productIsAddedToCart = useAppSelector((state) =>
    isAdded(state, 'cart', product.id),
  );

  const handleBuyNow = () => {
    dispatch(resetItems('checkout'));
    dispatch(addItem({ key: 'checkout', product, count: quantity }));
  };

  return (
    <>
      <CustomBreadcrumb
        items={[
          ...items, // 确保items定义在某处或移动到组件内
          {
            name: product.category.name,
            link: `/categories/${product.category.id}`,
          },
          {
            name: getSubstring(product.name, 20),
            link: `/products/${product.slug}`,
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
          <Image src={product.mainImage} alt={product.name} mx='auto' />
          <Flex>
            {product.gallery?.length !== 0 &&
              product.gallery?.map((image, i) => (
                <Image
                  key={i}
                  src={image}
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
          <Rating rating={product.rating} />
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
          <Link href='/checkout'>
            <Button
              variant='outline'
              bgColor='brand.primary'
              color='white'
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </Link>
          <AddToCartButton product={product} count={quantity} />
          <Stack py='2rem'>
            <Box borderWidth={1} borderColor='gray.100' p='1rem'>
              <Text fontWeight='bold'>Free Deliver</Text>
              <Link textDecor='underline' color='gray.500'>
                Enter Your postal Code for Delivery Availability
              </Link>
            </Box>
            <Box borderWidth={1} borderColor='gray.100' p='1rem'>
              <Text fontWeight='bold'>Return Delivery</Text>
              <Text color='gray.500'>
                Free 30 Days Delivery Returns
                <Link textDecor='underline'> Details</Link>
              </Text>
            </Box>
          </Stack>
        </GridItem>
      </Grid>
    </>
  );
};
