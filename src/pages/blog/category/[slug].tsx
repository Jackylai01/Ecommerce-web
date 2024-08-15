import { Box, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react';
import Sidebar from '@components/Article/Sidebar'; // 側邊欄組件
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getArticlesListByCategoryAsync } from '@reducers/public/articles/actions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CategoryPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useAppDispatch();

  const {
    articlesCategory,
    status: { articlesListLoading },
  } = useAppSelector((state) => state.publicArticles);

  useEffect(() => {
    if (slug) {
      dispatch(getArticlesListByCategoryAsync(slug as any));
    }
  }, [slug, dispatch]);

  return (
    <LoadingLayout isLoading={articlesListLoading}>
      <Box p={8} display='flex' flexDirection={{ base: 'column', lg: 'row' }}>
        {/* 左側文章列表 */}
        <Box flex='1' pr={{ lg: 8 }}>
          <Heading as='h1' size='xl' mb={8}>
            分類: {slug}
          </Heading>
          {articlesCategory && articlesCategory.length > 0 ? (
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={8}>
              {articlesCategory.map((article: any) => (
                <Box
                  key={article._id}
                  bg='white'
                  borderRadius='lg'
                  overflow='hidden'
                  shadow='md'
                  _hover={{ shadow: 'lg' }}
                >
                  {article.coverImage?.imageUrl && (
                    <Image
                      src={article.coverImage.imageUrl}
                      alt={article.title}
                      maxHeight='200px'
                      width='100%'
                      objectFit='cover'
                    />
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
              ))}
            </SimpleGrid>
          ) : (
            <Text>該分類目前沒有文章。</Text>
          )}
        </Box>
        <Box w={{ base: '100%', lg: '30%' }} mt={{ base: 8, lg: 0 }}>
          <Sidebar />
        </Box>
      </Box>
    </LoadingLayout>
  );
};

export default CategoryPage;
