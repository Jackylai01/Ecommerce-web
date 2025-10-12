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
import { FiArrowRight } from 'react-icons/fi';

export const PromotionBanner = () => {
  return (
    <Box py={{ base: '60px', md: '80px', lg: '100px' }} bg='white'>
      <Container maxW='container.xl'>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          bg='linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          borderRadius='24px'
          overflow='hidden'
          boxShadow='2xl'
        >
          {/* 左側內容 */}
          <Stack
            spacing='24px'
            p={{ base: '40px', md: '60px', lg: '80px' }}
            flex='1'
            justify='center'
            color='white'
          >
            <Box
              bg='whiteAlpha.300'
              px='16px'
              py='8px'
              borderRadius='full'
              fontSize='sm'
              fontWeight='600'
              w='fit-content'
              backdropFilter='blur(10px)'
            >
              ⚡ 限時優惠
            </Box>

            <Heading
              as='h2'
              fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
              fontWeight='bold'
              lineHeight='1.2'
            >
              夏季大促銷
              <Text as='span' display='block' color='yellow.300'>
                全場 5 折起
              </Text>
            </Heading>

            <Text fontSize={{ base: 'md', lg: 'lg' }} color='whiteAlpha.900' maxW='500px'>
              精選商品限時特價，全館滿千免運，再享會員專屬折扣！
              活動只到本週日，錯過再等一年！
            </Text>

            <Stack direction={{ base: 'column', sm: 'row' }} spacing='16px'>
              <Link href='/products?sale=true'>
                <Button
                  size='lg'
                  bg='white'
                  color='purple.600'
                  px='32px'
                  h='56px'
                  rightIcon={<FiArrowRight />}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'xl',
                  }}
                  transition='all 0.3s'
                >
                  立即搶購
                </Button>
              </Link>
            </Stack>

            {/* 倒數計時（裝飾用） */}
            <Flex gap='16px' pt='16px'>
              {[
                { value: '02', label: '天' },
                { value: '14', label: '時' },
                { value: '32', label: '分' },
                { value: '18', label: '秒' },
              ].map((time, index) => (
                <Box
                  key={index}
                  bg='whiteAlpha.200'
                  px='16px'
                  py='12px'
                  borderRadius='12px'
                  textAlign='center'
                  backdropFilter='blur(10px)'
                >
                  <Text fontSize='2xl' fontWeight='bold'>
                    {time.value}
                  </Text>
                  <Text fontSize='xs'>{time.label}</Text>
                </Box>
              ))}
            </Flex>
          </Stack>

          {/* 右側圖片 */}
          <Box
            flex='1'
            position='relative'
            minH={{ base: '300px', lg: '400px' }}
            display={{ base: 'none', lg: 'block' }}
          >
            <Image
              src='https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&h=600&fit=crop'
              alt='促銷商品'
              w='100%'
              h='100%'
              objectFit='cover'
              loading='lazy'
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
