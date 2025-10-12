import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  Image,
  Stack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FiArrowRight, FiShoppingBag } from 'react-icons/fi';

export const HeroBanner = () => {
  return (
    <Box
      position='relative'
      minH={{ base: '600px', md: '700px', lg: '85vh' }}
      bg='white'
      overflow='hidden'
    >
      {/* 背景裝飾 - 柔和的幾何圖形 */}
      <Box
        position='absolute'
        top='-10%'
        right='-5%'
        width='600px'
        height='600px'
        borderRadius='full'
        bgGradient='linear(to-br, orange.100, pink.100)'
        opacity='0.6'
        filter='blur(80px)'
        display={{ base: 'none', lg: 'block' }}
      />
      <Box
        position='absolute'
        bottom='-10%'
        left='-5%'
        width='500px'
        height='500px'
        borderRadius='full'
        bgGradient='linear(to-tr, blue.100, teal.100)'
        opacity='0.6'
        filter='blur(80px)'
        display={{ base: 'none', lg: 'block' }}
      />

      <Container maxW='container.xl' h='100%' position='relative' zIndex='1'>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align='center'
          justify='space-between'
          h='100%'
          py={{ base: '60px', lg: '80px' }}
          gap={{ base: '40px', lg: '60px' }}
        >
          {/* 左側內容 */}
          <Stack
            spacing={{ base: '24px', lg: '32px' }}
            maxW={{ base: '100%', lg: '550px' }}
            textAlign={{ base: 'center', lg: 'left' }}
            alignItems={{ base: 'center', lg: 'flex-start' }}
          >
            {/* 標籤 */}
            <Box
              bg='orange.500'
              px='24px'
              py='10px'
              borderRadius='full'
              fontSize='sm'
              fontWeight='700'
              color='white'
              w='fit-content'
              boxShadow='lg'
            >
              🔥 熱賣中 · 全館免運
            </Box>

            {/* 主標題 */}
            <Heading
              as='h1'
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl', xl: '6xl' }}
              fontWeight='900'
              color='gray.900'
              lineHeight='1.1'
            >
              打造你的
              <Text
                as='span'
                display='block'
                bgGradient='linear(to-r, orange.400, pink.400)'
                bgClip='text'
              >
                獨特風格
              </Text>
            </Heading>

            {/* 副標題 */}
            <Text
              fontSize={{ base: 'md', lg: 'lg', xl: 'xl' }}
              color='gray.600'
              maxW='500px'
              lineHeight='1.8'
            >
              精選全球頂級品牌，從街頭潮流到經典時尚，
              為你找到最完美的搭配。
            </Text>

            {/* CTA 按鈕群組 */}
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              spacing='16px'
              w={{ base: '100%', sm: 'auto' }}
            >
              <Link href='/products'>
                <Button
                  as='a'
                  size='lg'
                  bgGradient='linear(to-r, orange.400, pink.400)'
                  color='white'
                  px='40px'
                  h='60px'
                  fontSize='md'
                  fontWeight='700'
                  leftIcon={<FiShoppingBag size={20} />}
                  boxShadow='lg'
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: '2xl',
                  }}
                  transition='all 0.3s'
                  borderRadius='full'
                  cursor='pointer'
                >
                  立即購物
                </Button>
              </Link>
              <Link href='/categories'>
                <Button
                  as='a'
                  size='lg'
                  variant='outline'
                  borderColor='gray.300'
                  borderWidth='2px'
                  color='gray.700'
                  px='40px'
                  h='60px'
                  fontSize='md'
                  fontWeight='700'
                  rightIcon={<FiArrowRight size={20} />}
                  _hover={{
                    bg: 'gray.50',
                    borderColor: 'gray.400',
                    transform: 'translateY(-2px)',
                  }}
                  transition='all 0.3s'
                  borderRadius='full'
                  cursor='pointer'
                >
                  瀏覽分類
                </Button>
              </Link>
            </Stack>

            {/* 統計數據 */}
            <Flex
              gap={{ base: '24px', md: '40px' }}
              pt='16px'
              flexWrap='wrap'
              justify={{ base: 'center', lg: 'flex-start' }}
            >
              {[
                { label: '商品數量', value: '10,000+' },
                { label: '滿意顧客', value: '50,000+' },
                { label: '品牌合作', value: '100+' },
              ].map((stat, index) => (
                <Box key={index} textAlign='center'>
                  <Text
                    fontSize={{ base: 'xl', md: '2xl' }}
                    fontWeight='bold'
                    color='gray.900'
                  >
                    {stat.value}
                  </Text>
                  <Text fontSize='sm' color='gray.600'>
                    {stat.label}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Stack>

          {/* 右側圖片 */}
          <Box
            position='relative'
            w={{ base: '100%', lg: '500px', xl: '600px' }}
            h={{ base: '400px', lg: '600px' }}
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            {/* 主圖片 */}
            <Image
              src='https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop'
              alt='時尚商品'
              borderRadius='30px'
              boxShadow='2xl'
              objectFit='cover'
              w='100%'
              h='100%'
              loading='lazy'
              transition='transform 0.3s'
              border='8px solid'
              borderColor='white'
              _hover={{
                transform: 'scale(1.02)',
              }}
            />

            {/* 浮動標籤 */}
            <Box
              position='absolute'
              bottom='40px'
              right='20px'
              bg='white'
              px='24px'
              py='16px'
              borderRadius='2xl'
              boxShadow='2xl'
              display={{ base: 'none', md: 'block' }}
              border='1px solid'
              borderColor='gray.100'
            >
              <Text fontSize='sm' color='gray.500' fontWeight='600'>
                本季熱銷
              </Text>
              <Text fontSize='2xl' fontWeight='bold' color='orange.500'>
                ⭐️ 4.9/5.0
              </Text>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
