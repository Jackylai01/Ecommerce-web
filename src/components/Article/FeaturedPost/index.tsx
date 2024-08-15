import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Tag,
  Text,
} from '@chakra-ui/react';
import useAppSelector from '@hooks/useAppSelector';
import { BookOpen, Calendar, Clock, User } from 'lucide-react';
import { useRouter } from 'next/router';
import React from 'react';

const FeaturedPost: React.FC = () => {
  const { trendingArticles } = useAppSelector((state) => state.publicArticles);
  const router = useRouter();

  if (!trendingArticles || trendingArticles.length === 0) return null;

  return (
    <SimpleGrid spacing={8}>
      {trendingArticles.map((post, index) => (
        <Box
          key={index}
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
              colorScheme='purple'
              variant='link'
              rightIcon={<Icon as={BookOpen} boxSize={4} />}
              onClick={() => router.push(`/blog/${post._id}-${post.slug}`)}
            >
              閱讀全文
            </Button>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default FeaturedPost;
