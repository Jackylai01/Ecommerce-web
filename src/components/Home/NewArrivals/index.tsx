import {
  Box,
  Container,
  Grid,
  Heading,
  Image,
  Text,
  VStack,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';

const newProducts = [
  {
    id: 1,
    name: '簡約斜背包',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop',
  },
  {
    id: 2,
    name: '質感項鍊',
    price: 799,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop',
  },
  {
    id: 3,
    name: '經典手錶',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop',
  },
  {
    id: 4,
    name: '休閒帽子',
    price: 599,
    image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=500&fit=crop',
  },
];

export const NewArrivals = () => {
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Box py={{ base: '60px', md: '80px', lg: '100px' }} bg='gray.50'>
      <Container maxW='container.xl'>
        {/* 標題 */}
        <VStack spacing='16px' mb={{ base: '40px', md: '60px' }} textAlign='center'>
          <Heading
            as='h2'
            fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
            fontWeight='bold'
            color='gray.800'
          >
            新品上市
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color='gray.600' maxW='600px'>
            最新商品搶先看，引領時尚潮流
          </Text>
        </VStack>

        {/* 商品網格 */}
        <Grid
          templateColumns={{
            base: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          gap={{ base: '20px', md: '24px' }}
        >
          {newProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <Box
                bg={cardBg}
                borderRadius='16px'
                overflow='hidden'
                cursor='pointer'
                transition='all 0.3s'
                boxShadow='sm'
                _hover={{
                  transform: 'translateY(-8px)',
                  boxShadow: '2xl',
                }}
              >
                <Box position='relative' h='300px' overflow='hidden'>
                  <Image
                    src={product.image}
                    alt={product.name}
                    w='100%'
                    h='100%'
                    objectFit='cover'
                    transition='transform 0.3s'
                    _hover={{ transform: 'scale(1.1)' }}
                    loading='lazy'
                  />
                  <Badge
                    position='absolute'
                    top='12px'
                    left='12px'
                    colorScheme='green'
                    px='12px'
                    py='4px'
                    borderRadius='full'
                    fontSize='xs'
                  >
                    新品
                  </Badge>
                </Box>

                <VStack align='flex-start' p='16px' spacing='8px'>
                  <Text fontSize='md' fontWeight='600' color='gray.800'>
                    {product.name}
                  </Text>
                  <Text fontSize='lg' fontWeight='bold' color='purple.600'>
                    NT$ {product.price.toLocaleString()}
                  </Text>
                </VStack>
              </Box>
            </Link>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
