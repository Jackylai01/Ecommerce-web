import { Box, Icon, Input } from '@chakra-ui/react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    // 更新 URL 查詢參數，觸發 SSR
    router.push({
      pathname: router.pathname,
      query: { ...router.query, search: e.target.value, page: 1 },
    });
  };

  return (
    <Box position='relative' maxW='2xl' mx='auto'>
      <Input
        placeholder='搜索文章...'
        value={searchTerm}
        onChange={handleSearch}
        bg='gray.100'
        color='gray.800'
        _placeholder={{ color: 'gray.500' }}
        borderColor='gray.300'
        _focus={{ borderColor: 'blue.400', outline: 'none' }}
        pl={12}
        py={4}
        borderRadius='full'
      />
      <Icon
        as={Search}
        position='absolute'
        left={4}
        top={2}
        color='purple.500'
        boxSize={6}
      />
    </Box>
  );
};

export default SearchBar;
