import {
  Box,
  Button,
  Image,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Pagination from '@components/Pagination';
import { Metadata } from '@models/entities/shared/pagination';
import { NewsItem } from '@models/responses/news';

interface NewsListProps {
  news: NewsItem[];
  metadata: Metadata | null;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  handleSearch: (searchTerm: string) => void;
  openNewsModal: (news?: NewsItem) => void;
  handleDeleteNews: (newsId: string) => void;
}

const NewsList: React.FC<NewsListProps> = ({
  news,
  metadata,
  searchTerm,
  setSearchTerm,
  handleSearch,
  openNewsModal,
  handleDeleteNews,
}) => {
  return (
    <Box bg='white' boxShadow='lg' borderRadius='12px' p='2rem' mb='2rem'>
      <Button colorScheme='purple' onClick={() => openNewsModal()}>
        + 新增最新消息
      </Button>
      <Box display='flex' flexDirection='row' mt='1rem'>
        <Input
          placeholder='搜尋最新消息'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={() => handleSearch(searchTerm)}>搜尋</Button>
      </Box>
      <Box overflowX='auto' mt='2rem'>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>標題</Th>
              <Th>類別</Th>
              <Th>日期</Th>
              <Th>封面圖片</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {news.map((item) => (
              <Tr key={item._id}>
                <Td>{item.title}</Td>
                <Td>{item.category?.name || '無類別'}</Td>{' '}
                <Td>{new Date(item.createdAt).toLocaleDateString()}</Td>
                <Td>
                  <Image
                    src={item.coverImage?.imageUrl || ''}
                    alt='封面'
                    boxSize='48px'
                    borderRadius='6px'
                    objectFit='cover'
                  />
                </Td>
                <Td>
                  <Button
                    colorScheme='purple'
                    size='sm'
                    onClick={() => openNewsModal(item)}
                  >
                    編輯
                  </Button>
                  <Button
                    colorScheme='red'
                    size='sm'
                    onClick={() => handleDeleteNews(item._id)}
                  >
                    刪除
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {metadata && <Pagination metadata={metadata} />}
      </Box>
    </Box>
  );
};

export default NewsList;
