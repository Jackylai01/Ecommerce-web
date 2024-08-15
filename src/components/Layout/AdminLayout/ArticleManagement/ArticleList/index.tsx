import {
  Badge,
  Box,
  Button,
  Flex,
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
import { Article } from '@models/responses/article.res';

interface ArticleListProps {
  articles: any;
  metadata: Metadata | null;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  handleSearch: (searchTerm: string) => void;
  openArticleModal: (article?: Article) => void;
  handleDeleteArticle: (articleId: string) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  metadata,
  searchTerm,
  setSearchTerm,
  handleSearch,
  openArticleModal,
  handleDeleteArticle,
}) => {
  return (
    <Box bg='white' boxShadow='lg' borderRadius='12px' p='2rem' mb='2rem'>
      <Button colorScheme='purple' onClick={() => openArticleModal()}>
        + 新增文章
      </Button>
      <Box display='flex' flexDirection='row' mt='1rem'>
        <Input
          placeholder='搜尋文章'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={() => handleSearch(searchTerm)}>搜尋</Button>
      </Box>
      <Box overflowX='auto' mt='2rem' className='tables-container'>
        <Table variant='simple' className='tables-container__table'>
          <Thead>
            <Tr>
              <Th className='tables-container__header-cell tables-container__sticky-column'>
                標題
              </Th>
              <Th className='tables-container__header-cell'>狀態</Th>
              <Th className='tables-container__header-cell'>編輯人</Th>
              <Th className='tables-container__header-cell'>封面圖片</Th>
              <Th className='tables-container__header-cell'>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {articles?.map((article: any) => (
              <Tr key={article._id}>
                <Td className='tables-container__body-cell tables-container__sticky-column'>
                  {article.title}
                </Td>
                <Td className='tables-container__body-cell'>
                  <Badge
                    colorScheme={
                      article.status === 'published' ? 'green' : 'yellow'
                    }
                  >
                    {article.status === 'published' ? '已發佈' : '草稿'}
                  </Badge>
                </Td>
                <Td className='tables-container__body-cell'>
                  {article.author.username}
                </Td>
                <Td className='tables-container__body-cell'>
                  <Image
                    src={article.coverImage.imageUrl}
                    alt='封面'
                    boxSize='48px'
                    borderRadius='6px'
                    objectFit='cover'
                    boxShadow='md'
                  />
                </Td>
                <Td className='tables-container__body-cell'>
                  <Flex gap='0.5rem'>
                    <Button
                      colorScheme='purple'
                      size='sm'
                      onClick={() => openArticleModal(article)}
                    >
                      編輯
                    </Button>
                    <Button
                      colorScheme='red'
                      size='sm'
                      onClick={() => handleDeleteArticle(article._id)}
                    >
                      刪除
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
          {metadata && <Pagination metadata={metadata} />}
        </Table>
      </Box>
    </Box>
  );
};

export default ArticleList;
