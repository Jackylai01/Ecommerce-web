import { Box } from '@chakra-ui/react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

const News = dynamic(() => import('@components/News'), { ssr: false });

const NewsPages: NextPage = () => {
  return (
    <Box>
      <News />
    </Box>
  );
};

export default NewsPages;
