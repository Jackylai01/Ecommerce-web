import { Box, Flex, Heading } from '@chakra-ui/react';
import BlogPostGrid from '@components/Article/BlogPostGrid';
import FeaturedPost from '@components/Article/FeaturedPost';
import Header from '@components/Article/Header';
import Newsletter from '@components/Article/Newsletter';
import Sidebar from '@components/Article/Sidebar';
import React from 'react';

const BlogHomepage: React.FC = () => {
  const featuredPost = {
    title: '2024年前端開發趨勢：你不能錯過的新技術',
    date: '2024-08-20',
    author: '張三豐',
    tags: ['前端趨勢', 'Web開發', '新技術'],
    readTime: 15,
    excerpt:
      '隨著技術的快速發展，前端開發領域正經歷著翻天覆地的變化。本文深入探討2024年最受矚目的前端開發趨勢，包括AI輔助編程、WebAssembly的普及應用、以及新一代前端框架的崛起。無論你是經驗豐富的開發者還是新手，這些趨勢都將深刻影響你的職業發展道路。',
  };

  const posts = [
    {
      title: '掌握React Hooks：從基礎到高級應用',
      date: '2024-08-15',
      author: '陳小明',
      tags: ['React', 'Hooks', '前端開發'],
      readTime: 10,
      excerpt:
        '深入探討React Hooks的使用技巧，從useState和useEffect開始，到自定義Hooks的開發，全面提升你的React技能。',
    },
    {
      title: 'CSS Grid佈局：創建複雜的響應式設計',
      date: '2024-08-10',
      author: '林美玲',
      tags: ['CSS', 'Grid', '響應式設計'],
      readTime: 8,
      excerpt:
        '學習如何運用CSS Grid創建富有創意的頁面佈局，掌握響應式設計的核心技巧，打造出色的用戶界面。',
    },
    {
      title: 'JavaScript異步編程：從回調到Async/Await',
      date: '2024-08-05',
      author: '王大衛',
      tags: ['JavaScript', '異步', '性能優化'],
      readTime: 12,
      excerpt:
        '全面解析JavaScript中的異步編程模式，從傳統的回調函數，到Promise，再到現代的Async/Await語法，優化你的代碼結構。',
    },
    {
      title: 'TypeScript進階：提升代碼質量與開發效率',
      date: '2024-07-30',
      author: '李小龍',
      tags: ['TypeScript', 'JavaScript', '代碼質量'],
      readTime: 11,
      excerpt:
        '探索TypeScript的進階特性，學習如何利用類型系統、泛型和裝飾器等功能來提高代碼的可維護性和開發效率。',
    },
  ];

  const categories = [
    '前端框架',
    'CSS技巧',
    'JavaScript進階',
    '性能優化',
    '開發工具',
    'Web安全',
  ];
  const tags = [
    'React',
    'Vue',
    'Angular',
    'CSS',
    'HTML5',
    'ES6+',
    'TypeScript',
    'Webpack',
    'Node.js',
  ];
  const trendingPosts = [
    { title: 'Next.js 14新特性詳解：革命性的App Router' },
    { title: 'CSS Houdini：開啟樣式的無限可能' },
    { title: '深入理解JavaScript的事件循環機制' },
    { title: '前端測試最佳實踐：從單元測試到E2E' },
    { title: 'WebGPU入門：下一代Web圖形API' },
  ];

  return (
    <Box minH='100vh' bg='gray.100'>
      <Header />
      <Box w='100%' py={12}>
        <Box mb={12}>
          <FeaturedPost post={featuredPost} />
        </Box>
        <Flex direction={{ base: 'column', lg: 'row' }}>
          <Box flex={{ base: '1', lg: '2' }} mr={{ lg: 8 }}>
            <Heading as='h2' size='xl' mb={8} color='gray.800'>
              最新文章
            </Heading>
            <BlogPostGrid posts={posts} />
          </Box>
          <Box flex={{ base: '1', lg: '1' }} mt={{ base: 8, lg: 0 }}>
            <Sidebar
              categories={categories}
              tags={tags}
              trendingPosts={trendingPosts}
            />
          </Box>
        </Flex>
        <Box mt={16}>
          <Newsletter />
        </Box>
      </Box>
    </Box>
  );
};

export default BlogHomepage;
