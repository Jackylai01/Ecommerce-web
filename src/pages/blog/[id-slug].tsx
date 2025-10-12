import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Tag,
  Text,
  VStack,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
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
import { Calendar, Clock, User, Share2, Bookmark } from 'lucide-react';
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

  // 顏色主題
  const bgGradient = useColorModeValue(
    'linear(to-b, gray.50, white)',
    'linear(to-b, gray.900, gray.800)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const accentColor = useColorModeValue('blue.600', 'blue.400');

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

  // 計算閱讀時間（假設每分鐘閱讀 200 字）
  const calculateReadingTime = () => {
    const textContent = article?.blocks
      ?.filter((block: any) => block.className === 'paragraph')
      .map((block: any) =>
        block.elements.map((el: any) => el.context).join('')
      )
      .join('');
    const wordCount = textContent?.replace(/<[^>]*>/g, '').length || 0;
    return Math.ceil(wordCount / 200);
  };

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
        <Box bgGradient={bgGradient} minH='100vh' py={{ base: 4, md: 8 }}>
          <Container maxW='1400px' px={{ base: 4, md: 8 }}>
            {/* 文章標題區域 */}
            <Box mb={8}>
              <VStack spacing={6} align='stretch'>
                {/* 分類標籤 */}
                {article?.category && (
                  <HStack>
                    <Tag
                      size='lg'
                      colorScheme='blue'
                      borderRadius='full'
                      px={4}
                      py={2}
                      fontWeight='semibold'
                      textTransform='uppercase'
                      letterSpacing='wide'
                      fontSize='xs'
                    >
                      {article.category.name}
                    </Tag>
                  </HStack>
                )}

                {/* 標題 */}
                <Heading
                  as='h1'
                  fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                  fontWeight='bold'
                  lineHeight='1.2'
                  color={textColor}
                  letterSpacing='tight'
                >
                  {article?.title}
                </Heading>

                {/* 摘要 */}
                {article?.excerpt && (
                  <Text
                    fontSize={{ base: 'lg', md: 'xl' }}
                    color={mutedColor}
                    lineHeight='tall'
                  >
                    {article.excerpt}
                  </Text>
                )}

                {/* 作者資訊與元數據 */}
                <Flex
                  justify='space-between'
                  align='center'
                  flexWrap='wrap'
                  gap={4}
                  pt={4}
                >
                  <HStack spacing={4}>
                    <Avatar
                      size='md'
                      name={article?.author?.username || 'Unknown Author'}
                      src={article?.author?.profileImage?.imageUrl}
                    />
                    <VStack align='start' spacing={0}>
                      <Text fontWeight='semibold' color={textColor}>
                        {article?.author?.username || 'Unknown Author'}
                      </Text>
                      <HStack
                        spacing={4}
                        color={mutedColor}
                        fontSize='sm'
                        divider={<Text>•</Text>}
                      >
                        <HStack spacing={1}>
                          <Icon as={Calendar} boxSize={3.5} />
                          <Text>
                            {new Date(article?.createdAt).toLocaleDateString(
                              'zh-TW',
                              {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              }
                            )}
                          </Text>
                        </HStack>
                        <HStack spacing={1}>
                          <Icon as={Clock} boxSize={3.5} />
                          <Text>{calculateReadingTime()} 分鐘閱讀</Text>
                        </HStack>
                      </HStack>
                    </VStack>
                  </HStack>

                  {/* 互動按鈕 */}
                  <HStack spacing={3}>
                    <Box
                      as='button'
                      p={2}
                      borderRadius='lg'
                      border='1px'
                      borderColor={borderColor}
                      bg={cardBg}
                      _hover={{ bg: 'gray.50', transform: 'translateY(-2px)' }}
                      transition='all 0.2s'
                    >
                      <Icon as={Share2} boxSize={5} color={mutedColor} />
                    </Box>
                    <Box
                      as='button'
                      p={2}
                      borderRadius='lg'
                      border='1px'
                      borderColor={borderColor}
                      bg={cardBg}
                      _hover={{ bg: 'gray.50', transform: 'translateY(-2px)' }}
                      transition='all 0.2s'
                    >
                      <Icon as={Bookmark} boxSize={5} color={mutedColor} />
                    </Box>
                  </HStack>
                </Flex>
              </VStack>
            </Box>

            <Divider borderColor={borderColor} mb={8} />

            {/* 主要內容區域 */}
            <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
              {/* 文章內容 */}
              <Box flex='2'>
                <Box
                  bg={cardBg}
                  borderRadius='2xl'
                  overflow='hidden'
                  boxShadow='xl'
                  border='1px'
                  borderColor={borderColor}
                >
                  {/* 封面圖片 */}
                  {article?.coverImage?.imageUrl && (
                    <Box
                      position='relative'
                      w='100%'
                      h={{ base: '250px', md: '400px', lg: '500px' }}
                      overflow='hidden'
                    >
                      <Image
                        src={article.coverImage.imageUrl}
                        alt={article.title}
                        layout='fill'
                        objectFit='cover'
                        priority
                      />
                    </Box>
                  )}

                  {/* 文章內容 */}
                  <Box p={{ base: 6, md: 10 }}>
                    <VStack spacing={6} align='stretch'>
                      {article?.blocks?.map((block: any, index: number) => (
                        <Box key={index}>
                          {block.className === 'paragraph' &&
                            block.elements.map(
                              (element: any, elIndex: number) => (
                                <Box
                                  key={elIndex}
                                  dangerouslySetInnerHTML={{
                                    __html: element.context,
                                  }}
                                  fontSize={{ base: 'md', md: 'lg' }}
                                  lineHeight='tall'
                                  color={textColor}
                                  sx={{
                                    p: { mb: 4 },
                                    'strong, b': {
                                      fontWeight: 'bold',
                                      color: accentColor,
                                    },
                                    'a': {
                                      color: accentColor,
                                      textDecoration: 'underline',
                                      _hover: { opacity: 0.8 },
                                    },
                                    'h2, h3, h4': {
                                      fontWeight: 'bold',
                                      mt: 6,
                                      mb: 3,
                                    },
                                    'ul, ol': {
                                      pl: 6,
                                      mb: 4,
                                    },
                                    'li': {
                                      mb: 2,
                                    },
                                    'blockquote': {
                                      borderLeft: '4px solid',
                                      borderColor: accentColor,
                                      pl: 4,
                                      py: 2,
                                      fontStyle: 'italic',
                                      bg: 'gray.50',
                                      borderRadius: 'md',
                                    },
                                  }}
                                />
                              )
                            )}

                          {block.className === 'image-selectable' &&
                            block.elements.map(
                              (element: any, elIndex: number) => (
                                <Box
                                  key={elIndex}
                                  position='relative'
                                  w='100%'
                                  borderRadius='xl'
                                  overflow='hidden'
                                  my={8}
                                  boxShadow='lg'
                                >
                                  <Image
                                    src={element.src}
                                    alt={element.alt || 'Article Image'}
                                    width={1200}
                                    height={675}
                                    layout='responsive'
                                    objectFit='cover'
                                  />
                                </Box>
                              )
                            )}
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                </Box>
              </Box>

              {/* 側邊欄 */}
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
