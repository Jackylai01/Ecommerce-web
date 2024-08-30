import {
  Box,
  Container,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

import { getPublicNewsItemByIdAsync } from '@reducers/public/news/actions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const NewsDetail = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { newsItemDetails, status } = useAppSelector(
    (state) => state.publicNews,
  );

  useEffect(() => {
    if (id) {
      dispatch(getPublicNewsItemByIdAsync(id as string));
    }
  }, [id, dispatch]);

  if (status.getPublicNewsItemByIdLoading) {
    return <Text>加載中...</Text>;
  }

  if (!newsItemDetails) {
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
          {newsItemDetails.title}
        </Heading>
        <HStack spacing={2} mt={2} color='gray.600' fontSize='sm'>
          <Text>
            發布日期：{new Date(newsItemDetails.createdAt).toLocaleDateString()}
          </Text>
          <Text>|</Text>
          <Text>分類：{newsItemDetails.category?.name || '未分類'}</Text>
        </HStack>
      </Box>

      <VStack as='article' spacing={4} align='stretch'>
        <Text>{newsItemDetails.content}</Text>

        {newsItemDetails.coverImage?.imageUrl && (
          <Image
            src={newsItemDetails.coverImage.imageUrl}
            alt={newsItemDetails.title}
            borderRadius='md'
          />
        )}

        {newsItemDetails.blocks?.map((block: any, index: number) => (
          <Text key={index}>{block.content}</Text>
        ))}
      </VStack>
    </Container>
  );
};

export default NewsDetail;
