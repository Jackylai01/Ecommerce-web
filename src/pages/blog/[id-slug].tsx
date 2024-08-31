import { Box, Flex, Heading, HStack, Icon, Text } from '@chakra-ui/react';
import Sidebar from '@components/Article/Sidebar';
import LoadingLayout from '@components/Layout/LoadingLayout';
import {
  ArticleCategoryPublicResponse,
  ArticlePublicResponse,
} from '@models/responses/article.res';
import {
  apiGetArticleById,
  apiGetArticleCategories,
  apiGetTrendingArticles,
} from '@services/public/articles/public-articles';
import { BASE_API_URL } from '@services/shared/instance';
import { Calendar, User } from 'lucide-react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

interface ArticleDetailProps {
  article: ArticlePublicResponse;
  trendingArticles: ArticlePublicResponse[] | null;
  categories: ArticleCategoryPublicResponse[] | null;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({
  article,
  trendingArticles,
  categories,
}) => {
  const router = useRouter();

  // 结构化数据
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    author: {
      '@type': 'Person',
      name: article.author?.username || 'Unknown Author',
    },
    datePublished: article.createdAt,
    image: article.coverImage?.imageUrl,
    articleBody: article.content,
    url: `${BASE_API_URL}/${router.asPath}`,
  };

  const pageTitle = Array.isArray(article.title)
    ? article.title.join(' ')
    : article.title;

  return (
    <>
      <Head>
        <title>{`${pageTitle} - 詳細內容推薦`}</title>
        <meta name='description' content={article.excerpt || article.title} />
        <meta property='og:title' content={article.title} />
        <meta
          property='og:description'
          content={article.excerpt || article.title}
        />
        <meta property='og:image' content={article.coverImage?.imageUrl} />
        <meta property='og:url' content={`${BASE_API_URL}/${router.asPath}`} />
        <script type='application/ld+json'>
          {JSON.stringify(structuredData)}
        </script>
      </Head>

      <LoadingLayout isLoading={router.isFallback}>
        <Flex p={8} direction={{ base: 'column', lg: 'row' }}>
          <Box flex='2' pr={{ lg: 8 }}>
            <Heading as='h1' size='2xl' mb={4}>
              {article?.title}
            </Heading>
            <HStack color='gray.600' fontSize='sm' mb={4}>
              <Icon as={Calendar} boxSize={4} />
              <Text>{new Date(article?.createdAt).toLocaleDateString()}</Text>
              <Icon as={User} boxSize={4} ml={4} />
              <Text as='span'>
                {article?.author?.username || 'Unknown Author'}
              </Text>
            </HStack>

            {article?.blocks?.map((block: any, index: number) => (
              <Box key={index} mb={6}>
                {block.className === 'paragraph' &&
                  block.elements.map((element: any, elIndex: number) => (
                    <Box
                      key={elIndex}
                      dangerouslySetInnerHTML={{ __html: element.context }}
                      mb={4}
                    />
                  ))}

                {block.className === 'image-selectable' &&
                  block.elements.map((element: any, elIndex: number) => (
                    <Box
                      as='span'
                      mb={4}
                      borderRadius='md'
                      maxWidth='100%'
                      height='auto'
                      key={elIndex}
                    >
                      <Image
                        key={elIndex}
                        src={element.src}
                        alt={element.alt || 'Article Image'}
                        height='auto'
                        objectFit='cover'
                      />
                    </Box>
                  ))}
              </Box>
            ))}
          </Box>

          <Box flex='1' mt={{ base: 8, lg: 0 }}>
            <Sidebar
              trendingArticles={trendingArticles}
              categories={categories}
            />
          </Box>
        </Flex>
      </LoadingLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  // 檢查 params 是否包含正確的參數名稱
  if (!params || !params['id-slug']) {
    console.error('Missing params:', params);
    return {
      notFound: true,
    };
  }

  const fullPath = params['id-slug'] as string;
  const [id, slug] = fullPath.split('-');

  if (!id || !slug) {
    console.error('Invalid id or slug:', { id, slug });
    return {
      notFound: true,
    };
  }

  try {
    const articleResponse = await apiGetArticleById(
      `${encodeURIComponent(id)}-${encodeURIComponent(slug)}`,
    );
    const trendingResponse = await apiGetTrendingArticles();
    const categoriesResponse = await apiGetArticleCategories();

    if (!articleResponse || !articleResponse.result) {
      console.error('No article found for ID:', id);
      return {
        notFound: true,
      };
    }

    const article = articleResponse.result.data;
    const trendingArticles = trendingResponse.result.data || [];
    const categories = categoriesResponse.result.data || [];

    return {
      props: {
        article,
        trendingArticles,
        categories,
      },
    };
  } catch (error) {
    console.error('Error during SSR:', error);
    return {
      notFound: true,
    };
  }
};

export default ArticleDetail;
