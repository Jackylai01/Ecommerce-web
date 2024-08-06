import { ArrowRightIcon, StarIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { FC } from 'react';
import '../styles/components/_fashion-hero.scss';

const FashionHero: FC = () => {
  return (
    <Box className='fashion-hero__container'>
      {/* 背景圖片和漸變 */}
      <Box className='fashion-hero__background'>
        <Image
          src='/api/placeholder/1920/1080'
          alt='時尚背景'
          className='fashion-hero__background-img'
        />
        <Box className='fashion-hero__background-gradient'></Box>
      </Box>

      {/* 主要內容區 */}
      <Box className='fashion-hero__content'>
        {/* 頂部導航區 */}
        <Flex className='fashion-hero__nav'>
          <Text className='fashion-hero__logo'>LOGO</Text>
          <Flex className='fashion-hero__nav-items'>
            <Text mx='3'>新品</Text>
            <Text mx='3'>熱賣</Text>
            <Text mx='3'>關於我們</Text>
          </Flex>
        </Flex>

        {/* 中間主要內容 */}
        <Flex className='fashion-hero__main'>
          <Box className='fashion-hero__main-text'>
            <Heading as='h1' size='2xl' className='fashion-hero__heading'>
              秋冬
              <br />
              新風尚
            </Heading>
            <Text className='fashion-hero__subheading'>
              探索我們的2024秋冬系列，體驗前所未有的時尚魅力。每一件單品都是精心打造的藝術品。
            </Text>
            <Button className='fashion-hero__button'>
              立即選購
              <ArrowRightIcon className='ml-2' />
            </Button>
          </Box>

          {/* 右側產品展示 */}
          <Box className='fashion-hero__product'>
            <Image
              src='/api/placeholder/500/700'
              alt='秋冬新品'
              className='fashion-hero__product-img'
            />
            <Flex align='center' className='fashion-hero__rating'>
              <StarIcon className='fashion-hero__rating-icon' />
              <Text className='fashion-hero__rating-score'>4.9</Text>
              <Text className='fashion-hero__rating-text' ml='2'>
                (3000+ 評價)
              </Text>
            </Flex>
          </Box>
        </Flex>

        {/* 底部資訊 */}
        <Flex className='fashion-hero__footer'>
          <Box>
            <Text className='fashion-hero__footer-discount'>30% OFF</Text>
            <Text className='fashion-hero__footer-info'>全場新品限時優惠</Text>
          </Box>
          <Box textAlign='right' className='fashion-hero__footer-inspiration'>
            <Text className='fashion-hero__footer-inspiration-text'>
              靈感來源
            </Text>
            <Text className='fashion-hero__footer-inspiration-source'>
              巴黎時裝周
            </Text>
          </Box>
        </Flex>
      </Box>

      {/* 裝飾元素 */}
      <Box className='fashion-hero__decor-circle'></Box>
      <Box className='fashion-hero__decor-square'></Box>
    </Box>
  );
};

export default FashionHero;
