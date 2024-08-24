import { Box, Button, Flex, Grid, Image, Text } from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getCategoriesListAsync } from '@reducers/public/categories/actions';
import { getProductsByCategoryAsync } from '@reducers/public/products/actions';
import { useEffect, useState } from 'react';

const CategoryFilter = ({ selectedCategory, setSelectedCategory }: any) => {
  const { list: categories } = useAppSelector((state) => state.publicCategory);

  return (
    <Box mb='8' overflowX='auto'>
      <Flex gap='4'>
        {categories &&
          categories?.map((category) => (
            <Button
              key={category._id}
              onClick={() =>
                setSelectedCategory({
                  categoryId: category._id,
                  slug: category.slug,
                })
              }
              variant='ghost'
              size='sm'
              borderBottomWidth={
                selectedCategory === category.slug ? '2px' : '0'
              }
              borderColor='black'
              color={selectedCategory === category.slug ? 'black' : 'gray.500'}
              _hover={{ color: 'black' }}
            >
              {category.name}
            </Button>
          ))}
      </Flex>
    </Box>
  );
};

const ProductCard = ({ product }: any) => (
  <Box>
    <Box bg='gray.100' mb='4' position='relative'>
      <Image
        src={product.coverImage?.imageUrl || `/api/placeholder/400/400`}
        alt={product.name}
        objectFit='cover'
        w='100%'
        h='100%'
      />
    </Box>
    <Text fontSize='sm' fontWeight='medium' mb='1'>
      {product.name}
    </Text>
    <Text fontSize='sm' color='gray.500'>
      ${product.price}
    </Text>
    <Button
      mt='2'
      w='full'
      bg='black'
      color='white'
      fontSize='sm'
      fontWeight='medium'
      opacity='0'
      _groupHover={{ opacity: 1 }}
      transition='opacity 0.3s'
      size='sm'
    >
      加入購物車
    </Button>
  </Box>
);

const ProductGrid = ({ products }: any) => (
  <Grid
    templateColumns={{
      base: 'repeat(2, 1fr)',
      sm: 'repeat(3, 1fr)',
      lg: 'repeat(4, 1fr)',
    }}
    gap='6'
  >
    {products?.map((product: any) => (
      <ProductCard key={product._id} product={product} />
    ))}
  </Grid>
);

const ProductList = () => {
  const dispatch = useAppDispatch();

  const [selectedCategory, setSelectedCategory] = useState<{
    categoryId: string;
    slug: string;
  } | null>(null);

  const { categoryProducts: products } = useAppSelector(
    (state) => state.publicProducts,
  );

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
    <Box bg='white' minH='100vh'>
      <Box maxW='5xl' mx='auto' px='4' pt='24' pb='12'>
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <ProductGrid products={products} />
      </Box>
    </Box>
  );
};

export default ProductList;
