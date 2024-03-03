'use client';
import { Box } from '@chakra-ui/react';
import { SectionHeading } from '@components/SectionHeading';
import { IProduct } from '@models/requests/products';
import { ProductsSlider } from './ProductsSlider';

interface FeaturedProducts {
  title: string;
  products: IProduct[];
}

export const FeaturedProducts = ({ title, products }: FeaturedProducts) => {
  return (
    <Box w={{ base: '100%', lg: '90%' }} mx='auto' p='2rem'>
      <SectionHeading title={title} />
      <ProductsSlider products={products} />
    </Box>
  );
};
