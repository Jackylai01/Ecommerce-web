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

interface CategoryListProps {
  categories: any;
  metadata: Metadata | null;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  handleCategorySearch: (searchTerm: string) => void;
  openCategoryModal: (category?: any) => void;
  handleDeleteCategory: (categoryId: string) => void;
}

const NewsCategoryList: React.FC<CategoryListProps> = ({
  categories,
  metadata,
  searchTerm,
  setSearchTerm,
  handleCategorySearch,
  openCategoryModal,
  handleDeleteCategory,
}) => {
  return (
    <Box bg='white' boxShadow='lg' borderRadius='12px' p='2rem' mb='2rem'>
      {/* 新增最新消息類別按鈕 */}
      <Button colorScheme='purple' onClick={() => openCategoryModal()}>
        + 新增最新消息類別
      </Button>

      {/* 搜尋框 */}
      <Box display='flex' flexDirection='row' mt='1rem'>
        <Input
          placeholder='搜尋最新消息類別'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={() => handleCategorySearch(searchTerm)}>搜尋</Button>
      </Box>

      <Box overflowX='auto' mt='2rem' className='tables-container'>
        <Table variant='simple' className='tables-container__table'>
          <Thead>
            <Tr>
              <Th className='tables-container__header-cell tables-container__sticky-column'>
                類別名稱
              </Th>
              <Th className='tables-container__header-cell'>描述</Th>
              <Th className='tables-container__header-cell'>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories?.map((category: any) => (
              <Tr key={category?._id}>
                <Td className='tables-container__body-cell tables-container__sticky-column'>
                  {category?.name || '無名'}
                </Td>
                <Td className='tables-container__body-cell'>
                  {category?.description || '無描述'}
                </Td>
                <Td className='tables-container__body-cell'>
                  <Button
                    as='button'
                    colorScheme='purple'
                    size='sm'
                    onClick={() => openCategoryModal(category)}
                  >
                    編輯
                  </Button>
                  <Button
                    as='button'
                    colorScheme='red'
                    size='sm'
                    onClick={() => handleDeleteCategory(category._id)}
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

export default NewsCategoryList;
