import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Divider,
  HStack,
  Icon,
} from '@chakra-ui/react';
import BlogPostGrid from '@components/Article/BlogPostGrid';
import FeaturedPost from '@components/Article/FeaturedPost';
import Header from '@components/Article/Header';
import Sidebar from '@components/Article/Sidebar';
import { Metadata } from '@models/entities/shared/pagination';
import {
  ArticleCategoryPublicResponse,
  ArticlePublicResponse,
} from '@models/responses/article.res';
import {
  apiGetArticleCategories,
  apiGetArticles,
  apiGetTrendingArticles,
} from '@services/public/articles/public-articles';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { TrendingUp, Sparkles } from 'lucide-react';
import React from 'react';

interface BlogHomepageProps {
  articles: ArticlePublicResponse[];
  metadata: Metadata | null;
  trendingArticles: ArticlePublicResponse[] | null;
  categories: ArticleCategoryPublicResponse[] | null;
}

const BlogHomepage: React.FC<BlogHomepageProps> = ({
  articles,
  metadata,
  trendingArticles,
  categories,
}) => {
  // 顏色主題
  const bgGradient = useColorModeValue(
    'linear(to-b, gray.50, white)',
    'linear(to-b, gray.900, gray.800)'
  );
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const accentColor = useColorModeValue('blue.600', 'blue.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <>
      <Head>
        <title>部落格 - 最新文章與精選內容</title>
        <meta
          name='description'
          content='探索我們的部落格，獲取最新資訊、深度見解和精選內容'
        />
        <meta property='og:title' content='部落格 - 最新文章與精選內容' />
        <meta
          property='og:description'
          content='探索我們的部落格，獲取最新資訊、深度見解和精選內容'
        />
      </Head>

      <Box bgGradient={bgGradient} minH='100vh'>
        {/* Hero Section */}
        <Box
          bgGradient='linear(135deg, blue.600 0%, purple.600 100%)'
          color='white'
          py={{ base: 16, md: 24 }}
          position='relative'
          overflow='hidden'
        >
          <Box
            position='absolute'
            top='0'
            left='0'
            right='0'
            bottom='0'
            opacity='0.1'
            bg='whiteAlpha.50'
          ></Box>
          <Container maxW='1400px' position='relative'>
            <VStack spacing={6} textAlign='center' maxW='800px' mx='auto'>
              <HStack
                spacing={2}
                bg='whiteAlpha.200'
                backdropFilter='blur(10px)'
                px={4}
                py={2}
                borderRadius='full'
              >
                <Icon as={Sparkles} boxSize={4} />
                <Text fontSize='sm' fontWeight='semibold' letterSpacing='wide'>
                  探索精彩內容
                </Text>
              </HStack>
              <Heading
                as='h1'
                fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                fontWeight='extrabold'
                lineHeight='1.1'
                letterSpacing='tight'
              >
                發現靈感
                <br />
                <Text
                  as='span'
                  bgGradient='linear(to-r, yellow.300, pink.300)'
                  bgClip='text'
                >
                  分享知識
                </Text>
              </Heading>
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                maxW='600px'
                opacity='0.9'
                lineHeight='tall'
              >
                深入了解產業趨勢、專業見解與實用技巧，讓您在資訊時代保持領先
              </Text>
            </VStack>
          </Container>
        </Box>

        {/* Header Component */}
        <Box bg={useColorModeValue('white', 'gray.800')} boxShadow='sm'>
          <Container maxW='1400px'>
            <Header />
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxW='1400px' px={{ base: 4, md: 8 }} py={{ base: 8, md: 12 }}>
          {/* Featured Posts Section */}
          {trendingArticles && trendingArticles.length > 0 && (
            <Box mb={16}>
              <HStack spacing={3} mb={8}>
                <Icon as={TrendingUp} boxSize={6} color={accentColor} />
                <Heading
                  as='h2'
                  fontSize={{ base: '2xl', md: '3xl' }}
                  fontWeight='bold'
                  color={textColor}
                >
                  精選文章
                </Heading>
              </HStack>
              <FeaturedPost trendingArticles={trendingArticles} />
            </Box>
          )}

          <Divider borderColor={borderColor} my={12} />

          {/* Latest Articles Section */}
          <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
            {/* Articles Grid */}
            <Box flex='2'>
              <VStack align='stretch' spacing={8}>
                <Box>
                  <Heading
                    as='h2'
                    fontSize={{ base: '2xl', md: '3xl' }}
                    fontWeight='bold'
                    color={textColor}
                    mb={2}
                  >
                    最新文章
                  </Heading>
                  <Text color={mutedColor} fontSize='md'>
                    探索我們最新發布的內容與深度分析
                  </Text>
                </Box>
                <BlogPostGrid articles={articles} metadata={metadata} />
              </VStack>
            </Box>

            {/* Sidebar */}
            <Box flex='1' mt={{ base: 8, lg: 0 }}>
              <Box position='sticky' top='100px'>
                <Sidebar
                  trendingArticles={trendingArticles}
                  categories={categories}
                />
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const page = query.page ? parseInt(query.page as string) : 1;
  const limit = query.limit ? parseInt(query.limit as string) : 10;
  const search = query.search || '';

  const articlesResponse = await apiGetArticles({ page, limit, search });
  const trendingResponse = await apiGetTrendingArticles();
  const categoriesResponse = await apiGetArticleCategories();

  const { data: articles, metadata } = articlesResponse.result;
  const { data: trendingArticles } = trendingResponse.result;
  const { data: categories } = categoriesResponse.result;

  return {
    props: {
      articles,
      metadata: metadata || null,
      trendingArticles: Array.isArray(trendingArticles) ? trendingArticles : [],
      categories: Array.isArray(categories) ? categories : [],
    },
  };
};

export default BlogHomepage;
