import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Button, Image } from '@chakra-ui/react';

const EcommerceHero = () => {
  return (
    <Box as='article' className='ecommerce-hero__container'>
      <Box as='main' className='ecommerce-hero__content'>
        <Box as='h2' className='ecommerce-hero__title-small'>
          2024秋季系列
        </Box>
        <Box as='h1' className='ecommerce-hero__title-large'>
          優雅主義
          <br />
          重新定義
        </Box>
        <Box as='p' className='ecommerce-hero__description'>
          探索我們的全新秋季系列，融合經典與現代，為您的衣櫥注入無與倫比的時尚魅力。
        </Box>
        <Button className='ecommerce-hero__button'>
          立即探索
          <ChevronRightIcon className='ml-2' />
        </Button>
      </Box>
      {/* 右側圖片與設計區 */}
      <Box as='section' className='ecommerce-hero__right-section'>
        {/* 主要圖片 */}
        <Image
          src='/api/placeholder/800/1200'
          alt='秋季時尚'
          className='ecommerce-hero__main-image'
        />

        {/* 疊加的小圖 */}
        <Image
          src='/api/placeholder/400/600'
          alt='秋季配飾'
          className='ecommerce-hero__overlay-image'
        />

        {/* 幾何裝飾元素 */}
        <Box className='ecommerce-hero__decorative-square'></Box>
        <Box className='ecommerce-hero__decorative-rectangle'></Box>

        {/* 文字元素 */}
        <Box as='span' className='ecommerce-hero__text-section'>
          <Box as='h3' className='ecommerce-hero__text-title'>
            秋季精選
          </Box>
          <Box as='p' className='ecommerce-hero__text-subtitle'>
            質感與風格的完美融合
          </Box>
        </Box>
      </Box>

      {/* 促銷訊息 */}
      <Box as='span' className='ecommerce-hero__promo'>
        <Box className='ecommerce-hero__promo-title'>新品上市</Box>
        <Box className='ecommerce-hero__promo-subtitle'>全場8折起</Box>
      </Box>
    </Box>
  );
};

export default EcommerceHero;
