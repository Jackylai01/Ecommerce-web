import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getCategoriesListAsync } from '@reducers/public/categories/actions';
import { getProductsByCategoryAsync } from '@reducers/public/products/actions';
import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const ProductList = () => {
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState<{
    categoryId: string;
    slug: string;
  } | null>(null);

  // 從 Redux 取得類別和產品列表
  const { list: categories } = useAppSelector((state) => state.publicCategory);
  const { categoryProducts: products } = useAppSelector(
    (state) => state.publicProducts,
  );

  // 初次渲染時加載類別列表
  useEffect(() => {
    dispatch(getCategoriesListAsync({ page: 1, limit: 10 }));
  }, [dispatch]);

  // 當選擇某個類別時加載該類別的產品列表
  useEffect(() => {
    if (selectedCategory) {
      dispatch(getProductsByCategoryAsync(selectedCategory));
    }
  }, [selectedCategory, dispatch]);

  return (
    <Box bg='gray.50' minH='100vh'>
      <Container maxW='7xl' py='8'>
        <Flex gap='8'>
          <VStack w='20%' spacing='4'>
            {categories &&
              categories.map((category: any) => (
                <Button
                  key={category._id}
                  onClick={() =>
                    setSelectedCategory({
                      categoryId: category._id,
                      slug: category.slug,
                    })
                  }
                  w='full'
                  justifyContent='space-between'
                  variant='ghost'
                  colorScheme={
                    selectedCategory?.categoryId === category._id
                      ? 'blue'
                      : 'gray'
                  }
                  rightIcon={
                    <ChevronRight
                      size={16}
                      className={
                        selectedCategory?.categoryId === category._id
                          ? 'rotate-90'
                          : ''
                      }
                    />
                  }
                >
                  <Flex align='center'>
                    <Box mr='3'>
                      <Image
                        src={category.coverImage?.imageUrl}
                        alt={category.name}
                        boxSize='20px'
                      />
                    </Box>
                    <Text fontSize='md'>{category.name}</Text>
                  </Flex>
                </Button>
              ))}
          </VStack>

          <Grid
            templateColumns={{
              base: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            }}
            gap='6'
            w='80%'
          >
            {products &&
              products.map((product: any) => (
                <Box
                  key={product._id}
                  bg='white'
                  rounded='lg'
                  shadow='sm'
                  _hover={{ shadow: 'md' }}
                  transition='all 0.3s'
                  overflow='hidden'
                >
                  <Box bg='gray.200' aspectRatio={1}>
                    <Image
                      src={
                        product.coverImage?.imageUrl ||
                        '/api/placeholder/200/200'
                      }
                      alt={product.name}
                      objectFit='cover'
                      w='full'
                      h='full'
                    />
                  </Box>
                  <Box p='4'>
                    <Text
                      fontSize='sm'
                      fontWeight='medium'
                      color='gray.900'
                      noOfLines={1}
                    >
                      {product.name}
                    </Text>
                    <Flex justify='space-between' align='center' mt='2'>
                      <Text fontSize='lg' fontWeight='bold' color='gray.900'>
                        ${product.price}
                      </Text>
                      <Flex align='center'>
                        <Text color='yellow.400' mr='1'>
                          ★
                        </Text>
                        <Text fontSize='xs' color='gray.600'>
                          {product.rating}
                        </Text>
                      </Flex>
                    </Flex>
                    <Button
                      mt='4'
                      w='full'
                      bg='blue.500'
                      color='white'
                      rounded='md'
                      _hover={{ bg: 'blue.600' }}
                    >
                      加入購物車
                    </Button>
                  </Box>
                </Box>
              ))}
          </Grid>
        </Flex>
      </Container>
    </Box>
  );
};

export default ProductList;
