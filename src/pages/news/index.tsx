import { Box } from '@chakra-ui/react';
import NewsTabs from '@components/News';

import { NewsItem } from '@models/responses/news';
import {
  apiGetAllPublicNews,
  apiGetAllPublicNewsCategories,
} from '@services/public/news/news';
import { GetServerSideProps, NextPage } from 'next';

interface NewsPagesProps {
  newsList: NewsItem[];
  categories: any[];
}

const NewsPages: NextPage<NewsPagesProps> = ({ newsList, categories }) => {
  return (
    <Box>
      <NewsTabs newsList={newsList} categories={categories} />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const newsResponse = await apiGetAllPublicNews({ page: 1, limit: 10 });
    const categoriesResponse = await apiGetAllPublicNewsCategories();

    return {
      props: {
        newsList: newsResponse.result.data,
        categories: categoriesResponse.result.data || [],
      },
    };
  } catch (error) {
    console.error('Error fetching news data:', error);
    return {
      notFound: true,
    };
  }
};
export default NewsPages;
