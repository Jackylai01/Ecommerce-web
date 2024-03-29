'use client';
import { Box, Button, Card, Heading, Image, Text } from '@chakra-ui/react';
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
  return (
    <Card
      direction={{ base: 'column', md: 'row' }}
      align='center'
      justify='space-between'
      overflow='hidden'
      variant='outline'
      w={{ base: '100%', lg: '90%' }}
      mx='auto'
      shadow='sm'
      p='2rem'
      mb='2rem'
      bg='red.200'
    >
      <Box mx='2rem' w={{ base: '100%', md: '50%' }}>
        <Heading size='2xl' color='white'>
          {heading}
        </Heading>
        <Text py='1rem'>{description}</Text>
        <Link href={btnLink}>
          <Button
            variant='outline'
            bg='white'
            color='black'
            _hover={{ bg: 'gray.300' }}
          >
            {btnLabel}
          </Button>
        </Link>
      </Box>
      <Box mx='2rem' w={{ base: '100%', md: '50%' }} mt='1rem'>
        <Image
          src={imageUrl}
          alt={heading}
          objectFit='cover'
          maxW={{ base: '100%' }}
          rounded='md'
        />
      </Box>
    </Card>
  );
};
