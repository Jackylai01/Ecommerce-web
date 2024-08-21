import { Box, Image } from '@chakra-ui/react';
import { AddToCartButton } from '@components/Cart/AddToCartButton';
import LoadingLayout from '@components/Layout/LoadingLayout';
import Pagination from '@components/Pagination';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { publicProductsListAsync } from '@reducers/public/products/actions';
import { useEffect } from 'react';

const EnhancedShoppingHighlights = () => {
  const dispatch = useAppDispatch();

  // 從 Redux 中提取產品列表和分頁資料
  const {
    list: productsList,
    metadata,
    status: { productsListLoading },
  } = useAppSelector((state) => state.publicProducts);

  // 初次加載時調用獲取產品列表的 API
  useEffect(() => {
    dispatch(publicProductsListAsync({ page: 1, limit: 10 }));
  }, [dispatch]);

  return (
    <LoadingLayout isLoading={productsListLoading}>
      <Box className='shopping-highlights'>
        <Box as='h2' className='shopping-highlights__title'>
          產品列表
        </Box>
        {productsList && (
          <Box as='main' className='shopping-highlights__grid'>
            {productsList.map((item) => (
              <Box
                as='section'
                key={item._id}
                className='shopping-highlights__item'
              >
                <Box
                  as='article'
                  className='shopping-highlights__image-container'
                >
                  <Image
                    src={item.coverImage.imageUrl}
                    alt='封面圖片'
                    className='shopping-highlights__image'
                  />
                </Box>
                <Box as='section' className='shopping-highlights__content'>
                  <Box as='h3' className='shopping-highlights__product-title'>
                    {item.name}
                  </Box>
                  <Box as='p' className='shopping-highlights__description'>
                    {item.description}
                  </Box>
                  <Box as='aside' className='shopping-highlights__footer'>
                    <Box as='span' className='shopping-highlights__price'>
                      {item.price}
                    </Box>
                    <AddToCartButton product={item} />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
        {metadata && <Pagination metadata={metadata} />}
      </Box>
    </LoadingLayout>
  );
};

export default EnhancedShoppingHighlights;
