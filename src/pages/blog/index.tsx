import { Box, Flex, Heading } from '@chakra-ui/react';
import BlogPostGrid from '@components/Article/BlogPostGrid';
import FeaturedPost from '@components/Article/FeaturedPost';
import Header from '@components/Article/Header';
import Newsletter from '@components/Article/Newsletter';
import Sidebar from '@components/Article/Sidebar';
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  getArticleCategoriesAsync,
  getArticlesListAsync,
  getTrendingArticlesAsync,
} from '@reducers/public/articles/actions';
import React, { useEffect } from 'react';

const BlogHomepage: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    status: {
      articlesListLoading,
      trendingArticlesLoading,
      categoriesListLoading,
    },
  } = useAppSelector((state) => state.publicArticles);

  useEffect(() => {
    dispatch(getArticlesListAsync({ page: 1, limit: 10 }));
    dispatch(getTrendingArticlesAsync());
    dispatch(getArticleCategoriesAsync());
  }, [dispatch]);

  return (
    <LoadingLayout isLoading={trendingArticlesLoading || categoriesListLoading}>
      <Box minH='100vh' p='5rem'>
        <Header />
        <Box w='100%' py={12}>
          <Box mb={12}>
            <FeaturedPost />
          </Box>
          <Flex direction={{ base: 'column', lg: 'row' }}>
            <Box flex={{ base: '1', lg: '2' }} mr={{ lg: 8 }}>
              <Heading as='h2' size='xl' mb={8} color='gray.800'>
                最新文章
              </Heading>
              <BlogPostGrid />
            </Box>
            <Box flex={{ base: '1', lg: '1' }} mt={{ base: 8, lg: 0 }}>
              <Sidebar />
            </Box>
          </Flex>
          <Box mt={16}>
            <Newsletter />
          </Box>
        </Box>
      </Box>
    </LoadingLayout>
  );
};

export default BlogHomepage;
