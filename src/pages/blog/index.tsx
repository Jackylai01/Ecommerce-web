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
import { TrendingUp } from 'lucide-react';
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
  const accentColor = useColorModeValue('orange.500', 'orange.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <>
      <Head>
        <title>時尚誌 - 最新穿搭靈感與購物指南</title>
        <meta
          name='description'
          content='探索最新時尚趨勢、穿搭技巧、商品評測與購物指南，讓您掌握最新流行資訊'
        />
        <meta property='og:title' content='時尚誌 - 最新穿搭靈感與購物指南' />
        <meta
          property='og:description'
          content='探索最新時尚趨勢、穿搭技巧、商品評測與購物指南'
        />
      </Head>

      <Box bgGradient={bgGradient} minH='100vh'>
        {/* Main Content */}
        <Container maxW='1400px' px={{ base: 4, md: 8 }} py={{ base: 8, md: 12 }}>
          {/* 頁面標題和搜尋 */}
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify='space-between'
            align={{ base: 'flex-start', md: 'flex-end' }}
            gap={6}
            mb={12}
            pb={8}
            borderBottom='1px solid'
            borderColor={borderColor}
          >
            <VStack align='flex-start' spacing={3}>
              <Heading
                as='h1'
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                fontWeight='900'
                bgGradient='linear(to-r, orange.400, pink.400)'
                bgClip='text'
                lineHeight='1.1'
              >
                時尚生活誌
              </Heading>
              <Text fontSize='md' color={mutedColor} fontWeight='500'>
                穿搭靈感 · 商品評測 · 購物指南 · 時尚趨勢
              </Text>
            </VStack>
            <Box w={{ base: '100%', md: 'auto' }} minW={{ md: '350px' }}>
              <Header />
            </Box>
          </Flex>

          {/* Featured Posts Section */}
          {trendingArticles && trendingArticles.length > 0 && (
            <Box mb={16}>
              <HStack spacing={3} mb={8}>
                <Icon as={TrendingUp} boxSize={6} color={accentColor} />
                <Heading
                  as='h2'
                  fontSize={{ base: '2xl', md: '3xl' }}
                  fontWeight='900'
                  color={textColor}
                >
                  本週熱門文章
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
                    fontWeight='900'
                    color={textColor}
                    mb={2}
                  >
                    最新文章
                  </Heading>
                  <Text color={mutedColor} fontSize='md'>
                    探索最新時尚資訊與穿搭技巧
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
