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
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface AllProductsProps {
  breadcrumbItems?: IBreadcrumbItem[];
  products?: any[];
}

const itemsPerPage = 10;

export const AllProducts = ({ breadcrumbItems }: AllProductsProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { search } = router.query;
  const {
    list: productsList,
    metadata,
    status: { productsListLoading },
  } = useAppSelector((state) => state.publicProducts);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      publicProductsListAsync({
        page,
        limit: itemsPerPage,
        search: search as string,
      }),
    );

    return () => {
      dispatch(resetPublicProductState());
    };
  }, [dispatch, page, search]);

  const hasProducts = productsList && productsList.length > 0;

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
            productsList?.map((product: any) => (
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
