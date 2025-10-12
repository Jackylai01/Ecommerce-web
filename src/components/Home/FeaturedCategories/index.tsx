import {
  Box,
  Container,
  Heading,
  Image,
  Text,
  VStack,
  SimpleGrid,
  Icon,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const categories = [
  {
    id: 1,
    name: '女裝系列',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&h=600&fit=crop',
    count: '2,500+ 商品',
    color: 'pink.500',
  },
  {
    id: 2,
    name: '男裝系列',
    image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=500&h=600&fit=crop',
    count: '1,800+ 商品',
    color: 'blue.500',
  },
  {
    id: 3,
    name: '精選配件',
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500&h=600&fit=crop',
    count: '3,200+ 商品',
    color: 'purple.500',
  },
  {
    id: 4,
    name: '鞋履專區',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop',
    count: '1,500+ 商品',
    color: 'orange.500',
  },
];

export const FeaturedCategories = () => {
  return (
    <Box py={{ base: '60px', md: '80px', lg: '100px' }} bg='white'>
      <Container maxW='container.xl'>
        {/* 標題區域 */}
        <VStack spacing='16px' mb={{ base: '40px', md: '60px' }} textAlign='center'>
          <Heading
            as='h2'
            fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
            fontWeight='900'
            color='gray.900'
          >
            熱門分類
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color='gray.600' maxW='600px'>
            探索我們精心挑選的商品類別，找到最適合你的風格
          </Text>
        </VStack>

        {/* 分類網格 */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 4 }}
          spacing={{ base: '20px', md: '24px' }}
        >
          {categories.map((category) => (
            <Link href={`/categories/${category.id}`} key={category.id}>
              <Box
                position='relative'
                borderRadius='24px'
                overflow='hidden'
                cursor='pointer'
                h={{ base: '350px', md: '400px' }}
                bg='gray.100'
                transition='all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                _hover={{
                  transform: 'translateY(-12px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                }}
                role='group'
              >
                {/* 背景圖片 */}
                <Image
                  src={category.image}
                  alt={category.name}
                  w='100%'
                  h='100%'
                  objectFit='cover'
                  transition='transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  _groupHover={{
                    transform: 'scale(1.08)',
                  }}
                />

                {/* 漸層遮罩 */}
                <Box
                  position='absolute'
                  top='0'
                  left='0'
                  right='0'
                  bottom='0'
                  bgGradient='linear(to-b, transparent 0%, transparent 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.8) 100%)'
                  transition='all 0.4s'
                  _groupHover={{
                    bgGradient: 'linear(to-b, transparent 0%, transparent 30%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.9) 100%)',
                  }}
                />

                {/* 內容區域 */}
                <VStack
                  position='absolute'
                  bottom='0'
                  left='0'
                  right='0'
                  p='24px'
                  align='flex-start'
                  spacing='8px'
                  color='white'
                  zIndex='1'
                >
                  <Text
                    fontSize='xs'
                    fontWeight='600'
                    color='white'
                    opacity='0.9'
                    letterSpacing='wider'
                    textTransform='uppercase'
                  >
                    {category.count}
                  </Text>
                  <Heading
                    as='h3'
                    fontSize={{ base: 'xl', md: '2xl' }}
                    fontWeight='900'
                    color='white'
                    mb='8px'
                  >
                    {category.name}
                  </Heading>

                  {/* 查看更多按鈕 */}
                  <Box
                    display='flex'
                    alignItems='center'
                    gap='8px'
                    color='white'
                    fontWeight='600'
                    fontSize='sm'
                    opacity='0.9'
                    transition='all 0.3s'
                    _groupHover={{
                      opacity: '1',
                      gap: '12px',
                    }}
                  >
                    <Text>探索更多</Text>
                    <Icon
                      as={FiArrowRight}
                      boxSize='18px'
                      transition='transform 0.3s'
                      _groupHover={{
                        transform: 'translateX(4px)',
                      }}
                    />
                  </Box>
                </VStack>

                {/* 頂部裝飾標籤 */}
                <Box
                  position='absolute'
                  top='20px'
                  right='20px'
                  bg={category.color}
                  color='white'
                  px='12px'
                  py='6px'
                  borderRadius='full'
                  fontSize='xs'
                  fontWeight='700'
                  boxShadow='0 4px 12px rgba(0,0,0,0.15)'
                  zIndex='2'
                  opacity='0'
                  transform='translateY(-10px)'
                  transition='all 0.3s'
                  _groupHover={{
                    opacity: '1',
                    transform: 'translateY(0)',
                  }}
                >
                  HOT
                </Box>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};
