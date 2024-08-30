import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';

import Sidebar from '@components/Article/Sidebar';
import LoadingLayout from '@components/Layout/LoadingLayout';
import {
  ArticleCategoryPublicResponse,
  ArticlePublicResponse,
} from '@models/responses/article.res';
import {
  apiGetArticleCategories,
  apiGetArticlesByCategory,
  apiGetTrendingArticles,
} from '@services/public/articles/public-articles';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CategoryPageProps {
  articlesCategory: ArticlePublicResponse[];
  slug: string;
  trendingArticles: ArticlePublicResponse[] | null;
  categories: ArticleCategoryPublicResponse[] | null;
}

const CategoryPage: React.FC<CategoryPageProps> = ({
  articlesCategory,
  slug,
  trendingArticles,
  categories,
}) => {
  return (
    <LoadingLayout isLoading={false}>
      <Box p={8} display='flex' flexDirection={{ base: 'column', lg: 'row' }}>
        {/* 左側文章列表 */}
        <Box flex='1' pr={{ lg: 8 }}>
          <Heading as='h1' size='xl' mb={8}>
            分類: {slug}
          </Heading>
          {articlesCategory && articlesCategory.length > 0 ? (
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={8}>
              {articlesCategory.map((article) => (
                <Link
                  key={article._id}
                  href={`/blog/${article._id}-${article.slug}`}
                  passHref
                >
                  <Box
                    as='a'
                    bg='white'
                    borderRadius='lg'
                    overflow='hidden'
                    shadow='md'
                    _hover={{ shadow: 'lg' }}
                  >
                    {article.coverImage?.imageUrl && (
                      <Box maxHeight='200px' width='100%'>
                        <Image
                          src={article.coverImage.imageUrl}
                          alt={article.title}
                          objectFit='cover'
                        />
                      </Box>
                    )}

                    <Box p={6}>
                      <Heading as='h2' size='md' mb={2}>
                        {article.title}
                      </Heading>
                      <Text fontSize='sm' color='gray.600' noOfLines={2}>
                        {article.excerpt}
                      </Text>
                    </Box>
                  </Box>
                </Link>
              ))}
            </SimpleGrid>
          ) : (
            <Text>該分類目前沒有文章。</Text>
          )}
        </Box>
        {/* 右側側邊欄 */}
        <Box w={{ base: '100%', lg: '30%' }} mt={{ base: 8, lg: 0 }}>
          <Sidebar
            trendingArticles={trendingArticles}
            categories={categories}
          />
        </Box>
      </Box>
    </LoadingLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const slug = params?.slug as string;

  const articlesResponse = await apiGetArticlesByCategory(slug, {
    page: 1,
    limit: 10,
  });
  const trendingResponse = await apiGetTrendingArticles();
  const categoriesResponse = await apiGetArticleCategories();

  const articlesCategory = articlesResponse.result.data || [];
  const trendingArticles = trendingResponse.result || [];
  const categories = categoriesResponse.result || [];

  return {
    props: {
      articlesCategory,
      slug,
      trendingArticles,
      categories,
    },
  };
};

export default CategoryPage;
