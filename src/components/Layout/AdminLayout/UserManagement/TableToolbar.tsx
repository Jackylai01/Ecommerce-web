import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { SearchIcon, AddIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useAdminColorMode } from 'src/context/colorMode';

interface TableToolbarProps {
  onAddUser: () => void;
  onSearch?: (keyword: string) => void;
  totalCount?: number;
}

const TableToolbar = ({
  onAddUser,
  onSearch,
  totalCount = 0,
}: TableToolbarProps) => {
  const { colorMode } = useAdminColorMode();
  const [searchKeyword, setSearchKeyword] = useState('');

  const bgColor = colorMode === 'light' ? 'white' : 'gray.800';
  const borderColor = colorMode === 'light' ? 'gray.200' : 'gray.600';

  const handleSearchChange = (value: string) => {
    setSearchKeyword(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <Box
      bg={bgColor}
      borderRadius='lg'
      border='1px'
      borderColor={borderColor}
      p={4}
      mb={4}
      shadow='sm'
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap={4}
        align={{ base: 'stretch', md: 'center' }}
        justify='space-between'
      >
        {/* 左側：標題和統計 */}
        <Flex direction='column' gap={1}>
          <Text fontSize='2xl' fontWeight='bold'>
            用戶管理
          </Text>
          <Text fontSize='sm' color='gray.500'>
            共 {totalCount} 個用戶
          </Text>
        </Flex>

        {/* 右側：搜尋、新增按鈕 */}
        <HStack
          spacing={3}
          width={{ base: '100%', md: 'auto' }}
          flexWrap={{ base: 'wrap', md: 'nowrap' }}
        >
          {/* 搜尋框 */}
          <InputGroup
            maxW={{ base: '100%', md: '300px' }}
            size='md'
            flex={{ base: '1 1 100%', md: '0 1 auto' }}
          >
            <InputLeftElement pointerEvents='none'>
              <SearchIcon color='gray.400' />
            </InputLeftElement>
            <Input
              placeholder='搜尋用戶名稱或信箱'
              value={searchKeyword}
              onChange={(e) => handleSearchChange(e.target.value)}
              bg={colorMode === 'light' ? 'white' : 'gray.700'}
            />
          </InputGroup>

          {/* 新增按鈕 */}
          <Button
            leftIcon={<AddIcon />}
            colorScheme='teal'
            size='md'
            onClick={onAddUser}
            width={{ base: '100%', md: 'auto' }}
            minW='120px'
            px={6}
            flex={{ base: '1 1 100%', md: '0 1 auto' }}
          >
            新增用戶
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default TableToolbar;
