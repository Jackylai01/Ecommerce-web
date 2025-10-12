import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
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
  Text,
  VStack,
  HStack,
  Divider,
  useDisclosure,
  useToast,
  Image,
  Icon,
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
import { FaGoogle } from 'react-icons/fa';
import { FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';

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
        description: '歡迎回來！',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
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

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`;
  };

  return (
    <LoadingLayout isLoading={loginLoading}>
      <Flex minH='100vh' bg='gray.50'>
        {/* 左側圖片區域 - 桌面版顯示 */}
        <Box
          flex='1'
          bg='linear-gradient(135deg, rgba(251, 146, 60, 0.9), rgba(236, 72, 153, 0.9))'
          display={{ base: 'none', lg: 'flex' }}
          alignItems='center'
          justifyContent='center'
          position='relative'
          overflow='hidden'
        >
          {/* 背景圖片 */}
          <Image
            src='https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1200&fit=crop'
            alt='購物背景'
            position='absolute'
            w='100%'
            h='100%'
            objectFit='cover'
            opacity='0.3'
          />

          {/* 內容 */}
          <VStack
            spacing='24px'
            zIndex='1'
            color='white'
            maxW='500px'
            px='40px'
            textAlign='center'
          >
            <Heading fontSize='4xl' fontWeight='900'>
              歡迎回到
              <Text as='span' display='block'>
                時尚購物天堂
              </Text>
            </Heading>
            <Text fontSize='lg' lineHeight='1.8'>
              探索最新時尚趨勢，享受極致購物體驗。
              超過 10,000+ 精選商品等你來選購！
            </Text>
            <HStack spacing='40px' pt='20px'>
              <VStack>
                <Text fontSize='3xl' fontWeight='bold'>
                  10K+
                </Text>
                <Text fontSize='sm'>精選商品</Text>
              </VStack>
              <VStack>
                <Text fontSize='3xl' fontWeight='bold'>
                  50K+
                </Text>
                <Text fontSize='sm'>滿意顧客</Text>
              </VStack>
              <VStack>
                <Text fontSize='3xl' fontWeight='bold'>
                  4.9
                </Text>
                <Text fontSize='sm'>用戶評分</Text>
              </VStack>
            </HStack>
          </VStack>
        </Box>

        {/* 右側表單區域 */}
        <Flex
          flex={{ base: '1', lg: '0 0 550px' }}
          alignItems='center'
          justifyContent='center'
          p={{ base: '24px', md: '40px' }}
          bg='white'
        >
          <Box w='100%' maxW='450px'>
            {/* 返回首頁 */}
            <Button
              variant='ghost'
              leftIcon={<FiArrowLeft />}
              mb='32px'
              onClick={() => router.push('/')}
              color='gray.600'
              _hover={{ bg: 'gray.50' }}
            >
              返回首頁
            </Button>

            {/* 標題 */}
            <VStack align='flex-start' spacing='8px' mb='40px'>
              <Heading fontSize='3xl' fontWeight='900' color='gray.900'>
                登入帳號
              </Heading>
              <Text fontSize='md' color='gray.600'>
                還沒有帳號？
                <Link
                  color='orange.500'
                  fontWeight='600'
                  ml='4px'
                  onClick={() => router.push('/public/auth/register')}
                >
                  立即註冊
                </Link>
              </Text>
            </VStack>

            {/* 表單 */}
            <Box as='form' onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing='20px'>
                {/* Email */}
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel color='gray.700' fontWeight='600'>
                    電子信箱
                  </FormLabel>
                  <InputGroup size='lg'>
                    <InputRightElement pointerEvents='none'>
                      <Icon as={FiMail} color='gray.400' />
                    </InputRightElement>
                    <Input
                      type='email'
                      placeholder='your@email.com'
                      borderRadius='lg'
                      borderColor='gray.200'
                      _hover={{ borderColor: 'gray.300' }}
                      _focus={{
                        borderColor: 'orange.400',
                        boxShadow: '0 0 0 1px var(--chakra-colors-orange-400)',
                      }}
                      defaultValue='sn185672@gmail.com'
                      {...register('email', { required: '請填入電子信箱' })}
                    />
                  </InputGroup>
                  {errors.email && (
                    <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                  )}
                </FormControl>

                {/* Password */}
                <FormControl isInvalid={!!errors.password}>
                  <FormLabel color='gray.700' fontWeight='600'>
                    密碼
                  </FormLabel>
                  <InputGroup size='lg'>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='請輸入密碼'
                      borderRadius='lg'
                      borderColor='gray.200'
                      _hover={{ borderColor: 'gray.300' }}
                      _focus={{
                        borderColor: 'orange.400',
                        boxShadow: '0 0 0 1px var(--chakra-colors-orange-400)',
                      }}
                      defaultValue='12345678'
                      {...register('password', { required: '請填入密碼' })}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button
                        h='1.75rem'
                        size='sm'
                        onClick={handlePasswordVisibility}
                        variant='ghost'
                      >
                        {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {errors.password && (
                    <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                  )}
                </FormControl>

                {/* 忘記密碼 */}
                <Flex w='100%' justify='flex-end'>
                  <Link
                    fontSize='sm'
                    color='orange.500'
                    fontWeight='600'
                    onClick={onOpen}
                  >
                    忘記密碼？
                  </Link>
                </Flex>

                {/* 登入按鈕 */}
                <Button
                  type='submit'
                  size='lg'
                  w='100%'
                  h='56px'
                  bgGradient='linear(to-r, orange.400, pink.400)'
                  color='white'
                  fontWeight='700'
                  borderRadius='lg'
                  _hover={{
                    bgGradient: 'linear(to-r, orange.500, pink.500)',
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  transition='all 0.3s'
                >
                  登入
                </Button>

                {/* 分隔線 */}
                <HStack w='100%' my='8px'>
                  <Divider />
                  <Text fontSize='sm' color='gray.500' whiteSpace='nowrap'>
                    或使用
                  </Text>
                  <Divider />
                </HStack>

                {/* Google 登入 */}
                <Button
                  leftIcon={<FaGoogle />}
                  size='lg'
                  w='100%'
                  h='56px'
                  variant='outline'
                  borderColor='gray.200'
                  borderWidth='2px'
                  fontWeight='600'
                  borderRadius='lg'
                  _hover={{
                    bg: 'gray.50',
                    borderColor: 'gray.300',
                  }}
                  onClick={handleGoogleLogin}
                >
                  使用 Google 登入
                </Button>
              </VStack>
            </Box>
          </Box>
        </Flex>

        {/* 忘記密碼 Modal */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay backdropFilter='blur(4px)' />
          <ModalContent mx='16px' borderRadius='xl'>
            <ModalHeader>重設密碼</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <form onSubmit={handleSubmitForget(ForgetSubmit)}>
                <VStack spacing='20px'>
                  <FormControl isInvalid={!!errorsForget.email}>
                    <FormLabel>電子郵件</FormLabel>
                    <Input
                      type='email'
                      size='lg'
                      placeholder='請輸入您的信箱'
                      borderRadius='lg'
                      {...registerForget('email', { required: '請輸入電子信箱' })}
                    />
                    {errorsForget.email && (
                      <FormErrorMessage>
                        {errorsForget.email.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <Button
                    w='100%'
                    size='lg'
                    colorScheme='orange'
                    type='submit'
                    borderRadius='lg'
                  >
                    送出
                  </Button>
                </VStack>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </LoadingLayout>
  );
};

export default Login;
