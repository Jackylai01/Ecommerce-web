import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { completeGoogleRegistrationAsync } from '@reducers/public/auth/actions';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const CompleteRegistrationPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const toast = useToast();

  // 指定 useForm 的表單數據類型
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ address: string; phone: string }>();

  const {
    googleRegistrationSuccess,
    status: {
      googleCompleteRegistrationFailed,
      googleCompleteRegistrationLoading,
      googleCompleteRegistrationSuccess,
    },
    error: { googleCompleteRegistrationError },
  } = useAppSelector((state) => state.publicAuth);

  const onSubmit = async (data: { address: string; phone: string }) => {
    const token = Array.isArray(router.query.token)
      ? router.query.token[0]
      : router.query.token;

    if (!token) {
      toast({
        title: 'Token 丟失',
        description: '無法驗證您的身份，請重新登入。',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    dispatch(completeGoogleRegistrationAsync({ token, ...data }));
  };

  // 處理註冊的成功與失敗狀態
  useEffect(() => {
    if (googleCompleteRegistrationSuccess) {
      toast({
        title: '註冊成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push('/'); // 註冊完成後導向首頁
    }

    if (googleCompleteRegistrationFailed && googleCompleteRegistrationError) {
      toast({
        title: '註冊失敗',
        description: googleCompleteRegistrationError,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [
    googleCompleteRegistrationSuccess,
    googleCompleteRegistrationFailed,
    googleCompleteRegistrationError,
    router,
    toast,
  ]);

  return (
    <LoadingLayout isLoading={googleCompleteRegistrationLoading}>
      <Box
        as='form'
        onSubmit={handleSubmit(onSubmit)}
        width={{ base: '90%', md: '50%' }}
        mx='auto'
        mt={8}
      >
        <FormControl mb={4} isInvalid={!!errors.address}>
          <FormLabel>地址</FormLabel>
          <Input
            type='text'
            placeholder='請輸入您的地址'
            {...register('address', { required: '請輸入地址' })}
          />
        </FormControl>

        <FormControl mb={4} isInvalid={!!errors.phone}>
          <FormLabel>電話號碼</FormLabel>
          <Input
            type='text'
            placeholder='請輸入您的電話號碼'
            {...register('phone', { required: '請輸入電話號碼' })}
          />
        </FormControl>

        <Button type='submit' colorScheme='blue' width='full'>
          完成註冊
        </Button>
      </Box>
    </LoadingLayout>
  );
};

export default CompleteRegistrationPage;
