import {
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import { testImage } from '@fixtures/componentLibrary';
import { NewsItem } from '@models/responses/news';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const NewsItemCard = ({
  _id,
  title,
  createdAt,
  content,
  category,
  coverImage,
  featured,
}: NewsItem & { featured?: boolean }) => {
  return (
    <Box
      position='relative'
      overflow='hidden'
      gridColumn={featured ? { md: 'span 2' } : 'span 1'}
      gridRow={featured ? { md: 'span 2' } : 'span 1'}
      borderRadius='20px'
    >
      <Image
        src={coverImage?.imageUrl || testImage}
        alt={title}
        objectFit='cover'
        h='100%'
        w='100%'
        transition='transform 0.3s'
        _groupHover={{ transform: 'scale(1.05)' }}
      />
      <Box
        position='absolute'
        inset='0'
        bgGradient='linear(to-t, black, transparent)'
        opacity={0.7}
        _groupHover={{ opacity: 0.9 }}
        transition='opacity 0.3s'
      />
      <Box position='absolute' bottom='0' p={6} color='white'>
        <Badge bg='blue.500' px={3} py={1} mb={2} textTransform='uppercase'>
          {category?.name || '未分類'}
        </Badge>
        <Heading fontSize={featured ? '3xl' : 'xl'} mb={2} color='white'>
          {title}
        </Heading>
        <Text fontSize='sm' mb={4} noOfLines={featured ? 3 : 2} color='white'>
          {content}
        </Text>
        <Flex align='center' justify='space-between'>
          <Text fontSize='sm'>{new Date(createdAt).toLocaleDateString()}</Text>
          <Link href={`/news/${_id}`} passHref>
            <Button
              as='a'
              size='sm'
              colorScheme='blue'
              variant='link'
              rightIcon={<ArrowRight />}
              _hover={{ textDecoration: 'none', color: 'blue.300' }}
            >
              閱讀更多
            </Button>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};

interface NewsTabsProps {
  newsList: NewsItem[];
  categories: any[];
}

const NewsTabs: React.FC<NewsTabsProps> = ({ newsList, categories }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  // 確保 categories 是一個陣列
  const validCategories = Array.isArray(categories) ? categories : [];

  const filteredNews =
    activeCategory === 'all'
      ? newsList
      : newsList?.filter((item) => item.category === activeCategory);

  return (
    <LoadingLayout isLoading={false}>
      <Box bg='gray.100' minH='100vh' py={16}>
        <Box maxW='7xl' mx='auto' px={4}>
          <Box position='relative' mb={16} textAlign='center'>
            <Heading
              as='h1'
              fontSize='5xl'
              fontWeight='bold'
              color='gray.800'
              mb={2}
            >
              最新消息
            </Heading>
            <Divider
              width='24'
              borderColor='blue.500'
              borderWidth='2px'
              mx='auto'
              mt={4}
            />
          </Box>
          <Flex justify='center' mb={12} gap={4}>
            <Button
              key='all'
              onClick={() => setActiveCategory('all')}
              borderRadius='full'
              px={6}
              py={2}
              size='sm'
              fontWeight='medium'
              colorScheme={activeCategory === 'all' ? 'blue' : 'gray'}
              variant={activeCategory === 'all' ? 'solid' : 'outline'}
            >
              全部
            </Button>
            {validCategories.map((category) => (
              <Button
                key={category._id}
                onClick={() => setActiveCategory(category._id)}
                borderRadius='full'
                px={6}
                py={2}
                size='sm'
                fontWeight='medium'
                colorScheme={activeCategory === category._id ? 'blue' : 'gray'}
                variant={activeCategory === category._id ? 'solid' : 'outline'}
              >
                {category.name}
              </Button>
            ))}
          </Flex>
          <Grid
            templateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            }}
            gap={6}
          >
            {filteredNews?.map((item, index) => (
              <NewsItemCard key={item._id} {...item} featured={index === 0} />
            ))}
          </Grid>
          {filteredNews?.length === 0 && (
            <Center
              mt={8}
              bg='white'
              borderLeft='4px'
              borderColor='blue.500'
              p={4}
              color='blue.700'
            >
              <Stack spacing={2} align='center'>
                <Text fontWeight='bold'>無相關新聞</Text>
                <Text>目前沒有符合所選類別的新聞。請嘗試選擇其他類別。</Text>
              </Stack>
            </Center>
          )}
        </Box>
      </Box>
    </LoadingLayout>
  );
};

export default NewsTabs;
