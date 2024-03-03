import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { clientResetPasswordAsync } from '@reducers/client/auth/actions';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const ClientResetPasswordPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { handleSubmit, register } = useForm();
  const { id, code } = router.query as { id: string; code: string };
  const [show, setShow] = useState(false);

  const {
    status: { resetPasswordLoading, resetPasswordSuccess },
    error: { resetPasswordError },
  } = useAppSelector((state) => state.clientAuth);

  if (resetPasswordSuccess) {
    toast({
      title: '重設密碼',
      description: '您的密碼已重設成功',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    router.push('/');
  }

  const onSubmit = (data: any) => {
    dispatch(clientResetPasswordAsync({ id, code, ...data }));
  };

  return (
    <LoadingLayout isLoading={resetPasswordLoading}>
      <Flex
        p={5}
        h='100vh'
        w='100%'
        display='flex'
        align='center'
        justifyContent='center'
        flexDirection='column'
      >
        <Box
          as='a'
          mb='1rem'
          fontSize='2rem'
          textAlign='center'
          borderBottom='5px solid blue'
          cursor='pointer'
          href='/'
        >
          土地調查系統
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel>輸入新密碼</FormLabel>
            <InputGroup size='md'>
              <Input
                type={show ? 'text' : 'password'}
                {...register('password', {
                  required: '請填入密碼',
                })}
              />
              <InputRightElement width='4.5rem'>
                <IconButton
                  h='1.75rem'
                  size='sm'
                  onClick={() => setShow(!show)}
                  icon={show ? <ViewOffIcon /> : <ViewIcon />}
                  aria-label={show ? 'Hide password' : 'Show password'}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button type='submit' colorScheme='blue' mt={4}>
            送出
          </Button>
          {resetPasswordError && (
            <Text color='red.500'>{resetPasswordError}</Text>
          )}
        </form>
      </Flex>
    </LoadingLayout>
  );
};

export default ClientResetPasswordPage;
