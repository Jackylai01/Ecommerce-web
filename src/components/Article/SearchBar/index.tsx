import { Box, Icon, Input } from '@chakra-ui/react';
import { Search } from 'lucide-react';

const SearchBar = () => (
  <Box position='relative' maxW='2xl' mx='auto'>
    <Input
      placeholder='搜索文章...'
      bg='purple.100'
      color='white'
      _placeholder={{ color: 'purple.200' }}
      borderColor='purple.300'
      _focus={{ borderColor: 'white', outline: 'none' }}
      pl={12}
      py={4}
      borderRadius='full'
    />
    <Icon
      as={Search}
      position='absolute'
      left={4}
      top={4}
      color='purple.200'
      boxSize={6}
    />
  </Box>
);

export default SearchBar;
