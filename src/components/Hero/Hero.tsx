import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  VStack,
  Badge,
} from '@chakra-ui/react';
import { ArrowRight, ShoppingBag, Sparkles, Star } from 'lucide-react';
import NextImage from 'next/image';
import Link from 'next/link';

interface IHeroProps {
  heading: string;
  description: string;
  imageUrl: string;
  btnLabel: string;
  btnLink: string;
}

export const Hero = ({
  heading,
  description,
  imageUrl,
  btnLabel,
  btnLink,
}: IHeroProps) => {
  const bgGradient = useColorModeValue(
    'linear(135deg, blue.600 0%, purple.600 100%)',
    'linear(135deg, blue.800 0%, purple.800 100%)'
  );
  const textColor = useColorModeValue('white', 'gray.100');

  return (
    <Box
      bgGradient={bgGradient}
      color={textColor}
      position='relative'
      overflow='hidden'
      mb={8}
    >
      {/* 背景裝飾圖案 */}
      <Box
        position='absolute'
        top='0'
        left='0'
        right='0'
        bottom='0'
        opacity='0.1'
        bg='whiteAlpha.50'
      ></Box>

      <Container
        maxW='1400px'
        position='relative'
        py={{ base: 12, md: 20 }}
        px={{ base: 4, md: 8 }}
      >
        <Box
          display='grid'
          gridTemplateColumns={{ base: '1fr', lg: '1fr 1fr' }}
          gap={{ base: 8, lg: 12 }}
          alignItems='center'
        >
          {/* 左側內容 */}
          <VStack align='flex-start' spacing={6}>
            {/* 標籤徽章 */}
            <HStack
              spacing={2}
              bg='whiteAlpha.200'
              backdropFilter='blur(10px)'
              px={4}
              py={2}
              borderRadius='full'
            >
              <Icon as={Sparkles} boxSize={4} />
              <Text fontSize='sm' fontWeight='semibold' letterSpacing='wide'>
                精選商品系列
              </Text>
            </HStack>

            {/* 主標題 */}
            <Heading
              as='h1'
              fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
              fontWeight='extrabold'
              lineHeight='1.1'
              letterSpacing='tight'
            >
              {heading}
            </Heading>

            {/* 描述 */}
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              opacity='0.9'
              lineHeight='tall'
              maxW='600px'
            >
              {description}
            </Text>

            {/* 特色標籤 */}
            <HStack spacing={4} flexWrap='wrap'>
              <Badge
                colorScheme='yellow'
                px={3}
                py={2}
                borderRadius='full'
                fontSize='sm'
                display='flex'
                alignItems='center'
                gap={1}
              >
                <Icon as={Star} boxSize={3} fill='currentColor' />
                優質保證
              </Badge>
              <Badge
                bg='whiteAlpha.300'
                color='white'
                px={3}
                py={2}
                borderRadius='full'
                fontSize='sm'
              >
                免運費
              </Badge>
              <Badge
                bg='whiteAlpha.300'
                color='white'
                px={3}
                py={2}
                borderRadius='full'
                fontSize='sm'
              >
                快速配送
              </Badge>
            </HStack>

            {/* CTA 按鈕 */}
            <HStack spacing={4} pt={4}>
              <Link href={btnLink}>
                <a>
                  <Button
                    size='lg'
                    rightIcon={<Icon as={ArrowRight} />}
                    bg='white'
                    color='blue.600'
                    _hover={{
                      bg: 'gray.100',
                      transform: 'translateX(4px)',
                    }}
                    boxShadow='xl'
                    transition='all 0.3s'
                    fontWeight='bold'
                  >
                    {btnLabel}
                  </Button>
                </a>
              </Link>
              <Button
                size='lg'
                variant='outline'
                borderColor='whiteAlpha.500'
                color='white'
                leftIcon={<Icon as={ShoppingBag} />}
                _hover={{
                  bg: 'whiteAlpha.200',
                  borderColor: 'white',
                }}
                transition='all 0.3s'
              >
                立即購買
              </Button>
            </HStack>
          </VStack>

          {/* 右側圖片 */}
          <Box
            position='relative'
            height={{ base: '300px', md: '400px', lg: '500px' }}
            borderRadius='3xl'
            overflow='hidden'
            boxShadow='2xl'
            transform='perspective(1000px) rotateY(-5deg)'
            transition='all 0.3s'
            _hover={{
              transform: 'perspective(1000px) rotateY(0deg) scale(1.02)',
            }}
          >
            <NextImage
              src={imageUrl}
              alt={heading}
              layout='fill'
              objectFit='cover'
              priority
            />
            {/* 漸層遮罩 */}
            <Box
              position='absolute'
              bottom='0'
              left='0'
              right='0'
              height='40%'
              bgGradient='linear(to-t, blackAlpha.600, transparent)'
            ></Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
