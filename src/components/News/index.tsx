import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { testImage } from '@fixtures/componentLibrary';
import {
  Briefcase,
  Calendar,
  ChevronRight,
  Newspaper,
  Package,
} from 'lucide-react';
import { useState } from 'react';

const newsCategories = [
  { id: 'all', label: '所有消息', icon: Newspaper, color: 'blue.500' },
  { id: 'company', label: '公司新聞', icon: Briefcase, color: 'green.500' },
  { id: 'product', label: '產品資訊', icon: Package, color: 'purple.500' },
  { id: 'event', label: '活動消息', icon: Calendar, color: 'orange.500' },
];

const newsItems = [
  {
    id: 1,
    category: 'company',
    title: '公司年度報告發布',
    date: '2024-08-15',
    content:
      '我們很高興地宣布，本年度的財務報告顯示公司營收增長20%，這得益於我們在新市場的成功拓展和產品線的創新。',
    image: testImage,
  },
  {
    id: 2,
    category: 'product',
    title: '新一代智能手機發布',
    date: '2024-08-20',
    content:
      '即將推出的XYZ手機將革新用戶體驗，搭載最新的AI晶片和創新的摺疊屏技術，為移動通訊帶來新的可能性。',
    image: testImage,
  },
  {
    id: 3,
    category: 'event',
    title: '2024科技創新峰會',
    date: '2024-08-25',
    content:
      '歡迎參加我們的年度科技創新峰會，屆時將有來自全球的科技領袖分享最新的技術趨勢和創新理念。',
    image: testImage,
  },
  {
    id: 4,
    category: 'company',
    title: '新任首席技術官加入',
    date: '2024-08-30',
    content:
      '我們很高興地歡迎Jane Doe博士加入我們的領導團隊，擔任首席技術官。Jane帶來了豐富的人工智能和數據科學經驗。',
    image: testImage,
  },
  {
    id: 5,
    category: 'product',
    title: '雲服務平台升級',
    date: '2024-09-05',
    content:
      '我們的雲服務平台已完成重大升級，新增了高級安全功能和提升了性能，為企業客戶提供更可靠、更高效的服務。',
    image: testImage,
  },
  {
    id: 6,
    category: 'event',
    title: '年度黑客松大賽',
    date: '2024-09-10',
    content:
      '一年一度的黑客松大賽即將開始，邀請全球開發者共同探索技術的無限可能，豐厚獎金等你來拿！',
    image: testImage,
  },
];

const NewsItem = ({ title, date, content, category, image }: any) => {
  const categoryInfo = newsCategories.find((c) => c.id === category);

  if (!categoryInfo) return <Box>無此類別</Box>;

  return (
    <Box
      mb={6}
      overflow='hidden'
      boxShadow='md'
      transition='all 0.3s'
      _hover={{ transform: 'scale(1.02)', shadow: 'xl' }}
      borderRadius='md'
      bg='white'
    >
      <Box position='relative' h='200px' overflow='hidden'>
        <Image src={image} alt={title} objectFit='cover' w='100%' h='100%' />
        <Badge
          position='absolute'
          top='4'
          left='4'
          bg={categoryInfo.color}
          color='white'
          py={1}
          px={3}
          borderRadius='full'
          fontSize='sm'
          fontWeight='bold'
        >
          {categoryInfo.label}
        </Badge>
      </Box>
      <Box p={4}>
        <Flex justifyContent='space-between' alignItems='center' pb={2}>
          <Heading size='md' fontWeight='bold'>
            {title}
          </Heading>
          <Badge variant='outline' fontSize='xs'>
            {date}
          </Badge>
        </Flex>
        <Text color='gray.600' mb={4}>
          {content}
        </Text>
        <Button
          variant='link'
          colorScheme='blue'
          rightIcon={<ChevronRight size='1em' />}
        >
          閱讀更多
        </Button>
      </Box>
    </Box>
  );
};

export default function NewsTabs() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredNews =
    activeCategory === 'all'
      ? newsItems
      : newsItems.filter((item) => item.category === activeCategory);

  return (
    <Box maxW='5xl' mx='auto' p={4}>
      <Heading textAlign='center' mb={8} fontSize='4xl' color='gray.800'>
        最新消息
      </Heading>
      <Tabs
        variant='soft-rounded'
        onChange={(index) => setActiveCategory(newsCategories[index].id)}
      >
        <TabList
          justifyContent='center'
          mb={8}
          bg='gray.100'
          p={1}
          borderRadius='full'
        >
          {newsCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Tab key={category.id} p={4} fontWeight='bold'>
                <Flex alignItems='center'>
                  <Icon size='1.25em' />
                  <Text ml={2}>{category.label}</Text>
                </Flex>
              </Tab>
            );
          })}
        </TabList>
        <TabPanels>
          {newsCategories.map((category) => (
            <TabPanel key={category.id}>
              <Box maxH='800px' overflowY='auto'>
                {filteredNews.map((item) => (
                  <NewsItem key={item.id} {...item} />
                ))}
              </Box>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
}
