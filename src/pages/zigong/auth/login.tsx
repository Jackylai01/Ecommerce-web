import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import { ADMIN_ROUTE } from '@fixtures/constants';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  adminForgetPasswordAsync,
  adminLoginAsync,
} from '@reducers/admin/auth/actions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
  const dispatch = useAppDispatch();
  const titleColor = useColorModeValue('teal.300', 'teal.200');
  const textColor = useColorModeValue('gray.400', 'white');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const {
    userInfo,
    status: { loginLoading, forgetPasswordSuccess, loginSuccess },
    error: { loginError },
  } = useAppSelector((state) => state.adminAuth);

  useEffect(() => {
    if (userInfo || loginSuccess) {
      router.push(`/${ADMIN_ROUTE}`);
    }
  }, [userInfo, router]);

  useEffect(() => {
    if (forgetPasswordSuccess) {
      toast({
        title: '成功',
        description: '郵件已送出',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }
  }, [forgetPasswordSuccess, toast, onClose]);

  const handleLogin = (data: any) => {
    dispatch(adminLoginAsync(data));
  };

  const forgotPassword = (data: any) => {
    dispatch(adminForgetPasswordAsync(data));
  };

  return (
    <LoadingLayout isLoading={loginLoading}>
      <Flex position='relative' mb='40px'>
        <Flex
          h={{ sm: 'initial', md: '75vh', lg: '85vh' }}
          w='100%'
          maxW='1044px'
          mx='auto'
          justifyContent='space-between'
          mb='30px'
          pt={{ sm: '100px', md: '0px' }}
        >
          <Flex
            alignItems='center'
            justifyContent='start'
            style={{ userSelect: 'none' }}
            w={{ base: '100%', md: '50%', lg: '42%' }}
          >
            <form onSubmit={handleSubmit(handleLogin)}>
              <Flex
                direction='column'
                w='100%'
                background='transparent'
                p='48px'
                mt={{ md: '150px', lg: '80px' }}
              >
                <Heading color={titleColor} fontSize='32px' mb='10px'>
                  Welcome Back
                </Heading>
                <Text
                  mb='36px'
                  ms='4px'
                  color={textColor}
                  fontWeight='bold'
                  fontSize='14px'
                >
                  Enter your email and password to sign in
                </Text>
                <FormControl>
                  <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                    Email
                  </FormLabel>
                  <Input
                    id='email'
                    {...register('email', {
                      required: 'This is required',
                    })}
                    borderRadius='15px'
                    mb='24px'
                    fontSize='sm'
                    type='text'
                    placeholder='Your email address'
                    size='lg'
                  />
                  <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                    Password
                  </FormLabel>
                  <Input
                    id='password'
                    {...register('password', {
                      required: 'This is required',
                    })}
                    borderRadius='15px'
                    mb='36px'
                    fontSize='sm'
                    type='password'
                    placeholder='Your password'
                    size='lg'
                  />
                  <FormControl display='flex' alignItems='center'>
                    <Switch id='remember-login' colorScheme='teal' me='10px' />
                    <FormLabel
                      htmlFor='remember-login'
                      mb='0'
                      ms='1'
                      fontWeight='normal'
                    >
                      Remember me
                    </FormLabel>
                  </FormControl>
                  <Button
                    fontSize='10px'
                    type='submit'
                    bg='teal.300'
                    w='100%'
                    h='45'
                    mb='20px'
                    color='white'
                    mt='20px'
                    _hover={{
                      bg: 'teal.200',
                    }}
                    _active={{
                      bg: 'teal.400',
                    }}
                  >
                    SIGN IN
                  </Button>
                </FormControl>
                <Flex
                  flexDirection='column'
                  justifyContent='center'
                  alignItems='center'
                  maxW='100%'
                  mt='0px'
                >
                  <Text color={textColor} fontWeight='medium'>
                    Don't have an account?
                    <Link
                      color={titleColor}
                      as='span'
                      ms='5px'
                      fontWeight='bold'
                    >
                      Sign Up
                    </Link>
                  </Text>
                  <Text color={textColor} fontWeight='medium' onClick={onOpen}>
                    Forget password
                  </Text>
                </Flex>
              </Flex>
            </form>
          </Flex>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>請輸入您的電子郵件</ModalHeader>
              <ModalCloseButton />
              <form onSubmit={handleSubmit(forgotPassword)}>
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>電子郵件</FormLabel>
                    <Input
                      placeholder='電子郵件'
                      {...register('email', {
                        required: 'Required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: 'invalid email address',
                        },
                      })}
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} type='submit'>
                    Submit
                  </Button>
                  <Button onClick={onClose}>取消</Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
          <Box
            display={{ base: 'none', md: 'block' }}
            overflowX='hidden'
            h='100%'
            w='40vw'
            position='absolute'
            right='0px'
          >
            <Box
              bgImage='/assets/img/signInImage.png'
              w='100%'
              h='100%'
              bgSize='cover'
              bgPosition='50%'
              position='absolute'
              borderBottomLeftRadius='20px'
            ></Box>
          </Box>
        </Flex>
      </Flex>
    </LoadingLayout>
  );
};

export default Login;
