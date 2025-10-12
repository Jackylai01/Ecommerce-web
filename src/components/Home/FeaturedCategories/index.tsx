import {
  Box,
  Container,
  Grid,
  Heading,
  Image,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';

const categories = [
  {
    name: '女裝',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop',
    itemCount: '2,500+ 件商品',
    color: 'pink.400',
  },
  {
    name: '男裝',
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&h=500&fit=crop',
    itemCount: '1,800+ 件商品',
    color: 'blue.400',
  },
  {
    name: '配件',
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=400&h=500&fit=crop',
    itemCount: '3,200+ 件商品',
    color: 'purple.400',
  },
  {
    name: '鞋類',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
    itemCount: '1,500+ 件商品',
    color: 'orange.400',
  },
];

export const FeaturedCategories = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box py={{ base: '60px', md: '80px', lg: '100px' }} bg='white'>
      <Container maxW='container.xl'>
        {/* 標題區域 */}
        <VStack spacing='16px' mb={{ base: '40px', md: '60px' }} textAlign='center'>
          <Heading
            as='h2'
            fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
            fontWeight='bold'
            color='gray.800'
          >
            熱門分類
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color='gray.600' maxW='600px'>
            探索我們精心挑選的商品分類，找到最適合你的風格
          </Text>
        </VStack>

        {/* 分類網格 */}
        <Grid
          templateColumns={{
            base: '1  fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          gap={{ base: '20px', md: '24px', lg: '30px' }}
        >
          {categories.map((category, index) => (
            <Link href={`/categories/${category.name}`} key={index}>
              <Box
                bg={cardBg}
                borderRadius='20px'
                overflow='hidden'
                position='relative'
                cursor='pointer'
                transition='all 0.3s'
                boxShadow='md'
                _hover={{
                  transform: 'translateY(-8px)',
                  boxShadow: '2xl',
                  bg: hoverBg,
                }}
                h='100%'
              >
                {/* 圖片容器 */}
                <Box
                  position='relative'
                  h={{ base: '280px', md: '320px' }}
                  overflow='hidden'
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    w='100%'
                    h='100%'
                    objectFit='cover'
                    transition='transform 0.3s'
                    _hover={{
                      transform: 'scale(1.1)',
                    }}
                    loading='lazy'
                  />

                  {/* 漸層遮罩 */}
                  <Box
                    position='absolute'
                    bottom='0'
                    left='0'
                    right='0'
                    h='50%'
                    bgGradient='linear(to-t, blackAlpha.800, transparent)'
                  />
                </Box>

                {/* 文字內容 */}
                <VStack
                  position='absolute'
                  bottom='0'
                  left='0'
                  right='0'
                  p='24px'
                  align='flex-start'
                  spacing='8px'
                >
                  <Heading
                    as='h3'
                    fontSize={{ base: 'xl', md: '2xl' }}
                    fontWeight='bold'
                    color='white'
                  >
                    {category.name}
                  </Heading>
                  <Text fontSize='sm' color='whiteAlpha.900'>
                    {category.itemCount}
                  </Text>
                </VStack>

                {/* 角標裝飾 */}
                <Box
                  position='absolute'
                  top='16px'
                  right='16px'
                  bg={category.color}
                  color='white'
                  px='12px'
                  py='6px'
                  borderRadius='full'
                  fontSize='xs'
                  fontWeight='600'
                  boxShadow='md'
                >
                  熱銷
                </Box>
              </Box>
            </Link>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
