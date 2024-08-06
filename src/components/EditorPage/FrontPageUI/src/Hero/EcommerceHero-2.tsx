import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Flag, ShoppingBag, Zap } from 'lucide-react';
import { FC } from 'react';
import '../styles/components/_sales-hero.scss';

const SalesHero: FC = () => {
  return (
    <Box className='sales-hero__container'>
      {/* 左側內容區 */}
      <Box className='sales-hero__left'>
        <Heading as='h1' className='sales-hero__title'>
          电商活动KV设计
        </Heading>
        <Heading as='h2' className='sales-hero__subtitle'>
          助力电商视觉设计拔高
        </Heading>
        <Text className='sales-hero__text'>高端活动KV全案解析</Text>
        <Text className='sales-hero__text'>完整的商业案例全流程制作</Text>
        <Button className='sales-hero__button'>开始学习</Button>
      </Box>

      {/* 右側圖片與設計區 */}
      <Box className='sales-hero__right'>
        <Box className='sales-hero__background'></Box>
        <Flex className='sales-hero__content'>
          <Box textAlign='center'>
            <ShoppingBag size={64} className='sales-hero__icon' />
            <Text className='sales-hero__icon-text'>3D 电商场景</Text>
          </Box>
        </Flex>
        {/* 其他元素 */}
        <Box className='sales-hero__zap'>
          <Zap size={24} className='text-yellow-500' />
        </Box>
        <Box className='sales-hero__flag'>
          <Flag size={24} className='text-red-500' />
        </Box>
      </Box>
    </Box>
  );
};

export default SalesHero;
