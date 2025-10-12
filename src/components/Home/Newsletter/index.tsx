import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { FiMail, FiSend } from 'react-icons/fi';

export const Newsletter = () => {
  return (
    <Box py={{ base: '60px', md: '80px' }} bg='purple.600'>
      <Container maxW='container.md'>
        <Flex
          direction='column'
          align='center'
          textAlign='center'
          color='white'
        >
          {/* Icon */}
          <Box
            bg='whiteAlpha.200'
            p='20px'
            borderRadius='full'
            mb='24px'
            backdropFilter='blur(10px)'
          >
            <Icon as={FiMail} boxSize='32px' />
          </Box>

          {/* 標題 */}
          <VStack spacing='16px' mb='40px'>
            <Heading
              as='h2'
              fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
              fontWeight='bold'
            >
              訂閱電子報
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} maxW='500px' color='whiteAlpha.900'>
              獲取最新優惠資訊、新品上市通知，以及專屬會員福利
            </Text>
          </VStack>

          {/* 訂閱表單 */}
          <HStack
            as='form'
            w='100%'
            maxW='500px'
            spacing='12px'
            flexDirection={{ base: 'column', sm: 'row' }}
          >
            <Input
              placeholder='輸入您的電子郵件'
              size='lg'
              bg='white'
              color='gray.800'
              border='none'
              _placeholder={{ color: 'gray.400' }}
              _focus={{
                boxShadow: 'lg',
              }}
              flex='1'
              h='56px'
            />
            <Button
              size='lg'
              colorScheme='yellow'
              rightIcon={<FiSend />}
              px='32px'
              h='56px'
              w={{ base: '100%', sm: 'auto' }}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'xl',
              }}
              transition='all 0.3s'
            >
              訂閱
            </Button>
          </HStack>

          {/* 說明文字 */}
          <Text fontSize='sm' color='whiteAlpha.700' mt='16px'>
            訂閱即表示您同意我們的隱私權政策
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};
