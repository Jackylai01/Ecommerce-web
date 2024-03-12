import { Box } from '@chakra-ui/react';
import ProductTableContainer from '@components/Layout/AdminLayout/Products';
import { NextPage } from 'next';

const ProductsPages: NextPage = () => {
  return (
    <Box>
      <ProductTableContainer />
    </Box>
  );
};

export default ProductsPages;
