import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { Calendar, Clock, User } from 'lucide-react';
import React from 'react';

interface Post {
  title: string;
  date: string;
  author: string;
  tags: string[];
  readTime: number;
  excerpt: string;
}

interface BlogPostGridProps {
  posts: Post[];
}

const BlogPostGrid: React.FC<BlogPostGridProps> = ({ posts }) => (
  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
    {posts.map((post, index) => (
      <Box
        key={index}
        bg='white'
        borderRadius='lg'
        shadow='md'
        overflow='hidden'
        transition='0.3s'
        _hover={{ shadow: 'xl' }}
      >
        <Box p={6}>
          <Heading
            as='h3'
            size='md'
            mb={2}
            color='gray.800'
            _hover={{ color: 'purple.600' }}
            transition='0.3s'
          >
            {post.title}
          </Heading>
          <HStack color='gray.600' fontSize='xs' mb={3}>
            <Icon as={Calendar} boxSize={3.5} />
            <Text>{post.date}</Text>
            <Icon as={User} boxSize={3.5} ml={3} />
            <Text>{post.author}</Text>
          </HStack>
          <Text color='gray.700' mb={4} fontSize='sm'>
            {post.excerpt}
          </Text>
        </Box>
        <Flex bg='gray.50' px={6} py={3} justify='space-between' align='center'>
          <HStack color='gray.600' fontSize='xs'>
            <Icon as={Clock} boxSize={3.5} />
            <Text>{post.readTime} 分鐘閱讀</Text>
          </HStack>
          <Button as='a' href='#' colorScheme='purple' variant='link' size='sm'>
            閱讀更多
          </Button>
        </Flex>
      </Box>
    ))}
  </SimpleGrid>
);

export default BlogPostGrid;
