import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Form from '@components/Form';
import LoadingLayout from '@components/Layout/LoadingLayout';
import { ADMIN_ROUTE } from '@fixtures/constants';
import { loginFieldConfigs } from '@fixtures/form-configs/login';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  adminForgetPasswordAsync,
  adminLoginAsync,
} from '@reducers/admin/auth/actions';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const AdminAuthLoginPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const boxWidth = useBreakpointValue({ base: '100%', md: '25%' });
  const imageDisplay = useBreakpointValue({ base: 'none', md: 'block' });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const {
    userInfo,
    status: { loginLoading, forgetPasswordSuccess },
    error: { loginError },
  } = useAppSelector((state) => state.adminAuth);

  useEffect(() => {
    if (userInfo) {
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
      <Flex h='100vh' w='100%'>
        <Box
          as='main'
          w={boxWidth}
          h='100%'
          display='flex'
          flexDirection='column'
          justifyContent='center'
          overflow='hidden'
        >
          <Box as='h1'>會員登入</Box>
          <Form fieldConfigs={loginFieldConfigs} onSubmit={handleLogin}>
            {loginError && (
              <section className='row__col'>
                <p className='form__error-message'>{loginError}</p>
              </section>
            )}
            <Button type='submit' w='100%' bg='cadetblue' mt='1rem'>
              登入系統
            </Button>
          </Form>
          <Button
            onClick={onOpen}
            color='white'
            bg='black'
            borderRadius={0}
            _hover={{ bg: 'gray.800', color: 'white.500' }}
          >
            忘記密碼
          </Button>
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
                    提交
                  </Button>
                  <Button onClick={onClose}>取消</Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
        </Box>
        <Box
          as='header'
          h='100%'
          w='80%'
          position='relative'
          display={imageDisplay}
        >
          <Image
            src='/images/demo-background.png'
            alt='Background image'
            layout='fill'
            objectFit='cover'
          />
        </Box>
      </Flex>
    </LoadingLayout>
  );
};

export default AdminAuthLoginPage;
