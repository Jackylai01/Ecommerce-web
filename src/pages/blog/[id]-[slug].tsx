import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
} from '@chakra-ui/react';
import Sidebar from '@components/Article/Sidebar'; // 導入側邊欄
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getArticleByIdAsync } from '@reducers/public/articles/actions';
import { Calendar, User } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ArticleDetail: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    article,
    status: { articleDetailLoading },
  } = useAppSelector((state) => state.publicArticles);

  useEffect(() => {
    if (!router.isReady) return;

    const fullPath = router.query['id]-[slug'];
    if (typeof fullPath === 'string') {
      const [id, slug] = fullPath.split('-');
      if (id && slug) {
        dispatch(getArticleByIdAsync(`${id}-${slug}`));
      }
    }
  }, [router.isReady, router.query, dispatch]);

  return (
    <LoadingLayout isLoading={articleDetailLoading}>
      <Flex p={8} direction={{ base: 'column', lg: 'row' }}>
        {/* 左側內容 */}
        <Box flex='2' pr={{ lg: 8 }}>
          <Heading as='h1' size='2xl' mb={4}>
            {article?.title}
          </Heading>
          <HStack color='gray.600' fontSize='sm' mb={4}>
            <Icon as={Calendar} boxSize={4} />
            <Text>{new Date(article?.createdAt).toLocaleDateString()}</Text>
            <Icon as={User} boxSize={4} ml={4} />
            <Text>{article?.author?.username || 'Unknown Author'}</Text>
          </HStack>

          {/* 顯示 Blocks 內的內容 */}
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
                  <Image
                    key={elIndex}
                    src={element.src}
                    alt='Article Image'
                    mb={4}
                    borderRadius='md'
                    maxWidth='100%'
                    height='auto'
                    objectFit='cover'
                  />
                ))}
            </Box>
          ))}
        </Box>

        <Box flex='1' mt={{ base: 8, lg: 0 }}>
          <Sidebar />
        </Box>
      </Flex>
    </LoadingLayout>
  );
};

export default ArticleDetail;
