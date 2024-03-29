'use client';
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';

import { getSubstring } from '@helpers/products';
import { IProduct } from '@models/requests/products';
import Link from 'next/link';
import { AddToWishlistButton } from './AddToWishlistButton';
import { AddToCartButton } from './Cart/AddToCartButton';
import { Rating } from './Rating';

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card w='xs' pos='relative' m='0.5rem' bg='none' shadow='md'>
      <AddToWishlistButton product={product} />
      <CardBody>
        <Link href={`/products/${product.slug}`}>
          <Box
            bg={`center / contain no-repeat url(${product.mainImage})`}
            borderRadius='lg'
            boxSize='200px'
            mx='auto'
          />
        </Link>
        <Stack mt='6' spacing='3'>
          <Flex justify='space-between' align='center'>
            <Link href={`/products/${product.slug}`}>
              <Heading size='sm'>{getSubstring(product.name, 20)}</Heading>
            </Link>
            <Flex color='black' fontWeight='bold'>
              <Text fontSize='sm'>$ </Text>
              <Text fontSize='lg'>{product.price}</Text>
            </Flex>
          </Flex>
          <Text fontSize='sm' color='black'>
            {getSubstring(product.description, 30)}{' '}
          </Text>
          <Rating rating={product.rating} />
          <AddToCartButton product={product} />
        </Stack>
      </CardBody>
    </Card>
  );
};
