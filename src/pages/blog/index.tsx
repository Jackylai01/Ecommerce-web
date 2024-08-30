import { Box, Flex, Heading, useBreakpointValue } from '@chakra-ui/react';
import BlogPostGrid from '@components/Article/BlogPostGrid';
import FeaturedPost from '@components/Article/FeaturedPost';
import Header from '@components/Article/Header';
import Newsletter from '@components/Article/Newsletter';
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
  const padding = useBreakpointValue({ base: '0.5rem', lg: '5rem' });

  return (
    <Box minH='100vh' p={padding}>
      <Header />
      <Box w='100%' py={12}>
        <Box mb={12}>
          <FeaturedPost trendingArticles={trendingArticles} />
        </Box>
        <Flex direction={{ base: 'column', lg: 'row' }}>
          <Box flex={{ base: '1', lg: '2' }} mr={{ lg: 8 }}>
            <Heading as='h2' size='xl' mb={8} color='gray.800'>
              最新文章
            </Heading>
            <BlogPostGrid articles={articles} metadata={metadata} />
          </Box>
          <Box flex={{ base: '1', lg: '1' }} mt={{ base: 8, lg: 0 }}>
            <Sidebar
              trendingArticles={trendingArticles}
              categories={categories}
            />
          </Box>
        </Flex>
        <Box mt={16}>
          <Newsletter />
        </Box>
      </Box>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const articlesResponse = await apiGetArticles({ page: 1, limit: 10 });
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
