import { Box, Flex } from '@chakra-ui/react';
import { CustomBreadcrumb } from '@components/CustomBreadcrumb';
import LoadingLayout from '@components/Layout/LoadingLayout';
import { ProductCard } from '@components/ProductCard';
import { IBreadcrumbItem } from '@models/requests/products';

interface CategoryProductsProps {
  breadcrumbItems?: IBreadcrumbItem[];
  products: any[] | null;
}

export const CategoryProducts = ({
  breadcrumbItems,
  products,
}: CategoryProductsProps) => {
  return (
    <LoadingLayout isLoading={false}>
      <CustomBreadcrumb items={breadcrumbItems} />
      <Flex
        flexWrap='wrap'
        w={{ base: '100%', lg: '90%' }}
        mx='auto'
        justify={{ base: 'center', lg: 'flex-start' }}
      >
        {products && products.length > 0 ? (
          products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <Box color='black'>No products found in this category.</Box>
        )}
      </Flex>
    </LoadingLayout>
  );
};
