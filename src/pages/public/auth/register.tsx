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
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface BubbleStyle {
  left: string;
  animationDuration: string;
}

const Register: NextPage = () => {
  const router = useRouter();
  const [gender, setGender] = useState('male');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [bubbles, setBubbles] = useState<BubbleStyle[]>([]);
  const toast = useToast();

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const handleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  useEffect(() => {
    const generatedBubbles = [...Array(15)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 5 + 5}s`,
    }));
    setBubbles(generatedBubbles);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    toast({
      title: '註冊成功',
      description: '您已成功註冊。',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Flex
      as='main'
      alignItems='center'
      justifyContent='center'
      height='100vh'
      bg='gray.50'
    >
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
              註冊帳號
            </Box>
            <Box as='p' color='gray.600'>
              請填寫下方資訊以註冊
            </Box>
          </Box>
          <FormControl id='username' mb={4} isInvalid={!!errors.username}>
            <FormLabel>用戶名稱</FormLabel>
            <Input
              type='text'
              placeholder='請輸入您的用戶名稱'
              {...register('username', { required: '請填入用戶名稱' })}
            />
            {errors.username && (
              <FormErrorMessage>{errors.username.message}</FormErrorMessage>
            )}
          </FormControl>
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
                {...register('password', { required: '請填入密碼' })}
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
          <FormControl
            id='confirmPassword'
            mb={4}
            isInvalid={!!errors.confirmPassword}
          >
            <FormLabel>確認密碼</FormLabel>
            <InputGroup>
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='請再次輸入您的密碼'
                {...register('confirmPassword', { required: '請再次輸入密碼' })}
              />
              <InputRightElement width='4.5rem'>
                <Button
                  h='1.75rem'
                  size='sm'
                  onClick={handleConfirmPasswordVisibility}
                  bg='none'
                  _hover={{ bg: 'transparent' }}
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
          <FormControl as='fieldset' mb={4}>
            <FormLabel as='legend'>性別</FormLabel>
            <RadioGroup onChange={setGender} value={gender}>
              <Stack direction='row'>
                <Radio value='male'>男性</Radio>
                <Radio value='female'>女性</Radio>
                <Radio value='other'>其他</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <Button type='submit' colorScheme='blue' width='full' mb={4}>
            註冊
          </Button>
          <Flex justifyContent='space-between' fontSize='sm' color='gray.600'>
            <Link onClick={() => router.push(`/public/auth/login`)}>
              已經有帳號了?
            </Link>
            <Link onClick={() => router.push(`/`)}>回首頁</Link>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Register;
