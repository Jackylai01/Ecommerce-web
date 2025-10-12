import {
  Box,
  Container,
  Heading,
  Image,
  Text,
  VStack,
  Badge,
  SimpleGrid,
  Button,
  Icon,
  Flex,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FiShoppingCart, FiEye } from 'react-icons/fi';
import { useState } from 'react';

const newProducts = [
  {
    id: 1,
    name: '簡約真皮斜背包',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop',
    description: '義大利進口真皮',
  },
  {
    id: 2,
    name: '925純銀項鍊',
    price: 799,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop',
    description: '經典百搭款式',
  },
  {
    id: 3,
    name: '機械自動上鍊腕錶',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop',
    description: '瑞士機芯',
  },
  {
    id: 4,
    name: '潮流棒球帽',
    price: 599,
    image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=500&fit=crop',
    description: '街頭時尚必備',
  },
];

export const NewArrivals = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <Box py={{ base: '60px', md: '80px', lg: '100px' }} bg='white'>
      <Container maxW='container.xl'>
        {/* 標題 */}
        <VStack spacing='16px' mb={{ base: '40px', md: '60px' }} textAlign='center'>
          <Heading
            as='h2'
            fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
            fontWeight='900'
            color='gray.900'
          >
            新品上市
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color='gray.600' maxW='600px'>
            最新到貨商品，搶先體驗最前沿的時尚潮流
          </Text>
        </VStack>

        {/* 商品網格 */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 4 }}
          spacing={{ base: '24px', md: '28px' }}
        >
          {newProducts.map((product) => (
            <Box
              key={product.id}
              bg='white'
              borderRadius='20px'
              overflow='hidden'
              cursor='pointer'
              transition='all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              boxShadow='sm'
              border='1px solid'
              borderColor='gray.100'
              _hover={{
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
                borderColor: 'orange.200',
              }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              role='group'
            >
              {/* 圖片區域 */}
              <Box position='relative' h='300px' overflow='hidden' bg='gray.50'>
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    w='100%'
                    h='100%'
                    objectFit='cover'
                    transition='transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    _groupHover={{
                      transform: 'scale(1.1)',
                    }}
                  />
                </Link>

                {/* NEW 標籤 */}
                <Badge
                  position='absolute'
                  top='16px'
                  left='16px'
                  bgGradient='linear(to-r, green.400, teal.400)'
                  color='white'
                  px='14px'
                  py='8px'
                  borderRadius='full'
                  fontSize='xs'
                  fontWeight='700'
                  boxShadow='0 4px 12px rgba(0,0,0,0.15)'
                  textTransform='uppercase'
                  letterSpacing='wider'
                >
                  NEW
                </Badge>

                {/* 懸停時的操作按鈕 */}
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
                    bgGradient='linear(to-r, orange.400, pink.400)'
                    color='white'
                    h='44px'
                    leftIcon={<FiShoppingCart />}
                    fontWeight='600'
                    fontSize='sm'
                    _hover={{
                      opacity: 0.9,
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
                    <Icon as={FiEye} boxSize='20px' />
                  </Button>
                </Flex>
              </Box>

              {/* 商品資訊 */}
              <VStack align='flex-start' p='20px' spacing='10px'>
                {/* 商品描述 */}
                <Text fontSize='xs' color='orange.500' fontWeight='600' letterSpacing='wider'>
                  {product.description}
                </Text>

                {/* 商品名稱 */}
                <Link href={`/products/${product.id}`}>
                  <Heading
                    as='h3'
                    fontSize='md'
                    fontWeight='700'
                    color='gray.900'
                    noOfLines={2}
                    minH='44px'
                    _hover={{
                      color: 'orange.500',
                    }}
                    transition='color 0.2s'
                  >
                    {product.name}
                  </Heading>
                </Link>

                {/* 價格 */}
                <Text
                  fontSize='2xl'
                  fontWeight='900'
                  color='gray.900'
                >
                  NT$ {product.price.toLocaleString()}
                </Text>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};
