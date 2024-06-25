import { Box, Flex } from '@chakra-ui/react';
import { CustomBreadcrumb } from '@components/CustomBreadcrumb';
import LoadingLayout from '@components/Layout/LoadingLayout';
import Pagination from '@components/Pagination';
import { ProductCard } from '@components/ProductCard';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { IBreadcrumbItem } from '@models/requests/products';
import { resetPublicProductState } from '@reducers/public/products';
import { publicProductsListAsync } from '@reducers/public/products/actions';
import { useEffect, useState } from 'react';

interface AllProductsProps {
  breadcrumbItems?: IBreadcrumbItem[];
  products: any[]; // Ensure products are of the correct type
}

const itemsPerPage = 10;

export const AllProducts = ({
  breadcrumbItems,
  products,
}: AllProductsProps) => {
  const dispatch = useAppDispatch();
  const {
    metadata,
    status: { productsListLoading },
  } = useAppSelector((state) => state.publicProducts);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(publicProductsListAsync({ page, limit: itemsPerPage }));

    return () => {
      dispatch(resetPublicProductState());
    };
  }, [dispatch, page]);

  const hasProducts = products && products.length > 0;

  return (
    <>
      <CustomBreadcrumb items={breadcrumbItems} />
      <LoadingLayout isLoading={productsListLoading}>
        <Flex
          flexWrap='wrap'
          w={{ base: '100%', lg: '90%' }}
          mx='auto'
          justify={{ base: 'center', lg: 'flex-start' }}
        >
          {hasProducts ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <Box color='black'>No products found in this category.</Box>
          )}
        </Flex>
      </LoadingLayout>
      {metadata && <Pagination metadata={metadata} />}
    </>
  );
};
