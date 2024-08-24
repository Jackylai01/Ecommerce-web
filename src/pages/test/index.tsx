import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ChevronRight, Search, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

const categories: any = [
  { id: 1, name: '電子產品', icon: '📱' },
  { id: 2, name: '服飾', icon: '👕' },
  { id: 3, name: '家居用品', icon: '🏠' },
  { id: 4, name: '書籍', icon: '📚' },
];

const products: any = {
  1: [
    { id: 1, name: '智能手機', price: 5999, rating: 4.5 },
    { id: 2, name: '筆記型電腦', price: 12999, rating: 4.8 },
    { id: 3, name: '藍牙耳機', price: 1299, rating: 4.2 },
    { id: 4, name: '智能手錶', price: 2499, rating: 4.3 },
    { id: 5, name: '平板電腦', price: 3999, rating: 4.6 },
    { id: 6, name: '無線充電器', price: 299, rating: 4.0 },
  ],
};

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);

  return (
    <Box bg='gray.50' minH='100vh'>
      <Box bg='white' shadow='sm'>
        <Container maxW='7xl' py='4'>
          <Flex justify='space-between' align='center'>
            <Heading size='lg' fontWeight='light' color='gray.800'>
              LOGO
            </Heading>
            <Flex align='center' gap='4'>
              <InputGroup w='64'>
                <InputLeftElement pointerEvents='none'>
                  <Search size={20} color='gray.400' />
                </InputLeftElement>
                <Input
                  type='text'
                  placeholder='搜索商品...'
                  borderRadius='full'
                  borderColor='gray.200'
                  focusBorderColor='blue.300'
                />
              </InputGroup>
              <IconButton
                aria-label='Shopping Cart'
                icon={<ShoppingCart size={24} />}
                variant='ghost'
                position='relative'
              >
                <Box
                  as='span'
                  position='absolute'
                  top='0'
                  right='0'
                  transform='translate(50%, -50%)'
                  bg='red.500'
                  color='white'
                  fontSize='xs'
                  fontWeight='bold'
                  rounded='full'
                  px='2'
                  py='1'
                >
                  3
                </Box>
              </IconButton>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Container maxW='7xl' py='8'>
        <Flex gap='8'>
          <VStack w='20%' spacing='4'>
            {categories.map((category: any) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                w='full'
                justifyContent='space-between'
                variant='ghost'
                colorScheme={selectedCategory === category.id ? 'blue' : 'gray'}
                rightIcon={
                  <ChevronRight
                    size={16}
                    className={
                      selectedCategory === category.id ? 'rotate-90' : ''
                    }
                  />
                }
              >
                <Flex align='center'>
                  <Box mr='3'>{category.icon}</Box>
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
            {products[selectedCategory].map((product: any) => (
              <Box
                key={product.id}
                bg='white'
                rounded='lg'
                shadow='sm'
                _hover={{ shadow: 'md' }}
                transition='all 0.3s'
                overflow='hidden'
              >
                <Box bg='gray.200' aspectRatio={1}>
                  <Image
                    src={`/api/placeholder/200/200`}
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
