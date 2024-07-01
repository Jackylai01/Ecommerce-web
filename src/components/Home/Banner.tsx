'use client';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';

// bg = 'center / cover no-repeat url(/banner-img1.jpg)';

export const Banner = () => {
  return (
    <Box minH='600px' w='100%'>
      <Flex
        justify='center'
        align='center'
        gap='2'
        flexDir={{ base: 'column', lg: 'row' }}
        w='100%'
        mx='auto'
        p='2rem'
        maxW={{ base: '100%', lg: '90%' }}
      >
        <Box
          w={{ base: '100%', md: '80%', lg: '50%' }}
          textAlign={{ base: 'center', lg: 'left' }}
        >
          <Heading
            size={{ base: 'xl', lg: '3xl' }}
            lineHeight='4rem'
            color='brand.primary'
          >
            Online Shopping <br /> Made Easy
          </Heading>
          <Text
            fontSize={{ base: 'md', lg: 'lg' }}
            py='1rem'
            maxW='600px'
            color='black'
            mx='auto'
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            autem voluptatem iure illo optio obcaecati accusantium fugiat
            dolores tenetur
          </Text>
          <Link href='/products'>
            <Button
              borderRadius='50px'
              minW='10rem'
              bgColor='black'
              color='white'
              _hover={{ bgColor: 'gray.700' }}
              mx='auto'
            >
              Shop Now
            </Button>
          </Link>
        </Box>
        <Box
          w={{ base: '100%', md: '80%', lg: '50%' }}
          display='flex'
          justifyContent='center'
        >
          <Box
            my='2rem'
            w={{ base: '300px', lg: '600px' }}
            h={{ base: '300px', lg: '500px' }}
            bg='center / cover no-repeat url(mockup.svg)'
          />
        </Box>
      </Flex>
    </Box>
  );
};
