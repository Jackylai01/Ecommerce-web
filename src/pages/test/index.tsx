import { Box, Button, Image, Text } from '@chakra-ui/react';
import { Sparkles, Zap } from 'lucide-react';
import { useState } from 'react';

const CreativeHero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box className='CreativeHero__container'>
      <Box className='CreativeHero__images'>
        <Image
          src='https://res.cloudinary.com/dqawkwte9/image/upload/v1723651086/y032jutfmvihknejgg9p.jpg'
          alt='Abstract 1'
          className='CreativeHero__images-image CreativeHero__images-image--first'
        />
        <Image
          src='https://res.cloudinary.com/dqawkwte9/image/upload/v1723651086/y032jutfmvihknejgg9p.jpg'
          alt='Abstract 2'
          className='CreativeHero__images-image CreativeHero__images-image--second'
        />
        <Image
          src='https://res.cloudinary.com/dqawkwte9/image/upload/v1723651086/y032jutfmvihknejgg9p.jpg'
          alt='Abstract 3'
          className='CreativeHero__images-image CreativeHero__images-image--third'
        />
        <Box className='CreativeHero__images__overlay' />
      </Box>
      <Box className='CreativeHero__content'>
        <Zap className='CreativeHero__zap-icon' />
        <Text className='CreativeHero__content-title'>創新視界，無限可能</Text>
        <Text className='CreativeHero__content-subtitle'>
          我們融合藝術與科技，打造前所未有的數字體驗。讓我們一同探索未來！
        </Text>
        <Box
          className='CreativeHero__button-container'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Button className='CreativeHero__button'>
            開始探索
            <Sparkles className='CreativeHero__sparkles-icon' />
          </Button>
          {isHovered && <Box className='CreativeHero__hover-effect' />}
        </Box>
      </Box>
    </Box>
  );
};

export default CreativeHero;
