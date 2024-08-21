import { Box, Image } from '@chakra-ui/react';
import { AddToCartButton } from '@components/Cart/AddToCartButton';
import LoadingLayout from '@components/Layout/LoadingLayout';
import Pagination from '@components/Pagination';
import { Component } from '@fixtures/componentLibrary';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { publicProductsListAsync } from '@reducers/public/products/actions';
import { useEffect } from 'react';

interface EnhancedShoppingHighlightsProps {
  element: Component;
  isEdit: boolean;
  onBlur: () => void;
}

const EnhancedShoppingHighlights: React.FC<EnhancedShoppingHighlightsProps> = ({
  element,
  isEdit,
  onBlur,
}) => {
  const dispatch = useAppDispatch();

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
      <Box className={element.className} style={element.style}>
        <Box
          as='h2'
          className={element.elements?.find((e) => e.id === 'title')?.className}
        >
          {element.elements?.find((e) => e.id === 'title')?.context ||
            '產品列表'}
        </Box>
        {productsList && (
          <Box
            as='main'
            className={
              element.elements?.find((e) => e.id === 'product_grid')?.className
            }
          >
            {productsList.map((item) => (
              <Box
                as='section'
                key={item._id}
                className={
                  element.elements?.find((e) => e.id === 'product_item')
                    ?.className
                }
              >
                <Box
                  as='article'
                  className={
                    element.elements?.find(
                      (e) => e.id === 'product_image_container',
                    )?.className
                  }
                >
                  <Image
                    src={item.coverImage.imageUrl}
                    alt='封面圖片'
                    className={
                      element.elements?.find((e) => e.id === 'product_image')
                        ?.className
                    }
                    boxSize='full'
                    objectFit='cover'
                    maxHeight='18rem' // Constraint to ensure no overflow
                    borderRadius='lg' // Adds rounded corners to the image
                  />
                </Box>
                <Box
                  as='section'
                  className={
                    element.elements?.find((e) => e.id === 'product_content')
                      ?.className
                  }
                >
                  <Box
                    as='h3'
                    className={
                      element.elements?.find((e) => e.id === 'product_title')
                        ?.className
                    }
                  >
                    {item.name}
                  </Box>
                  <Box
                    as='p'
                    className={
                      element.elements?.find(
                        (e) => e.id === 'product_description',
                      )?.className
                    }
                  >
                    {item.description}
                  </Box>
                  <Box
                    as='aside'
                    className={
                      element.elements?.find((e) => e.id === 'product_footer')
                        ?.className
                    }
                  >
                    <Box
                      as='span'
                      className={
                        element.elements?.find((e) => e.id === 'product_price')
                          ?.className
                      }
                    >
                      {item.price}
                    </Box>
                  </Box>
                </Box>
                <AddToCartButton product={item} />
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
