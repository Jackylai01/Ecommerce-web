import { Box, Grid, GridItem, Heading, Image, Text } from '@chakra-ui/react';

const ProductGrid = () => {
  const products = [
    {
      id: 1,
      image: '/api/placeholder/400/300',
      title: '产品 1',
      description: '描述 1',
    },
    {
      id: 2,
      image: '/api/placeholder/400/300',
      title: '产品 2',
      description: '描述 2',
    },
    {
      id: 3,
      image: '/api/placeholder/400/300',
      title: '产品 3',
      description: '描述 3',
    },
    {
      id: 4,
      image: '/api/placeholder/400/300',
      title: '产品 4',
      description: '描述 4',
    },
    {
      id: 5,
      image: '/api/placeholder/400/300',
      title: '产品 5',
      description: '描述 5',
    },
    {
      id: 6,
      image: '/api/placeholder/400/300',
      title: '产品 6',
      description: '描述 6',
    },
    {
      id: 7,
      image: '/api/placeholder/400/300',
      title: '产品 7',
      description: '描述 7',
    },
    {
      id: 8,
      image: '/api/placeholder/400/300',
      title: '产品 8',
      description: '描述 8',
    },
    {
      id: 9,
      image: '/api/placeholder/400/300',
      title: '产品 9',
      description: '描述 9',
    },
  ];

  return (
    <Box className='product-grid'>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        gap={6}
        w='50%'
      >
        {products.map((product) => (
          <GridItem key={product.id} className='product-grid__item'>
            <Box className='product-grid__card'>
              <Image
                src={product.image}
                alt={product.title}
                className='product-grid__image'
              />
              <Box p={4}>
                <Heading as='h3' size='md' className='product-grid__title'>
                  {product.title}
                </Heading>
                <Text className='product-grid__description'>
                  {product.description}
                </Text>
              </Box>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductGrid;
