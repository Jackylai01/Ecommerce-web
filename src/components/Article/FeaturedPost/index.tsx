import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Tag,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { ArticlePublicResponse } from '@models/responses/article.res';
import { Calendar, Clock, ArrowRight, Flame, Star } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

interface FeaturedPostProps {
  trendingArticles: ArticlePublicResponse[] | null;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ trendingArticles }) => {
  const router = useRouter();

  // 顏色主題
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const gradientOverlay = useColorModeValue(
    'linear(to-t, blackAlpha.800, transparent)',
    'linear(to-t, blackAlpha.900, transparent)'
  );

  if (!trendingArticles || trendingArticles.length === 0) return null;

  // 主要精選文章
  const mainPost = trendingArticles[0];
  // 次要精選文章
  const secondaryPosts = trendingArticles.slice(1, 4);

  // 計算閱讀時間
  const calculateReadingTime = (post: ArticlePublicResponse) => {
    const textContent = post?.blocks
      ?.filter((block: any) => block.className === 'paragraph')
      .map((block: any) =>
        block.elements?.map((el: any) => el.context).join('')
      )
      .join('');
    const wordCount = textContent?.replace(/<[^>]*>/g, '').length || 0;
    return Math.ceil(wordCount / 200) || 5;
  };

  return (
    <Grid
      templateColumns={{ base: '1fr', lg: '2fr 1fr' }}
      gap={6}
      w='100%'
    >
      {/* 主要精選文章 - 大卡片 */}
      <Box
        position='relative'
        borderRadius='3xl'
        overflow='hidden'
        h={{ base: '500px', md: '600px' }}
        cursor='pointer'
        onClick={() =>
          router.push(`/blog/${mainPost._id}-${mainPost.slug}`)
        }
        transition='all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        _hover={{
          transform: 'scale(1.02)',
          boxShadow: '2xl',
        }}
        border='1px'
        borderColor={borderColor}
      >
        {/* 背景圖片 */}
        {mainPost.coverImage?.imageUrl && (
          <Box position='absolute' top={0} left={0} right={0} bottom={0}>
            <Image
              src={mainPost.coverImage.imageUrl}
              alt={mainPost.title}
              layout='fill'
              objectFit='cover'
              priority
            />
          </Box>
        )}

        {/* 漸層遮罩 */}
        <Box
          position='absolute'
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient={gradientOverlay}
        />

        {/* 內容 */}
        <Flex
          position='relative'
          h='100%'
          direction='column'
          justify='space-between'
          p={{ base: 6, md: 8 }}
          color='white'
        >
          {/* 頂部標籤 */}
          <Flex justify='space-between' align='start'>
            <HStack spacing={3}>
              <Badge
                colorScheme='red'
                fontSize='sm'
                px={3}
                py={1}
                borderRadius='full'
                display='flex'
                alignItems='center'
                gap={1}
              >
                <Icon as={Flame} boxSize={3} />
                熱門
              </Badge>
              {mainPost.category && (
                <Badge
                  bg='whiteAlpha.300'
                  backdropFilter='blur(10px)'
                  color='white'
                  fontSize='xs'
                  px={3}
                  py={1}
                  borderRadius='full'
                  textTransform='uppercase'
                  letterSpacing='wide'
                  fontWeight='bold'
                >
                  {mainPost.category.name}
                </Badge>
              )}
            </HStack>
          </Flex>

          {/* 底部內容 */}
          <VStack align='stretch' spacing={4}>
            <Heading
              as='h2'
              fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
              fontWeight='extrabold'
              lineHeight='shorter'
              textShadow='0 2px 4px rgba(0,0,0,0.3)'
            >
              {mainPost.title}
            </Heading>

            {mainPost.excerpt && (
              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                noOfLines={2}
                textShadow='0 1px 2px rgba(0,0,0,0.3)'
              >
                {mainPost.excerpt}
              </Text>
            )}

            <Flex
              justify='space-between'
              align='center'
              flexWrap='wrap'
              gap={4}
            >
              <HStack spacing={4} divider={<Text>•</Text>}>
                <HStack spacing={1}>
                  <Icon as={Calendar} boxSize={4} />
                  <Text fontSize='sm'>
                    {new Date(mainPost.createdAt).toLocaleDateString(
                      'zh-TW',
                      {
                        month: 'short',
                        day: 'numeric',
                      }
                    )}
                  </Text>
                </HStack>
                <HStack spacing={1}>
                  <Icon as={Clock} boxSize={4} />
                  <Text fontSize='sm'>
                    {calculateReadingTime(mainPost)} 分鐘閱讀
                  </Text>
                </HStack>
              </HStack>

              <Button
                rightIcon={<Icon as={ArrowRight} />}
                colorScheme='whiteAlpha'
                bg='whiteAlpha.300'
                backdropFilter='blur(10px)'
                _hover={{
                  bg: 'whiteAlpha.400',
                  transform: 'translateX(4px)',
                }}
                transition='all 0.2s'
                size='md'
              >
                閱讀全文
              </Button>
            </Flex>
          </VStack>
        </Flex>
      </Box>

      {/* 次要精選文章列表 */}
      <VStack spacing={4} align='stretch'>
        {secondaryPosts.map((post, index) => (
          <Box
            key={index}
            bg={cardBg}
            borderRadius='2xl'
            overflow='hidden'
            border='1px'
            borderColor={borderColor}
            transition='all 0.3s ease'
            _hover={{
              transform: 'translateX(8px)',
              boxShadow: 'lg',
              borderColor: 'blue.400',
            }}
            cursor='pointer'
            onClick={() => router.push(`/blog/${post._id}-${post.slug}`)}
          >
            <Flex h='100%'>
              {/* 圖片 */}
              {post.coverImage?.imageUrl && (
                <AspectRatio ratio={1} w='120px' flexShrink={0}>
                  <Box position='relative'>
                    <Image
                      src={post.coverImage.imageUrl}
                      alt={post.title}
                      layout='fill'
                      objectFit='cover'
                    />
                  </Box>
                </AspectRatio>
              )}

              {/* 內容 */}
              <VStack
                align='stretch'
                spacing={2}
                p={4}
                flex={1}
                justify='center'
              >
                <HStack spacing={2}>
                  <Icon
                    as={Star}
                    boxSize={3}
                    color='yellow.500'
                    fill='yellow.500'
                  />
                  <Text
                    fontSize='xs'
                    color={mutedColor}
                    fontWeight='semibold'
                  >
                    精選 #{index + 2}
                  </Text>
                </HStack>

                <Heading
                  as='h3'
                  fontSize='md'
                  fontWeight='bold'
                  color={textColor}
                  noOfLines={2}
                  lineHeight='shorter'
                >
                  {post.title}
                </Heading>

                <HStack
                  spacing={2}
                  color={mutedColor}
                  fontSize='xs'
                  divider={<Text>•</Text>}
                >
                  <Text>
                    {new Date(post.createdAt).toLocaleDateString('zh-TW', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Text>
                  <Text>{calculateReadingTime(post)} 分鐘</Text>
                </HStack>
              </VStack>
            </Flex>
          </Box>
        ))}
      </VStack>
    </Grid>
  );
};

export default FeaturedPost;
