import {
  Box,
  Button,
  Heading,
  Icon,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import useAppSelector from '@hooks/useAppSelector';

import { Tag as TagIcon, TrendingUp } from 'lucide-react';
import React from 'react';

const Sidebar: React.FC = () => {
  const { trendingArticles, categories } = useAppSelector(
    (state) => state.publicArticles,
  );

  console.log(categories);
  return (
    <Stack spacing={8}>
      <Box bg='white' borderRadius='lg' shadow='md' p={6}>
        <Heading
          as='h3'
          size='md'
          mb={4}
          color='gray.800'
          display='flex'
          alignItems='center'
        >
          <Icon as={TrendingUp} boxSize={6} color='purple.600' mr={2} />
          熱門文章
        </Heading>
        <VStack spacing={4}>
          {trendingArticles?.map((post, index) => (
            <Box
              key={index}
              borderBottom='1px'
              borderColor='gray.200'
              pb={2}
              w='full'
              _last={{ borderBottom: 'none' }}
            >
              <Button
                as='a'
                href='#'
                variant='link'
                color='gray.700'
                _hover={{ color: 'purple.600' }}
                display='flex'
                alignItems='start'
              >
                <Text
                  fontSize='2xl'
                  fontWeight='bold'
                  color='purple.200'
                  mr={3}
                >
                  {index + 1}
                </Text>
                <Text>{post.title}</Text>
              </Button>
            </Box>
          ))}
        </VStack>
      </Box>
      <Box bg='white' borderRadius='lg' shadow='md' p={6}>
        <Heading
          as='h3'
          size='md'
          mb={4}
          color='gray.800'
          display='flex'
          alignItems='center'
        >
          <Icon as={TagIcon} boxSize={6} color='purple.600' mr={2} />
          文章分類
        </Heading>
        <VStack spacing={2} align='start'>
          {categories?.map((category, index) => (
            <Button
              key={index}
              as='a'
              href='#'
              variant='link'
              color='gray.600'
              _hover={{ color: 'purple.600' }}
              display='flex'
              alignItems='center'
            >
              <Text as='span' mr={2}>
                •
              </Text>
              {category.name}
            </Button>
          ))}
        </VStack>
      </Box>
    </Stack>
  );
};

export default Sidebar;
