import { Box, Button, Input, useToast } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormValues {
  query: string;
}

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const toast = useToast();

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    if (!values.query) {
      toast({
        title: '錯誤',
        description: '請輸入搜索關鍵詞。',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    // 呼叫上層傳遞的搜索函數
    onSearch(values.query);
    reset(); // 重置表單
  };

  return (
    <Box as='form' onSubmit={handleSubmit(onSubmit)} display='flex' gap='2'>
      <Input
        {...register('query', { required: '請輸入搜索關鍵詞。' })}
        placeholder='搜索文章...'
        size={['sm', 'md']}
        fontSize={['sm', 'md']}
      />
      <Button type='submit' colorScheme='blue' size={['sm', 'md']}>
        搜索
      </Button>
    </Box>
  );
};

export default Search;
