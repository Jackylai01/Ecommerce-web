import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { resetClientAuth } from '@reducers/client/auth';
import {
  clientDetailUserProfileAsync,
  clientModifyProfileAsync,
} from '@reducers/client/auth/actions';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const Profiles = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { register, handleSubmit, reset } = useForm();
  const {
    userProfile,
    status: {
      clientDetailUserProfileLoading,
      modifyProfileFailed,
      modifyProfileLoading,
      modifyProfileSuccess,
    },
    error: { modifyProfileError },
  } = useAppSelector((state) => state.clientAuth);

  useEffect(() => {
    dispatch(clientDetailUserProfileAsync());
  }, [dispatch]);

  useEffect(() => {
    if (userProfile) {
      reset(userProfile);
    }
  }, [userProfile, reset]);

  const onSubmit = async (data: any) => {
    dispatch(clientModifyProfileAsync(data));
  };

  useEffect(() => {
    if (modifyProfileSuccess) {
      toast({
        title: '個人資料更新成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      dispatch(resetClientAuth());
    } else if (modifyProfileFailed) {
      toast({
        title: '更新失敗',
        description: modifyProfileError,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [dispatch, modifyProfileSuccess, modifyProfileFailed, toast]);

  return (
    <LoadingLayout
      isLoading={modifyProfileLoading || clientDetailUserProfileLoading}
    >
      <Box
        as='form'
        maxW='500px'
        mx='auto'
        bg='white'
        p='30px'
        borderRadius='12px'
        boxShadow='0 10px 20px rgba(0, 0, 0, 0.05)'
        onSubmit={handleSubmit(onSubmit)}
      >
        <VStack spacing='25px'>
          <FormControl>
            <FormLabel color='#3a4f66'>姓名</FormLabel>
            <Input
              type='text'
              placeholder='請輸入您的姓名'
              {...register('username')}
              border='2px solid #e0e0e0'
              borderRadius='12px'
              _focus={{
                borderColor: '#c0a080',
                boxShadow: '0 0 0 3px rgba(192, 160, 128, 0.2)',
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel color='#3a4f66'>電子郵件</FormLabel>
            <Input
              type='email'
              placeholder='請輸入您的電子郵件'
              {...register('email')}
              border='2px solid #e0e0e0'
              borderRadius='12px'
              _focus={{
                borderColor: '#c0a080',
                boxShadow: '0 0 0 3px rgba(192, 160, 128, 0.2)',
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel color='#3a4f66'>手機號碼</FormLabel>
            <Input
              type='tel'
              placeholder='請輸入您的手機號碼'
              {...register('phone')}
              border='2px solid #e0e0e0'
              borderRadius='12px'
              _focus={{
                borderColor: '#c0a080',
                boxShadow: '0 0 0 3px rgba(192, 160, 128, 0.2)',
              }}
            />
          </FormControl>
          <Button
            type='submit'
            bg='#c0a080'
            color='white'
            w='full'
            size='lg'
            borderRadius='30px'
            _hover={{ bg: '#b08f60', transform: 'translateY(-2px)' }}
          >
            更新個人資料
          </Button>
        </VStack>
      </Box>
    </LoadingLayout>
  );
};

export default Profiles;
