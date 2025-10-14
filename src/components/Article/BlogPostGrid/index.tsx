import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Tag,
  Text,
  VStack,
  useColorModeValue,
  AspectRatio,
} from '@chakra-ui/react';
import Pagination from '@components/Pagination';
import { Metadata } from '@models/entities/shared/pagination';
import { ArticlePublicResponse } from '@models/responses/article.res';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

interface BlogPostGridProps {
  articles: ArticlePublicResponse[];
  metadata: Metadata | null;
}

const BlogPostGrid: React.FC<BlogPostGridProps> = ({ articles, metadata }) => {
  const router = useRouter();

  // 顏色主題
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  if (!articles || articles.length === 0) {
    return (
      <Box
        textAlign='center'
        py={16}
        px={6}
        bg={cardBg}
        borderRadius='2xl'
        border='1px'
        borderColor={borderColor}
      >
        <Text color={mutedColor} fontSize='lg'>
          目前沒有文章
        </Text>
      </Box>
    );
  }

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
    <VStack spacing={8} align='stretch'>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        {articles.map((post, index) => (
          <Box
            key={index}
            bg={cardBg}
            borderRadius='2xl'
            overflow='hidden'
            border='1px'
            borderColor={borderColor}
            transition='all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            _hover={{
              transform: 'translateY(-8px)',
              boxShadow: '2xl',
              borderColor: 'blue.400',
            }}
            cursor='pointer'
            onClick={() => router.push(`/blog/${post._id}-${post.slug}`)}
            display='flex'
            flexDirection='column'
            h='100%'
          >
            {/* 封面圖片 */}
            {post.coverImage?.imageUrl && (
              <AspectRatio ratio={16 / 9} w='100%'>
                <Box position='relative' overflow='hidden'>
                  <Image
                    src={post.coverImage.imageUrl}
                    alt={post.title}
                    layout='fill'
                    objectFit='cover'
                    style={{
                      transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                  {/* 分類標籤 */}
                  {post.category && (
                    <Tag
                      position='absolute'
                      top={4}
                      left={4}
                      colorScheme='blue'
                      size='sm'
                      borderRadius='full'
                      fontWeight='semibold'
                      textTransform='uppercase'
                      fontSize='xs'
                      letterSpacing='wide'
                      backdropFilter='blur(10px)'
                      bg='whiteAlpha.900'
                      color='blue.600'
                    >
                      {post.category}
                    </Tag>
                  )}
                </Box>
              </AspectRatio>
            )}

            {/* 內容區域 */}
            <VStack
              align='stretch'
              spacing={4}
              p={6}
              flex='1'
              justify='space-between'
            >
              <VStack align='stretch' spacing={3}>
                {/* 標題 */}
                <Heading
                  as='h3'
                  fontSize={{ base: 'xl', md: '2xl' }}
                  fontWeight='bold'
                  color={textColor}
                  lineHeight='shorter'
                  noOfLines={2}
                  _hover={{ color: 'blue.600' }}
                  transition='color 0.2s'
                >
                  {post.title}
                </Heading>

                {/* 元數據 */}
                <HStack
                  spacing={4}
                  color={mutedColor}
                  fontSize='sm'
                  divider={<Text>•</Text>}
                >
                  <HStack spacing={1}>
                    <Icon as={Calendar} boxSize={3.5} />
                    <Text>
                      {new Date(post.createdAt).toLocaleDateString('zh-TW', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </Text>
                  </HStack>
                  <HStack spacing={1}>
                    <Icon as={Clock} boxSize={3.5} />
                    <Text>{calculateReadingTime(post)} 分鐘</Text>
                  </HStack>
                </HStack>

                {/* 摘要 */}
                {post.excerpt && (
                  <Text
                    color={mutedColor}
                    fontSize='md'
                    lineHeight='tall'
                    noOfLines={3}
                  >
                    {post.excerpt}
                  </Text>
                )}
              </VStack>

              {/* 底部作者資訊與閱讀按鈕 */}
              <Flex justify='space-between' align='center' pt={4}>
                <HStack spacing={3}>
                  {post.author?.profileImage?.imageUrl && (
                    <Box
                      borderRadius='full'
                      overflow='hidden'
                      w={8}
                      h={8}
                      position='relative'
                    >
                      <Image
                        src={post.author.profileImage.imageUrl}
                        alt={post.author.username}
                        layout='fill'
                        objectFit='cover'
                      />
                    </Box>
                  )}
                  <Text fontSize='sm' fontWeight='medium' color={textColor}>
                    {post.author?.username || 'Unknown'}
                  </Text>
                </HStack>

                <HStack
                  spacing={2}
                  color='blue.600'
                  fontWeight='semibold'
                  fontSize='sm'
                  _hover={{ color: 'blue.700' }}
                  transition='color 0.2s'
                >
                  <Text>閱讀更多</Text>
                  <Icon as={ArrowRight} boxSize={4} />
                </HStack>
              </Flex>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>

      {/* 分頁 */}
      {metadata && (
        <Box pt={8}>
          <Pagination metadata={metadata} />
        </Box>
      )}
    </VStack>
  );
};

export default BlogPostGrid;
