import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { useState } from 'react';
import { FaDollarSign, FaEye, FaFilter, FaPlus } from 'react-icons/fa';

interface Transaction {
  id: string;
  date: string;
  amount: string;
  status: string;
  paymentMethod: string;
  customerName: string;
  productDescription: string;
}

interface TransactionsData {
  [key: string]: Transaction;
}

const transactionsData: TransactionsData = {
  TRX001: {
    id: 'TRX001',
    date: '2024-07-01',
    amount: '$1,000',
    status: '完成',
    paymentMethod: '信用卡',
    customerName: '張三',
    productDescription: '商品A',
  },
  TRX002: {
    id: 'TRX002',
    date: '2024-07-02',
    amount: '$750',
    status: '處理中',
    paymentMethod: '信用卡',
    customerName: '李四',
    productDescription: '商品B',
  },
};

const FinanceManagement: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const handleViewDetails = (transactionId: keyof TransactionsData) => {
    setSelectedTransaction(transactionsData[transactionId]);
    onOpen();
  };

  return (
    <Box bg='#f0f4f8' minH='100vh' py='8'>
      <Box maxW='1200px' mx='auto' px='4'>
        <Flex justify='flex-end' align='center' mb='8'>
          <Button
            leftIcon={<FaPlus />}
            colorScheme='purple'
            size='lg'
            className='btn-primary'
          >
            新增交易
          </Button>
        </Flex>

        <Box
          bg='white'
          borderRadius='16px'
          boxShadow='md'
          p='6'
          mb='8'
          className='animate-slide-up'
        >
          <Heading
            as='h3'
            fontSize='xl'
            fontWeight='semibold'
            mb='4'
            color='gray.700'
          >
            <FaFilter className='mr-2 text-indigo-600' /> 篩選器
          </Heading>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap='6'>
            <Box position='relative'>
              <Input type='date' placeholder='開始日期' pl='10' />
              <Box
                position='absolute'
                top='50%'
                left='10px'
                transform='translateY(-50%)'
              >
                <FaDollarSign color='gray.400' />
              </Box>
            </Box>
            <Box position='relative'>
              <Input type='date' placeholder='結束日期' pl='10' />
              <Box
                position='absolute'
                top='50%'
                left='10px'
                transform='translateY(-50%)'
              >
                <FaDollarSign color='gray.400' />
              </Box>
            </Box>
            <Box position='relative'>
              <Select placeholder='全部金額' pl='10'>
                <option value='0-1000'>$0 - $1,000</option>
                <option value='1001-5000'>$1,001 - $5,000</option>
                <option value='5001+'>$5,001+</option>
              </Select>
              <Box
                position='absolute'
                top='50%'
                left='10px'
                transform='translateY(-50%)'
              >
                <FaDollarSign color='gray.400' />
              </Box>
            </Box>
            <Box position='relative'>
              <Select placeholder='全部狀態' pl='10'>
                <option value='completed'>完成</option>
                <option value='processing'>處理中</option>
                <option value='failed'>失敗</option>
              </Select>
              <Box
                position='absolute'
                top='50%'
                left='10px'
                transform='translateY(-50%)'
              >
                <FaDollarSign color='gray.400' />
              </Box>
            </Box>
          </Grid>
          <Button
            colorScheme='purple'
            size='lg'
            mt='6'
            mx='auto'
            display='block'
          >
            應用篩選
          </Button>
        </Box>

        <Box
          bg='white'
          borderRadius='16px'
          boxShadow='md'
          overflow='hidden'
          minH='450px'
          overflowX='auto'
        >
          <Box minW='900px'>
            <Table variant='simple'>
              <Thead bg='gray.50'>
                <Tr>
                  <Th>交易ID</Th>
                  <Th>日期</Th>
                  <Th>金額</Th>
                  <Th>狀態</Th>
                  <Th>操作</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>TRX001</Td>
                  <Td>2024-07-01</Td>
                  <Td>$1,000</Td>
                  <Td>
                    <Badge colorScheme='green'>完成</Badge>
                  </Td>
                  <Td>
                    <Button
                      variant='link'
                      colorScheme='blue'
                      onClick={() => handleViewDetails('TRX001')}
                      className='hover-scale'
                    >
                      <FaEye className='mr-1' /> 查看詳情
                    </Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td>TRX002</Td>
                  <Td>2024-07-02</Td>
                  <Td>$750</Td>
                  <Td>
                    <Badge colorScheme='yellow'>處理中</Badge>
                  </Td>
                  <Td>
                    <Button
                      variant='link'
                      colorScheme='blue'
                      onClick={() => handleViewDetails('TRX002')}
                      className='hover-scale'
                    >
                      <FaEye className='mr-1' /> 查看詳情
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='animate-slide-up'>
          <ModalHeader>交易詳情</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedTransaction && (
              <Box>
                <Text>
                  <strong>交易ID:</strong> {selectedTransaction.id}
                </Text>
                <Text>
                  <strong>日期:</strong> {selectedTransaction.date}
                </Text>
                <Text>
                  <strong>金額:</strong> {selectedTransaction.amount}
                </Text>
                <Text>
                  <strong>狀態:</strong> {selectedTransaction.status}
                </Text>
                <Text>
                  <strong>支付方式:</strong> {selectedTransaction.paymentMethod}
                </Text>
                <Text>
                  <strong>客戶名稱:</strong> {selectedTransaction.customerName}
                </Text>
                <Text>
                  <strong>商品描述:</strong>{' '}
                  {selectedTransaction.productDescription}
                </Text>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              關閉
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default FinanceManagement;
