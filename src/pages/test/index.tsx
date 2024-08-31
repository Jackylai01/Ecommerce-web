import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaShoppingCart,
  FaYoutube,
} from 'react-icons/fa';

const categories = [
  {
    name: 'Online Store',
    image: '/api/placeholder/800/600',
    color: 'blue.500',
  },
  {
    name: 'Local Business',
    image: '/api/placeholder/800/600',
    color: 'green.500',
  },
  { name: 'Portfolio', image: '/api/placeholder/800/600', color: 'purple.500' },
  { name: 'Restaurant', image: '/api/placeholder/800/600', color: 'red.500' },
  { name: 'Services', image: '/api/placeholder/800/600', color: 'yellow.500' },
  {
    name: 'Personal & CV',
    image: '/api/placeholder/800/600',
    color: 'pink.500',
  },
  { name: 'Courses', image: '/api/placeholder/800/600', color: 'indigo.500' },
  { name: 'Memberships', image: '/api/placeholder/800/600', color: 'teal.500' },
];

const DynamicCategoryShowcase = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const bg = useColorModeValue('gray.100', 'gray.900');

  return (
    <Flex height='100vh' bg={bg} p={8}>
      <Box
        width='33%'
        bg='white'
        roundedLeft='3xl'
        shadow='xl'
        overflow='hidden'
      >
        <Box p={6} bgGradient='linear(to-r, gray.800, gray.900)'>
          <Heading as='h2' size='xl' mb={4} color='white'>
            Klipsan
          </Heading>
          <Text color='gray.300' mb={4}>
            Explore our categories
          </Text>
        </Box>
        <List py={4}>
          {categories.map((category) => (
            <ListItem
              key={category.name}
              display='flex'
              alignItems='center'
              py={3}
              px={6}
              cursor='pointer'
              transition='all 0.3s'
              bg={
                activeCategory.name === category.name
                  ? category.color
                  : 'transparent'
              }
              color={
                activeCategory.name === category.name ? 'white' : 'gray.800'
              }
              _hover={{
                bg:
                  activeCategory.name === category.name
                    ? undefined
                    : 'gray.100',
              }}
              onMouseEnter={() => setActiveCategory(category)}
            >
              <ChevronRightIcon
                mr={3}
                transition='transform 0.3s'
                transform={
                  activeCategory.name === category.name
                    ? 'rotate(90deg)'
                    : undefined
                }
              />
              <Text fontWeight='medium'>{category.name}</Text>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        width='67%'
        bg='white'
        roundedRight='3xl'
        shadow='xl'
        overflow='hidden'
      >
        <Box position='relative' height='67%'>
          <Image
            src={activeCategory.image}
            alt={activeCategory.name}
            objectFit='cover'
            width='100%'
            height='100%'
          />
          <Box
            position='absolute'
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg={activeCategory.color}
            opacity={0.6}
          />
          <Flex
            position='absolute'
            top={0}
            left={0}
            right={0}
            bottom={0}
            align='center'
            justify='center'
          >
            <Heading
              as='h2'
              size='2xl'
              color='white'
              textAlign='center'
              textShadow='2px 2px #000'
            >
              {activeCategory.name}
            </Heading>
          </Flex>
        </Box>
        <Box p={8}>
          <Text fontSize='xl' color='gray.600' mb={6}>
            Discover amazing {activeCategory.name.toLowerCase()} solutions
            tailored just for you.
          </Text>
          <Flex justify='space-between' align='center'>
            <Button
              px={8}
              py={3}
              rounded='full'
              color='white'
              fontWeight='semibold'
              bg={activeCategory.color}
              _hover={{ opacity: 0.9 }}
              transition='opacity 0.3s'
            >
              Explore Now
            </Button>
            <Flex>
              <IconButton
                as={FaInstagram}
                size='lg'
                color='gray.500'
                _hover={{ color: 'gray.700' }}
                cursor='pointer'
                aria-label='Instagram'
              />
              <IconButton
                as={FaYoutube}
                size='lg'
                color='gray.500'
                _hover={{ color: 'gray.700' }}
                cursor='pointer'
                aria-label='YouTube'
              />
              <IconButton
                as={FaFacebook}
                size='lg'
                color='gray.500'
                _hover={{ color: 'gray.700' }}
                cursor='pointer'
                aria-label='Facebook'
              />
            </Flex>
          </Flex>
        </Box>
      </Box>
      <IconButton
        as={FaShoppingCart}
        position='fixed'
        top={8}
        right={8}
        size='lg'
        color='gray.600'
        _hover={{ color: 'gray.800' }}
        cursor='pointer'
        aria-label='Shopping Cart'
      />
    </Flex>
  );
};

export default DynamicCategoryShowcase;
