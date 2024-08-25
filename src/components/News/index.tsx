import {
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { testImage } from '@fixtures/componentLibrary';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

const newsCategories = [
  { id: 'all', label: '全部' },
  { id: 'company', label: '公司新聞' },
  { id: 'product', label: '產品資訊' },
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
    category: 'company',
    title: '企業社會責任計劃啟動',
    date: '2024-09-01',
    content:
      '我們正式啟動了新的企業社會責任計劃，致力於環境保護和社區發展。這個五年計劃將投入大量資源來減少碳排放並支持本地教育項目。',
    image: testImage,
  },
  {
    id: 4,
    category: 'product',
    title: '人工智能助手系統更新',
    date: '2024-09-10',
    content:
      '我們的AI助手系統迎來重大更新，新版本支持更多語言並能夠理解複雜的上下文信息，大大提升了用戶體驗。',
    image: testImage,
  },
];

const NewsItem = ({ title, date, content, category, image, featured }: any) => {
  return (
    <Box
      position='relative'
      overflow='hidden'
      gridColumn={featured ? { md: 'span 2' } : 'span 1'}
      gridRow={featured ? { md: 'span 2' } : 'span 1'}
      borderRadius='20px'
    >
      <Image
        src={image}
        alt={title}
        objectFit='cover'
        h='100%'
        w='100%'
        transition='transform 0.3s'
        _groupHover={{ transform: 'scale(1.05)' }}
      />
      <Box
        position='absolute'
        inset='0'
        bgGradient='linear(to-t, black, transparent)'
        opacity={0.7}
        _groupHover={{ opacity: 0.9 }}
        transition='opacity 0.3s'
      />
      <Box position='absolute' bottom='0' p={6} color='white'>
        <Badge bg='blue.500' px={3} py={1} mb={2} textTransform='uppercase'>
          {category}
        </Badge>
        <Heading fontSize={featured ? '3xl' : 'xl'} mb={2} color='white'>
          {title}
        </Heading>
        <Text fontSize='sm' mb={4} noOfLines={featured ? 3 : 2} color='white'>
          {content}
        </Text>
        <Flex align='center' justify='space-between'>
          <Text fontSize='sm'>{date}</Text>
          <Button
            as='a'
            href='#'
            size='sm'
            colorScheme='blue'
            variant='link'
            rightIcon={<ArrowRight />}
            _hover={{ textDecoration: 'none', color: 'blue.300' }}
          >
            閱讀更多
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

const NewsTabs = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredNews =
    activeCategory === 'all'
      ? newsItems
      : newsItems.filter((item) => item.category === activeCategory);

  return (
    <Box bg='gray.100' minH='100vh' py={16}>
      <Box maxW='7xl' mx='auto' px={4}>
        <Box position='relative' mb={16} textAlign='center'>
          <Heading
            as='h1'
            fontSize='5xl'
            fontWeight='bold'
            color='gray.800'
            mb={2}
          >
            最新消息
          </Heading>
          <Divider
            width='24'
            borderColor='blue.500'
            borderWidth='2px'
            mx='auto'
            mt={4}
          />
        </Box>
        <Flex justify='center' mb={12} gap={4}>
          {newsCategories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              borderRadius='full'
              px={6}
              py={2}
              size='sm'
              fontWeight='medium'
              colorScheme={activeCategory === category.id ? 'blue' : 'gray'}
              variant={activeCategory === category.id ? 'solid' : 'outline'}
            >
              {category.label}
            </Button>
          ))}
        </Flex>
        <Grid
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          gap={6}
        >
          {filteredNews.map((item, index) => (
            <NewsItem key={item.id} {...item} featured={index === 0} />
          ))}
        </Grid>
        {filteredNews.length === 0 && (
          <Center
            mt={8}
            bg='white'
            borderLeft='4px'
            borderColor='blue.500'
            p={4}
            color='blue.700'
          >
            <Stack spacing={2} align='center'>
              <Text fontWeight='bold'>無相關新聞</Text>
              <Text>目前沒有符合所選類別的新聞。請嘗試選擇其他類別。</Text>
            </Stack>
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default NewsTabs;
