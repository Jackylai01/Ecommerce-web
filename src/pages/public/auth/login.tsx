import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
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
import { resetClientAuth } from '@reducers/client/auth';
import {
  clientForgetPasswordAsync,
  clientLoginAsync,
} from '@reducers/client/auth/actions';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface BubbleStyle {
  left: string;
  animationDuration: string;
}

const Login: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const [bubbles, setBubbles] = useState<BubbleStyle[]>([]);

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
    if (userInfo && !userInfo.roles.includes('client')) {
      router.push('/');
    }
  }, [userInfo, router]);

  const onSubmit = async (data: any) => {
    dispatch(resetClientAuth());
    await dispatch(clientLoginAsync(data));
  };

  useEffect(() => {
    const generatedBubbles = [...Array(15)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 5 + 5}s`,
    }));
    setBubbles(generatedBubbles);
  }, []);

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
        title: '登入失败',
        description: loginError,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [loginSuccess, loginFailed, loginError, router, toast]);

  const ForgetSubmit = async (data: any) => {
    try {
      console.log('ForgetSubmit called with:', data);
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

  return (
    <LoadingLayout isLoading={loginLoading}>
      <Flex
        as='main'
        alignItems='center'
        justifyContent='center'
        bgImage="url('/images/login/login-background.png')"
        bgSize='cover'
        bgPosition='center'
        bgRepeat='no-repeat'
        height='100vh'
      >
        <Box
          as='form'
          width={{ base: '80%', md: '70%' }}
          boxShadow='0 8px 8px rgba(0, 0, 0, 0.7)'
          borderRadius='md'
          overflow='hidden'
          mt={{ base: '0rem', md: '2rem' }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Flex as='article' direction={{ base: 'column', sm: 'row' }}>
            <Box
              as='section'
              display='flex'
              alignItems='center'
              justifyContent='center'
              flex={1}
              bgGradient='linear(to-r, blue.500, blue.900)'
            >
              {bubbles.map((style, i) => (
                <Box key={i} className='bubble' style={style} />
              ))}
              <Image
                w={{ base: '50%', md: '100%', sm: '100%' }}
                src='/images/login/paper-map.png'
                alt='SVG Image'
              />
            </Box>
            <Box flex={1} p={5} bg='white'>
              <FormControl id='email' mb={4}>
                <FormLabel>信箱</FormLabel>
                <Input
                  type='text'
                  {...register('email', { required: '請填入正確信箱' })}
                />
                {errors.email && (
                  <Box as='p' color='red'>
                    {errors.email.message}
                  </Box>
                )}
              </FormControl>
              <FormControl id='password' mb={4}>
                <FormLabel>密碼</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter password'
                    {...register('password', {
                      required: '請填入密碼',
                    })}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button
                      h='1.75rem'
                      size='sm'
                      bg='none'
                      onClick={handlePasswordVisibility}
                      _hover={{ bg: 'transparent' }}
                    >
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && (
                  <Box as='p' color='red'>
                    {errors.password.message}
                  </Box>
                )}
              </FormControl>
              <Button type='submit' colorScheme='blue' width='full' mb={4}>
                登入
              </Button>
              <Flex
                as='span'
                fontSize={{ base: '0.75rem', md: '1rem' }}
                justifyContent='space-between'
              >
                <Link
                  color='blue.500'
                  onClick={() => router.push(`/public/auth/register`)}
                >
                  尚未註冊?
                </Link>
                <Link color='blue.500' onClick={onOpen}>
                  忘記密碼
                </Link>
                <Link color='blue.500' onClick={() => router.push('/')}>
                  回首頁
                </Link>
              </Flex>
            </Box>
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
                    placeholder='Email'
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
