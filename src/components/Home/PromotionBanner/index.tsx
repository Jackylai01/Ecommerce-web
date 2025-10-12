import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  Image,
  Stack,
  HStack,
  VStack,
  Icon,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FiArrowRight, FiClock, FiGift } from 'react-icons/fi';

export const PromotionBanner = () => {
  return (
    <Box py={{ base: '60px', md: '80px', lg: '100px' }} bg='white' position='relative'>
      <Container maxW='container.xl'>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          bgGradient='linear(135deg, orange.400 0%, pink.500 100%)'
          borderRadius='32px'
          overflow='hidden'
          boxShadow='0 20px 60px rgba(251, 146, 60, 0.3)'
          position='relative'
        >
          {/* 裝飾性圓形 */}
          <Box
            position='absolute'
            top='-50px'
            right='-50px'
            w='200px'
            h='200px'
            borderRadius='full'
            bg='whiteAlpha.200'
            filter='blur(60px)'
            display={{ base: 'none', lg: 'block' }}
          />
          <Box
            position='absolute'
            bottom='-30px'
            left='-30px'
            w='150px'
            h='150px'
            borderRadius='full'
            bg='whiteAlpha.200'
            filter='blur(50px)'
            display={{ base: 'none', lg: 'block' }}
          />

          {/* 左側內容 */}
          <Stack
            spacing='28px'
            p={{ base: '40px', md: '60px', lg: '80px' }}
            flex='1'
            justify='center'
            color='white'
            position='relative'
            zIndex='1'
          >
            {/* 標籤 */}
            <HStack spacing='12px'>
              <Box
                bg='whiteAlpha.300'
                px='16px'
                py='8px'
                borderRadius='full'
                fontSize='sm'
                fontWeight='700'
                backdropFilter='blur(10px)'
                border='1px solid'
                borderColor='whiteAlpha.400'
              >
                <HStack spacing='6px'>
                  <Icon as={FiGift} boxSize='16px' />
                  <Text>限時優惠</Text>
                </HStack>
              </Box>
            </HStack>

            {/* 標題 */}
            <VStack align='flex-start' spacing='12px'>
              <Heading
                as='h2'
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                fontWeight='900'
                lineHeight='1.1'
              >
                週年慶大促銷
              </Heading>
              <Heading
                as='h3'
                fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                fontWeight='900'
                color='yellow.300'
                textShadow='0 2px 10px rgba(0,0,0,0.2)'
              >
                全館 5 折起
              </Heading>
            </VStack>

            {/* 描述 */}
            <Text
              fontSize={{ base: 'md', lg: 'lg' }}
              color='whiteAlpha.900'
              maxW='500px'
              lineHeight='1.8'
            >
              精選商品限時特價，全館滿千免運！
              會員專屬額外折扣，活動只到本週日！
            </Text>

            {/* CTA 按鈕 */}
            <HStack spacing='16px' pt='8px'>
              <Link href='/products?sale=true'>
                <Button
                  size='lg'
                  bg='white'
                  color='orange.500'
                  px='40px'
                  h='60px'
                  fontSize='md'
                  fontWeight='700'
                  rightIcon={<FiArrowRight />}
                  borderRadius='full'
                  boxShadow='0 8px 20px rgba(0,0,0,0.15)'
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 28px rgba(0,0,0,0.2)',
                    bg: 'gray.50',
                  }}
                  transition='all 0.3s'
                >
                  立即搶購
                </Button>
              </Link>
            </HStack>

            {/* 倒數計時 */}
            <Box pt='8px'>
              <HStack spacing='4px' mb='12px'>
                <Icon as={FiClock} boxSize='18px' />
                <Text fontSize='sm' fontWeight='600' opacity='0.9'>
                  活動倒數
                </Text>
              </HStack>
              <Flex gap='12px' flexWrap='wrap'>
                {[
                  { value: '02', label: '天' },
                  { value: '14', label: '時' },
                  { value: '32', label: '分' },
                  { value: '18', label: '秒' },
                ].map((time, index) => (
                  <Box
                    key={index}
                    bg='whiteAlpha.300'
                    backdropFilter='blur(10px)'
                    px='20px'
                    py='14px'
                    borderRadius='16px'
                    textAlign='center'
                    border='1px solid'
                    borderColor='whiteAlpha.400'
                    minW='70px'
                  >
                    <Text fontSize='3xl' fontWeight='900' lineHeight='1'>
                      {time.value}
                    </Text>
                    <Text fontSize='xs' mt='4px' opacity='0.9' fontWeight='600'>
                      {time.label}
                    </Text>
                  </Box>
                ))}
              </Flex>
            </Box>
          </Stack>

          {/* 右側圖片 */}
          <Box
            flex='1'
            position='relative'
            minH={{ base: '300px', lg: '500px' }}
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
            {/* 圖片上的漸層遮罩 */}
            <Box
              position='absolute'
              top='0'
              left='0'
              right='0'
              bottom='0'
              bgGradient='linear(to-r, rgba(251, 146, 60, 0.3), transparent)'
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
