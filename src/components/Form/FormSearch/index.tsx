import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
} from '@chakra-ui/react';
import { formatQueryString } from '@helpers/query';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

const FormSearch = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { asPath, query } = router;
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const onSubmit = (data: any) => {
    const url = asPath.split('?')[0];
    const routerLink = formatQueryString(url, data);
    router.push(routerLink);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel htmlFor='search'>
          <Box as='b' color='white'>
            關鍵字搜尋
          </Box>
        </FormLabel>
        <Input
          id='search'
          placeholder='請輸入關鍵字'
          {...register('keyword')}
          defaultValue={query.keyword}
          border='1px solid white'
          color='white'
        />
      </FormControl>
      <Button mt={4} colorScheme='blue' type='submit' size={buttonSize}>
        查詢
      </Button>
    </form>
  );
};

export default FormSearch;
