import {
  Box,
  Button,
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
import { Faq } from '@models/responses/faq.res';

interface FaqListProps {
  faqs: any;
  metadata: Metadata | null;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  handleSearch: (searchTerm: string) => void;
  openFaqModal: (faq?: Faq) => void;
  handleDeleteFaq: (faqId: string) => void;
}

const FaqList: React.FC<FaqListProps> = ({
  faqs,
  metadata,
  searchTerm,
  setSearchTerm,
  handleSearch,
  openFaqModal,
  handleDeleteFaq,
}) => {
  return (
    <Box bg='white' boxShadow='lg' borderRadius='12px' p='2rem' mb='2rem'>
      <Button colorScheme='purple' onClick={() => openFaqModal()}>
        + 新增常見問答
      </Button>
      <Box display='flex' flexDirection='row' mt='1rem'>
        <Input
          placeholder='搜尋常見問答'
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
                問題
              </Th>
              <Th className='tables-container__header-cell'>回答</Th>
              <Th className='tables-container__header-cell'>類別</Th>
              <Th className='tables-container__header-cell'>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {faqs?.map((faq: any) => (
              <Tr key={faq._id}>
                <Td className='tables-container__body-cell tables-container__sticky-column'>
                  {faq.question}
                </Td>
                <Td className='tables-container__body-cell'>{faq.answer}</Td>
                <Td className='tables-container__body-cell'>
                  {faq.category.name}
                </Td>
                <Td className='tables-container__body-cell'>
                  <Button
                    as='button'
                    colorScheme='purple'
                    size='sm'
                    onClick={() => openFaqModal(faq)}
                  >
                    編輯
                  </Button>
                  <Button
                    as='button'
                    colorScheme='red'
                    size='sm'
                    onClick={() => handleDeleteFaq(faq._id)}
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

export default FaqList;
