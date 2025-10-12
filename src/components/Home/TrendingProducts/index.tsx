import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  Badge,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { useState } from 'react';

const products = [
  {
    id: 1,
    name: '經典牛仔外套',
    price: 2999,
    originalPrice: 3999,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop',
    rating: 4.8,
    reviews: 234,
    discount: 25,
    badge: '限時特價',
  },
  {
    id: 2,
    name: '純棉休閒T恤',
    price: 799,
    originalPrice: 1200,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop',
    rating: 4.6,
    reviews: 189,
    discount: 33,
    badge: '熱銷',
  },
  {
    id: 3,
    name: '時尚運動鞋',
    price: 3599,
    originalPrice: 4500,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop',
    rating: 4.9,
    reviews: 456,
    discount: 20,
    badge: '新品',
  },
  {
    id: 4,
    name: '簡約後背包',
    price: 1899,
    originalPrice: 2600,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop',
    rating: 4.7,
    reviews: 312,
    discount: 27,
    badge: '推薦',
  },
];

export const TrendingProducts = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

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
          <VStack align={{ base: 'center', md: 'flex-start' }} spacing='8px'>
            <Heading
              as='h2'
              fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
              fontWeight='900'
              color='gray.900'
            >
              熱銷商品
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color='gray.600'>
              本週最受歡迎的精選商品
            </Text>
          </VStack>
          <Link href='/products'>
            <Button
              as='a'
              variant='outline'
              borderColor='gray.300'
              borderWidth='2px'
              color='gray.700'
              px='32px'
              h='48px'
              fontWeight='600'
              borderRadius='full'
              _hover={{
                bg: 'gray.100',
                borderColor: 'gray.400',
              }}
            >
              查看全部商品
            </Button>
          </Link>
        </Flex>

        {/* 商品網格 */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 4 }}
          spacing={{ base: '24px', md: '28px' }}
        >
          {products.map((product) => (
            <Box
              key={product.id}
              bg='white'
              borderRadius='20px'
              overflow='hidden'
              transition='all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              boxShadow='sm'
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              role='group'
              sx={{
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
                },
              }}
            >
              {/* 圖片區域 */}
              <Box position='relative' overflow='hidden' h='300px'>
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    w='100%'
                    h='100%'
                    objectFit='cover'
                    transition='transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    sx={{
                      '.group:hover &': {
                        transform: 'scale(1.1)',
                      },
                    }}
                  />
                </Link>

                {/* 折扣標籤 */}
                <Badge
                  position='absolute'
                  top='16px'
                  left='16px'
                  bg='red.500'
                  color='white'
                  px='12px'
                  py='6px'
                  borderRadius='full'
                  fontSize='xs'
                  fontWeight='700'
                  boxShadow='md'
                >
                  -{product.discount}%
                </Badge>

                {/* 右上角標籤 */}
                <Badge
                  position='absolute'
                  top='16px'
                  right='16px'
                  bg='orange.400'
                  color='white'
                  px='12px'
                  py='6px'
                  borderRadius='full'
                  fontSize='xs'
                  fontWeight='700'
                  boxShadow='md'
                >
                  {product.badge}
                </Badge>

                {/* 懸停時的快速操作按鈕 */}
                <Flex
                  position='absolute'
                  bottom='0'
                  left='0'
                  right='0'
                  p='16px'
                  gap='8px'
                  opacity={hoveredId === product.id ? 1 : 0}
                  transform={hoveredId === product.id ? 'translateY(0)' : 'translateY(20px)'}
                  transition='all 0.3s'
                >
                  <Button
                    flex='1'
                    bg='orange.400'
                    color='white'
                    h='44px'
                    leftIcon={<FiShoppingCart />}
                    fontWeight='600'
                    _hover={{
                      bg: 'orange.500',
                    }}
                  >
                    加入購物車
                  </Button>
                  <Button
                    bg='white'
                    color='gray.700'
                    h='44px'
                    minW='44px'
                    p='0'
                    _hover={{
                      bg: 'gray.100',
                    }}
                  >
                    <Icon as={FiHeart} boxSize='20px' />
                  </Button>
                </Flex>
              </Box>

              {/* 商品資訊 */}
              <VStack align='flex-start' p='20px' spacing='12px'>
                {/* 評分 */}
                <HStack spacing='4px'>
                  <Icon as={FiStar} color='orange.400' fill='orange.400' boxSize='16px' />
                  <Text fontSize='sm' fontWeight='600' color='gray.700'>
                    {product.rating}
                  </Text>
                  <Text fontSize='sm' color='gray.500'>
                    ({product.reviews})
                  </Text>
                </HStack>

                {/* 商品名稱 */}
                <Link href={`/products/${product.id}`}>
                  <Heading
                    as='h3'
                    fontSize='md'
                    fontWeight='700'
                    color='gray.900'
                    noOfLines={2}
                    _hover={{
                      color: 'orange.500',
                    }}
                    transition='color 0.2s'
                  >
                    {product.name}
                  </Heading>
                </Link>

                {/* 價格 */}
                <HStack spacing='12px' align='baseline'>
                  <Text
                    fontSize='2xl'
                    fontWeight='900'
                    color='orange.500'
                  >
                    NT$ {product.price.toLocaleString()}
                  </Text>
                  <Text
                    fontSize='md'
                    color='gray.400'
                    textDecoration='line-through'
                  >
                    NT$ {product.originalPrice.toLocaleString()}
                  </Text>
                </HStack>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};
