import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';

const products = [
  {
    id: 1,
    name: '高級耳機',
    description: '優質音質，舒適佩戴',
    originalPrice: 1000,
    discountedPrice: 800,
    imageUrl: '/api/placeholder/300/200',
    badge: '限量50件',
    savings: 200,
  },
  {
    id: 2,
    name: '智能手錶',
    description: '24小時健康監測',
    originalPrice: 1500,
    discountedPrice: 1200,
    imageUrl: '/api/placeholder/300/200',
    badge: '限量30件',
    savings: 300,
  },
  {
    id: 3,
    name: '便攜式充電器',
    description: '大容量，快速充電',
    originalPrice: 500,
    discountedPrice: 400,
    imageUrl: '/api/placeholder/300/200',
    badge: '限量100件',
    savings: 100,
  },
];

const ProductsUpsellSection = () => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const productWidth = 330; // 300px width + 30px margin

  const moveCarousel = (direction: number) => {
    const maxPosition = -(products.length - 3) * productWidth;
    let newPosition = currentPosition + direction * productWidth;
    newPosition = Math.max(Math.min(newPosition, 0), maxPosition);
    setCurrentPosition(newPosition);
  };

  return (
    <Box bg='white' p='3rem 0' boxShadow='0 0 20px rgba(0, 0, 0, 0.1)'>
      <Box maxW='1200px' mx='auto' px='1rem'>
        <Heading
          as='h2'
          fontSize='2.2rem'
          textAlign='center'
          mb='2rem'
          color='#2c3e50'
          fontWeight='300'
        >
          限時精選加購優惠
        </Heading>
        <Box position='relative' overflow='hidden' py='2rem'>
          <Button
            position='absolute'
            top='50%'
            left='10px'
            transform='translateY(-50%)'
            bg='rgba(52, 152, 219, 0.7)'
            color='white'
            fontSize='1.5rem'
            p='1rem'
            zIndex={10}
            onClick={() => moveCarousel(1)}
            _hover={{ bg: 'rgba(52, 152, 219, 1)' }}
          >
            &lt;
          </Button>
          <Button
            position='absolute'
            top='50%'
            right='10px'
            transform='translateY(-50%)'
            bg='rgba(52, 152, 219, 0.7)'
            color='white'
            fontSize='1.5rem'
            p='1rem'
            zIndex={10}
            onClick={() => moveCarousel(-1)}
            _hover={{ bg: 'rgba(52, 152, 219, 1)' }}
          >
            &gt;
          </Button>
          <Flex
            transition='transform 0.5s ease'
            style={{ transform: `translateX(${currentPosition}px)` }}
          >
            {products.map((product) => (
              <Box
                key={product.id}
                flex='0 0 300px'
                bg='white'
                borderRadius='12px'
                boxShadow='0 8px 15px rgba(0, 0, 0, 0.1)'
                overflow='hidden'
                transition='all 0.3s ease'
                mx='15px'
                _hover={{
                  transform: 'translateY(-10px)',
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                }}
              >
                <Box position='relative' h='200px' overflow='hidden'>
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    objectFit='cover'
                    w='100%'
                    h='100%'
                    transition='transform 0.3s ease'
                    _hover={{ transform: 'scale(1.1)' }}
                  />
                  <Text
                    position='absolute'
                    top='10px'
                    right='10px'
                    bg='#e74c3c'
                    color='white'
                    p='0.25rem 0.75rem'
                    borderRadius='20px'
                    fontSize='0.8rem'
                    fontWeight='bold'
                    boxShadow='0 2px 5px rgba(0, 0, 0, 0.2)'
                  >
                    {product.badge}
                  </Text>
                </Box>
                <Box p='1.5rem'>
                  <Text fontSize='1.3rem' mb='0.5rem' color='#2c3e50'>
                    {product.name}
                  </Text>
                  <Text fontSize='0.9rem' color='#7f8c8d' mb='1rem'>
                    {product.description}
                  </Text>
                  <Flex justify='space-between' align='center' mb='0.5rem'>
                    <Text
                      fontSize='0.9rem'
                      color='#95a5a6'
                      textDecoration='line-through'
                    >
                      原價：${product.originalPrice}
                    </Text>
                    <Text fontSize='1.2rem' color='#27ae60' fontWeight='bold'>
                      特價：${product.discountedPrice}
                    </Text>
                  </Flex>
                  <Text fontSize='0.9rem' color='#e74c3c' mb='1rem'>
                    節省 ${product.savings}
                  </Text>
                  <Button
                    w='100%'
                    py='0.75rem'
                    bg='#3498db'
                    color='white'
                    borderRadius='25px'
                    fontSize='1rem'
                    textTransform='uppercase'
                    letterSpacing='1px'
                    _hover={{ bg: '#2980b9' }}
                  >
                    加入購物車
                  </Button>
                </Box>
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductsUpsellSection;
