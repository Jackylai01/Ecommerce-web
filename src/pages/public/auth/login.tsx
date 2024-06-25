import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  clientForgetPasswordAsync,
  clientLoginAsync,
} from '@reducers/client/auth/actions';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const Login: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: registerForget,
    handleSubmit: handleSubmitForget,
    reset: resetForget,
    formState: { errors: errorsForget },
  } = useForm();

  const {
    userInfo,
    status: { loginLoading, loginSuccess, loginFailed },
    error: { loginError },
  } = useAppSelector((state) => state.clientAuth);

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, [userInfo, router]);

  const onSubmit = (data: any) => {
    dispatch(clientLoginAsync(data));
  };

  useEffect(() => {
    if (loginSuccess) {
      toast({
        title: '登入成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push('/');
    }

    if (loginFailed && loginError) {
      toast({
        title: '登入失敗',
        description: loginError,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [loginSuccess, loginFailed, loginError, router, toast]);

  const ForgetSubmit = async (data: any) => {
    try {
      await dispatch(clientForgetPasswordAsync(data));
      toast({
        title: '重設密碼信箱已寄送',
        description: '請檢查您的重設密碼信箱',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: '送出失敗',
        description: error || '無法傳送或重設失敗',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  console.log('登入 頁面', userInfo);

  return (
    <LoadingLayout isLoading={loginLoading}>
      <Flex as='main' h='70vh' alignItems='center' justifyContent='center'>
        <Box
          as='form'
          width={{ base: '90%', md: '50%', lg: '40%' }}
          boxShadow='lg'
          borderRadius='lg'
          overflow='hidden'
          mt={{ base: '0', md: '2rem' }}
          onSubmit={handleSubmit(onSubmit)}
          bg='white'
        >
          <Flex as='article' direction='column' p={8}>
            <Box textAlign='center' mb={8}>
              <Box as='h1' fontSize='2xl' fontWeight='bold'>
                歡迎回來
              </Box>
              <Box as='p' color='gray.600'>
                請登入您的帳號以繼續
              </Box>
            </Box>
            <FormControl id='email' mb={4} isInvalid={!!errors.email}>
              <FormLabel>信箱</FormLabel>
              <Input
                type='email'
                placeholder='請輸入您的信箱'
                {...register('email', { required: '請填入正確信箱' })}
              />
              {errors.email && (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id='password' mb={4} isInvalid={!!errors.password}>
              <FormLabel>密碼</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='請輸入您的密碼'
                  {...register('password', {
                    required: '請填入密碼',
                  })}
                />
                <InputRightElement width='4.5rem'>
                  <Button
                    h='1.75rem'
                    size='sm'
                    onClick={handlePasswordVisibility}
                    bg='none'
                    _hover={{ bg: 'transparent' }}
                  >
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              )}
            </FormControl>
            <Button type='submit' colorScheme='blue' width='full' mb={4}>
              登入
            </Button>
            <Flex justifyContent='space-between' fontSize='sm' color='gray.600'>
              <Link onClick={onOpen}>忘記密碼?</Link>
              <Link onClick={() => router.push(`/public/auth/register`)}>
                尚未註冊?
              </Link>
            </Flex>
          </Flex>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>重設密碼</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <form onSubmit={handleSubmitForget(ForgetSubmit)}>
                <FormControl isInvalid={!!errorsForget.email}>
                  <FormLabel>電子郵件</FormLabel>
                  <Input
                    type='email'
                    placeholder='請輸入您的信箱'
                    {...registerForget('email', { required: '請輸入電子信箱' })}
                  />
                  {errorsForget.email && (
                    <FormErrorMessage>
                      {errorsForget.email.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <Button mt={4} colorScheme='blue' type='submit'>
                  送出
                </Button>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </LoadingLayout>
  );
};

export default Login;
