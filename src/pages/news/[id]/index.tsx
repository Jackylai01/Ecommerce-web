import {
  Box,
  Container,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { NewsItem } from '@models/responses/news';
import { apiGetPublicNewsItemById } from '@services/public/news/news';
import { GetServerSideProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface NewsDetailProps {
  newsItem: NewsItem;
}

const NewsDetail: NextPage<NewsDetailProps> = ({ newsItem }) => {
  if (!newsItem) {
    return <Text>找不到該新聞內容。</Text>;
  }

  return (
    <Container maxW='1200px' py='20px'>
      <Box
        as='header'
        borderBottom='1px solid'
        borderColor='gray.200'
        pb='10px'
        mb='20px'
      >
        <Heading as='h1' size='xl' color='gray.800'>
          {newsItem.title}
        </Heading>
        <HStack spacing={2} mt={2} color='gray.600' fontSize='sm'>
          <Text>
            發布日期：{new Date(newsItem.createdAt).toLocaleDateString()}
          </Text>
          <Text>|</Text>
          <Text>分類：{newsItem.category?.name || '未分類'}</Text>
        </HStack>
      </Box>

      <VStack as='article' spacing={4} align='stretch'>
        <Text>{newsItem.content}</Text>

        {newsItem.coverImage?.imageUrl && (
          <Image
            src={newsItem.coverImage.imageUrl}
            alt={newsItem.title}
            borderRadius='md'
          />
        )}

        {newsItem.blocks?.map((block: any, index: number) => (
          <Text key={index}>{block.content}</Text>
        ))}
      </VStack>
    </Container>
  );
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<
  NewsDetailProps,
  Params
> = async (context) => {
  const { params } = context;

  if (!params || !params.id) {
    return {
      notFound: true,
    };
  }

  try {
    const newsResponse = await apiGetPublicNewsItemById(params.id);

    return {
      props: {
        newsItem: newsResponse.result.data,
      },
    };
  } catch (error) {
    console.error('Error fetching news item:', error);
    return {
      notFound: true,
    };
  }
};

export default NewsDetail;
