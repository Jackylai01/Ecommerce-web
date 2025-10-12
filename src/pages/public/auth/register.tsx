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
  Select,
  Text,
  VStack,
  HStack,
  Divider,
  useToast,
  Image,
  Icon,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { clientRegisterAsync } from '@reducers/client/auth/actions';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { FiMail, FiUser, FiArrowLeft } from 'react-icons/fi';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  birthday: string;
}

const Register: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const {
    userInfo,
    status: { registerLoading, registerSuccess, registerFailed },
    error: { registerError },
  } = useAppSelector((state) => state.clientAuth);

  const handlePasswordVisibility = () => setShowPassword(!showPassword);
  const handleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, [userInfo, router]);

  const onSubmit = (data: RegisterFormData) => {
    dispatch(clientRegisterAsync(data));
  };

  useEffect(() => {
    if (registerSuccess) {
      toast({
        title: '註冊成功',
        description: '歡迎加入！',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }

    if (registerFailed && registerError) {
      toast({
        title: '註冊失敗',
        description: registerError,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [registerSuccess, registerFailed, registerError, router, toast]);

  const password = watch('password');

  const handleGoogleRegister = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`;
  };

  return (
    <LoadingLayout isLoading={registerLoading}>
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
            src='https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=1200&fit=crop'
            alt='註冊背景'
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
              開啟你的
              <Text as='span' display='block'>
                時尚購物之旅
              </Text>
            </Heading>
            <Text fontSize='lg' lineHeight='1.8'>
              加入我們，探索無限可能。享受專屬會員優惠、
              個人化推薦，以及最貼心的購物體驗！
            </Text>
            <HStack spacing='40px' pt='20px'>
              <VStack>
                <Text fontSize='3xl' fontWeight='bold'>
                  免運
                </Text>
                <Text fontSize='sm'>全館免運費</Text>
              </VStack>
              <VStack>
                <Text fontSize='3xl' fontWeight='bold'>
                  24H
                </Text>
                <Text fontSize='sm'>快速到貨</Text>
              </VStack>
              <VStack>
                <Text fontSize='3xl' fontWeight='bold'>
                  365
                </Text>
                <Text fontSize='sm'>天天優惠</Text>
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
                建立新帳號
              </Heading>
              <Text fontSize='md' color='gray.600'>
                已經有帳號了？
                <Link
                  color='orange.500'
                  fontWeight='600'
                  ml='4px'
                  onClick={() => router.push('/public/auth/login')}
                >
                  立即登入
                </Link>
              </Text>
            </VStack>

            {/* 表單 */}
            <Box as='form' onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing='20px'>
                {/* Username */}
                <FormControl isInvalid={!!errors.username}>
                  <FormLabel color='gray.700' fontWeight='600'>
                    使用者名稱
                  </FormLabel>
                  <InputGroup size='lg'>
                    <InputRightElement pointerEvents='none'>
                      <Icon as={FiUser} color='gray.400' />
                    </InputRightElement>
                    <Input
                      type='text'
                      placeholder='請輸入使用者名稱'
                      borderRadius='lg'
                      borderColor='gray.200'
                      _hover={{ borderColor: 'gray.300' }}
                      _focus={{
                        borderColor: 'orange.400',
                        boxShadow: '0 0 0 1px var(--chakra-colors-orange-400)',
                      }}
                      {...register('username', {
                        required: '請填入使用者名稱',
                        minLength: {
                          value: 3,
                          message: '使用者名稱至少需要 3 個字元',
                        },
                      })}
                    />
                  </InputGroup>
                  {errors.username && (
                    <FormErrorMessage>{errors.username.message}</FormErrorMessage>
                  )}
                </FormControl>

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
                      {...register('email', {
                        required: '請填入電子信箱',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: '請填入有效的電子信箱',
                        },
                      })}
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
                      placeholder='請輸入密碼（至少8個字元）'
                      borderRadius='lg'
                      borderColor='gray.200'
                      _hover={{ borderColor: 'gray.300' }}
                      _focus={{
                        borderColor: 'orange.400',
                        boxShadow: '0 0 0 1px var(--chakra-colors-orange-400)',
                      }}
                      {...register('password', {
                        required: '請填入密碼',
                        minLength: {
                          value: 8,
                          message: '密碼至少需要 8 個字元',
                        },
                      })}
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

                {/* Confirm Password */}
                <FormControl isInvalid={!!errors.confirmPassword}>
                  <FormLabel color='gray.700' fontWeight='600'>
                    確認密碼
                  </FormLabel>
                  <InputGroup size='lg'>
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder='請再次輸入密碼'
                      borderRadius='lg'
                      borderColor='gray.200'
                      _hover={{ borderColor: 'gray.300' }}
                      _focus={{
                        borderColor: 'orange.400',
                        boxShadow: '0 0 0 1px var(--chakra-colors-orange-400)',
                      }}
                      {...register('confirmPassword', {
                        required: '請再次填入密碼',
                        validate: (value) =>
                          value === password || '密碼不一致',
                      })}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button
                        h='1.75rem'
                        size='sm'
                        onClick={handleConfirmPasswordVisibility}
                        variant='ghost'
                      >
                        {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {errors.confirmPassword && (
                    <FormErrorMessage>
                      {errors.confirmPassword.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                {/* Gender and Birthday in row */}
                <HStack w='100%' spacing='16px' align='flex-start'>
                  <FormControl isInvalid={!!errors.gender} flex='1'>
                    <FormLabel color='gray.700' fontWeight='600'>
                      性別
                    </FormLabel>
                    <Select
                      size='lg'
                      placeholder='請選擇'
                      borderRadius='lg'
                      borderColor='gray.200'
                      _hover={{ borderColor: 'gray.300' }}
                      _focus={{
                        borderColor: 'orange.400',
                        boxShadow: '0 0 0 1px var(--chakra-colors-orange-400)',
                      }}
                      {...register('gender', {
                        required: '請選擇性別',
                      })}
                    >
                      <option value='male'>男性</option>
                      <option value='female'>女性</option>
                      <option value='other'>其他</option>
                    </Select>
                    {errors.gender && (
                      <FormErrorMessage>{errors.gender.message}</FormErrorMessage>
                    )}
                  </FormControl>

                  <FormControl isInvalid={!!errors.birthday} flex='1'>
                    <FormLabel color='gray.700' fontWeight='600'>
                      生日
                    </FormLabel>
                    <Input
                      type='date'
                      size='lg'
                      borderRadius='lg'
                      borderColor='gray.200'
                      _hover={{ borderColor: 'gray.300' }}
                      _focus={{
                        borderColor: 'orange.400',
                        boxShadow: '0 0 0 1px var(--chakra-colors-orange-400)',
                      }}
                      {...register('birthday', {
                        required: '請選擇生日',
                      })}
                    />
                    {errors.birthday && (
                      <FormErrorMessage>{errors.birthday.message}</FormErrorMessage>
                    )}
                  </FormControl>
                </HStack>

                {/* 註冊按鈕 */}
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
                  註冊
                </Button>

                {/* 分隔線 */}
                <HStack w='100%' my='8px'>
                  <Divider />
                  <Text fontSize='sm' color='gray.500' whiteSpace='nowrap'>
                    或使用
                  </Text>
                  <Divider />
                </HStack>

                {/* Google 註冊 */}
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
                  onClick={handleGoogleRegister}
                >
                  使用 Google 註冊
                </Button>
              </VStack>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </LoadingLayout>
  );
};

export default Register;
