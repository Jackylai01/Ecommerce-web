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
import Pagination from '@components/Pagination';
import { Metadata } from '@models/entities/shared/pagination';
import { ArticlePublicResponse } from '@models/responses/article.res';
import { Calendar, User } from 'lucide-react';
import { useRouter } from 'next/router';
import React from 'react';

interface BlogPostGridProps {
  articles: ArticlePublicResponse[];
  metadata: Metadata | null;
}

const BlogPostGrid: React.FC<BlogPostGridProps> = ({ articles, metadata }) => {
  const router = useRouter();

  if (!articles || articles.length === 0) return null;

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
      {articles.map((post, index) => (
        <Box
          key={index}
          bg='white'
          borderRadius='lg'
          shadow='md'
          overflow='hidden'
          transition='0.3s'
          _hover={{ shadow: 'xl' }}
          display='flex'
          flexDirection='column'
        >
          <Box p={6} flex='1'>
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
              <Text>{post.author?.username}</Text>
            </HStack>
            <Text color='gray.700' mb={4} fontSize='sm'>
              {post.excerpt}
            </Text>
          </Box>
          <Flex
            bg='gray.50'
            px={6}
            py={3}
            justify='space-between'
            align='center'
          >
            <Button
              as='a'
              href='#'
              colorScheme='purple'
              variant='link'
              size='sm'
              onClick={() => router.push(`/blog/${post._id}-${post.slug}`)}
            >
              閱讀更多
            </Button>
          </Flex>
        </Box>
      ))}
      {metadata && <Pagination metadata={metadata} />}
    </SimpleGrid>
  );
};

export default BlogPostGrid;
