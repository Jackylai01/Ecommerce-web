import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Tag,
  Text,
} from '@chakra-ui/react';
import useAppSelector from '@hooks/useAppSelector';

import { BookOpen, Calendar, Clock, User } from 'lucide-react';
import React from 'react';

const FeaturedPost: React.FC = () => {
  const { trendingArticles } = useAppSelector((state) => state.publicArticles);

  if (!trendingArticles || trendingArticles.length === 0) return null;

  const post = trendingArticles[0];

  return (
    <Box
      bg='white'
      borderRadius='lg'
      shadow='lg'
      overflow='hidden'
      transition='0.3s'
      _hover={{ shadow: 'xl' }}
    >
      <Box p={6}>
        <Heading
          as='h2'
          size='lg'
          mb={3}
          color='gray.800'
          _hover={{ color: 'purple.600' }}
          transition='0.3s'
        >
          {post.title}
        </Heading>
        <HStack color='gray.600' fontSize='sm' mb={4}>
          <Icon as={Calendar} boxSize={4} />
          <Text>{post.date}</Text>
          <Icon as={User} boxSize={4} ml={4} />
          <Text>{post.author?.username}</Text>
          <Icon as={Clock} boxSize={4} ml={4} />
          <Text>{post.readTime} 分鐘閱讀</Text>
        </HStack>
        <Text color='gray.700' mb={4} fontSize='lg'>
          {post.excerpt}
        </Text>
        <Flex wrap='wrap' mb={4}>
          {post.tags.map((tag, index) => (
            <Tag
              key={index}
              bg='purple.100'
              color='purple.800'
              fontSize='sm'
              fontWeight='semibold'
              mr={2}
              mb={2}
              px={3}
              py={1}
            >
              {tag}
            </Tag>
          ))}
        </Flex>
      </Box>
      <Box bg='purple.50' px={6} py={4}>
        <Button
          as='a'
          href='#'
          colorScheme='purple'
          variant='link'
          rightIcon={<Icon as={BookOpen} boxSize={4} />}
        >
          閱讀全文
        </Button>
      </Box>
    </Box>
  );
};

export default FeaturedPost;
