import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
  Badge,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';

const trendingProducts = [
  {
    id: 1,
    name: '經典皮革手提包',
    price: 2999,
    originalPrice: 3999,
    rating: 4.8,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=500&fit=crop',
    badge: '熱銷',
    discount: '-25%',
  },
  {
    id: 2,
    name: '極簡設計運動鞋',
    price: 1899,
    originalPrice: 2499,
    rating: 4.9,
    reviews: 567,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop',
    badge: '新品',
    discount: '-24%',
  },
  {
    id: 3,
    name: '都市風格外套',
    price: 3499,
    originalPrice: 4999,
    rating: 4.7,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
    badge: '限時',
    discount: '-30%',
  },
  {
    id: 4,
    name: '時尚太陽眼鏡',
    price: 899,
    originalPrice: 1299,
    rating: 4.6,
    reviews: 423,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=500&fit=crop',
    badge: '推薦',
    discount: '-31%',
  },
];

export const TrendingProducts = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const badgeColors: Record<string, string> = {
    熱銷: 'red',
    新品: 'green',
    限時: 'orange',
    推薦: 'purple',
  };

  return (
    <Box py={{ base: '60px', md: '80px', lg: '100px' }} bg='gray.50'>
      <Container maxW='container.xl'>
        {/* 標題區域 */}
        <Flex
          justify='space-between'
          align='center'
          mb={{ base: '40px', md: '60px' }}
          flexDirection={{ base: 'column', md: 'row' }}
          gap='20px'
        >
          <VStack align={{ base: 'center', md: 'flex-start' }} spacing='12px'>
            <Heading
              as='h2'
              fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
              fontWeight='bold'
              color='gray.800'
            >
              本週熱銷商品
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color='gray.600'>
              精選最受歡迎的商品，限時優惠中
            </Text>
          </VStack>

          <Link href='/products'>
            <Button
              size='lg'
              variant='outline'
              colorScheme='purple'
              borderRadius='full'
              px='32px'
            >
              查看全部
            </Button>
          </Link>
        </Flex>

        {/* 商品網格 */}
        <Grid
          templateColumns={{
            base: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          gap={{ base: '20px', md: '24px' }}
        >
          {trendingProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <Box
                bg={cardBg}
                borderRadius='16px'
                overflow='hidden'
                position='relative'
                cursor='pointer'
                transition='all 0.3s'
                boxShadow='sm'
                _hover={{
                  transform: 'translateY(-8px)',
                  boxShadow: '2xl',
                }}
                h='100%'
              >
                {/* 圖片區域 */}
                <Box position='relative' h='300px' overflow='hidden' bg='gray.100'>
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

                  {/* 標籤 */}
                  <Badge
                    position='absolute'
                    top='12px'
                    left='12px'
                    colorScheme={badgeColors[product.badge]}
                    px='12px'
                    py='4px'
                    borderRadius='full'
                    fontSize='xs'
                    fontWeight='600'
                  >
                    {product.badge}
                  </Badge>

                  {/* 折扣標籤 */}
                  <Badge
                    position='absolute'
                    top='12px'
                    right='12px'
                    colorScheme='red'
                    px='12px'
                    py='4px'
                    borderRadius='full'
                    fontSize='xs'
                    fontWeight='600'
                  >
                    {product.discount}
                  </Badge>

                  {/* 懸停按鈕 */}
                  <HStack
                    position='absolute'
                    bottom='12px'
                    left='50%'
                    transform='translateX(-50%)'
                    opacity='0'
                    _groupHover={{ opacity: 1 }}
                    transition='opacity 0.3s'
                    spacing='8px'
                  >
                    <Button
                      size='sm'
                      colorScheme='white'
                      bg='white'
                      color='gray.800'
                      leftIcon={<FiShoppingCart />}
                      _hover={{ bg: 'gray.100' }}
                    >
                      加入購物車
                    </Button>
                    <Button
                      size='sm'
                      colorScheme='white'
                      bg='white'
                      color='red.500'
                      _hover={{ bg: 'gray.100' }}
                    >
                      <Icon as={FiHeart} />
                    </Button>
                  </HStack>
                </Box>

                {/* 商品資訊 */}
                <VStack align='flex-start' p='16px' spacing='12px'>
                  <Text
                    fontSize='md'
                    fontWeight='600'
                    color='gray.800'
                    noOfLines={2}
                    h='48px'
                  >
                    {product.name}
                  </Text>

                  {/* 評分 */}
                  <HStack spacing='4px'>
                    <Icon as={FiStar} color='yellow.400' fill='yellow.400' />
                    <Text fontSize='sm' fontWeight='600' color='gray.700'>
                      {product.rating}
                    </Text>
                    <Text fontSize='xs' color='gray.500'>
                      ({product.reviews})
                    </Text>
                  </HStack>

                  {/* 價格 */}
                  <HStack spacing='8px' align='baseline'>
                    <Text fontSize='xl' fontWeight='bold' color='purple.600'>
                      NT$ {product.price.toLocaleString()}
                    </Text>
                    <Text
                      fontSize='sm'
                      color='gray.400'
                      textDecoration='line-through'
                    >
                      NT$ {product.originalPrice.toLocaleString()}
                    </Text>
                  </HStack>
                </VStack>
              </Box>
            </Link>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
