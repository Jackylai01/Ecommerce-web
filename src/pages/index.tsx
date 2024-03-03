import { Box, Button, Flex } from '@chakra-ui/react';
import Carousel from '@components/Carousel';
import Focus from '@components/Focus';
import type { NextPage } from 'next';
import { MdPlace } from 'react-icons/md';

const HomePage: NextPage = () => {
  const slides = [
    '/images/demo-img.png',
    '/images/demo-img.png',
    '/images/demo-img.png',
  ];

  return (
    <>
      <Box>
        <Focus />
        <Flex w='100%' flexDirection={{ base: 'column', md: 'row' }}>
          <Box
            w={{ base: '100%', md: '50%' }}
            p='2rem'
            boxShadow='0 4px 8px rgba(0, 0, 0, 0.1), 4px 0 8px rgba(0, 0, 0, 0.1)'
          >
            <Box
              as='h1'
              fontSize={{ base: '32px', md: '68px' }}
              p='1rem 0rem'
              fontWeight='bold'
            >
              故事地圖說明
            </Box>
            <Box as='p' p='0.5rem 0rem'>
              地點: <span>宜蘭縣寒溪村 </span>
            </Box>
            <Box as='p' p='0.5rem 0rem'>
              時間: <span>2024/03/22 </span>
            </Box>
            <Box as='p' p='0.5rem 0rem'>
              經度:<span>124.36.5555</span>
            </Box>
            <Box as='p' p='0.5rem 0rem'>
              緯度:<span>24.5555</span>
            </Box>
            <Box as='p' p='0.5rem 0rem'>
              說明:
            </Box>
            <Box as='p'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
              praesentium accusantium dolorem saepe, cumque provident blanditiis
              repellat eos vero molestias optio alias deleniti, magni nulla
              magnam! Iste ipsa adipisci cum.
            </Box>
            <Flex
              w='100%'
              justifyContent='space-between'
              alignItems='center'
              as='span'
              flexDirection='row'
              p='1rem'
            >
              <Button
                borderRadius='20px'
                bg='#F4AD5E'
                color='white'
                _hover={{}}
              >
                探索更多
              </Button>
              <Flex
                as='b'
                alignItems='center'
                flexDirection='row'
                cursor='point'
              >
                <MdPlace />
                <Box>查看位置</Box>
              </Flex>
            </Flex>
          </Box>
          <Box w={{ base: '100%', md: '50%' }} p='2rem'>
            <Carousel width='100%' interval={3000} slides={slides} />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default HomePage;
