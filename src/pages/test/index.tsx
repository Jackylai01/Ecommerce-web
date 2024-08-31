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
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { testImage } from '@fixtures/componentLibrary';
import { useState } from 'react';
import { FaFacebook, FaShoppingCart, FaYoutube } from 'react-icons/fa';

const categories = [
  {
    name: 'Online Store',
    image: testImage,
  },
  {
    name: 'Local Business',
    image: testImage,
  },
  { name: 'Portfolio', image: testImage },
  { name: 'Restaurant', image: testImage },
  { name: 'Services', image: testImage },
  {
    name: 'Personal & CV',
    image: testImage,
  },
  { name: 'Courses', image: testImage },
  { name: 'Memberships', image: testImage },
];

const DynamicCategoryShowcase = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const bg = useColorModeValue('gray.100', 'gray.900');

  // 控制不同屏幕大小時的寬度比例
  const boxWidth = useBreakpointValue({ base: '100%', md: '33%' });
  const imageBoxWidth = useBreakpointValue({ base: '100%', md: '67%' });
  const flexDirection =
    useBreakpointValue<'row' | 'column'>({ base: 'column', md: 'row' }) ||
    'row';

  return (
    <Flex
      height={{ base: 'auto', md: '100vh' }}
      bg={bg}
      p={8}
      flexDirection={flexDirection}
    >
      <Box
        width={boxWidth}
        bg='white'
        rounded={{ base: 'none', md: '3xl' }}
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
              <Text fontWeight='medium'>{category.name}</Text>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        width={imageBoxWidth}
        bg='white'
        rounded={{ base: 'none', md: '3xl' }}
        shadow='xl'
        overflow='hidden'
        mt={{ base: 4, md: 0 }}
      >
        <Box position='relative' height={{ base: 'auto', md: '67%' }}>
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
              bg='blackAlpha.800'
              _hover={{ opacity: 0.9 }}
              transition='opacity 0.3s'
            >
              Explore Now
            </Button>
            <Flex>
              <IconButton
                icon={<FaShoppingCart />}
                position='fixed'
                top={8}
                right={8}
                size='lg'
                color='gray.600'
                _hover={{ color: 'gray.800' }}
                cursor='pointer'
                aria-label='Shopping Cart'
              />
              <IconButton
                icon={<FaYoutube />}
                size='lg'
                color='gray.500'
                _hover={{ color: 'gray.700' }}
                cursor='pointer'
                aria-label='YouTube'
              />
              <IconButton
                icon={<FaFacebook />}
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
    </Flex>
  );
};

export default DynamicCategoryShowcase;
