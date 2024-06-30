import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

const PaymentFailure = () => {
  const router = useRouter();

  return (
    <>
      <Flex justify='center' align='center' minHeight='100vh'>
        <Box
          maxWidth='450px'
          padding='3rem'
          backgroundColor='#ffffff'
          borderRadius='16px'
          boxShadow='0 10px 30px rgba(0, 0, 0, 0.1)'
          textAlign='center'
        >
          <Box fontSize='4rem' color='#ff4d4f' marginBottom='1.5rem'>
            ❌
          </Box>
          <Heading
            fontSize='2.2rem'
            color='#262626'
            marginBottom='1.5rem'
            fontWeight='700'
          >
            付款失敗
          </Heading>
          <Text
            fontSize='1.1rem'
            color='#595959'
            marginBottom='2.5rem'
            lineHeight='1.6'
          >
            很抱歉，您的付款處理失敗。請檢查您的付款信息並重試，或聯繫我們的客戶支援尋求幫助。
          </Text>
          <VStack spacing='1rem'>
            <Button
              padding='0.8rem 1.5rem'
              fontSize='1.1rem'
              color='#ffffff'
              backgroundColor='#1890ff'
              borderRadius='8px'
              cursor='pointer'
              transition='all 0.3s ease'
              fontWeight='700'
              _hover={{
                backgroundColor: '#096dd9',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)',
              }}
              onClick={() => router.push('/')}
            >
              重試付款
            </Button>
            <Link
              padding='0.8rem 1.5rem'
              fontSize='1.1rem'
              color='#595959'
              textDecoration='none'
              border='2px solid #d9d9d9'
              borderRadius='8px'
              transition='all 0.3s ease'
              fontWeight='700'
              _hover={{
                color: '#262626',
                borderColor: '#595959',
                backgroundColor: '#f5f5f5',
              }}
              href='/'
            >
              返回首頁
            </Link>
          </VStack>
        </Box>
      </Flex>
    </>
  );
};

export default PaymentFailure;
