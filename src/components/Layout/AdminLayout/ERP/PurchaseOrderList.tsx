import {
  Badge,
  Box,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

const PurchaseOrderList = () => {
  return (
    <Box
      bg='white'
      p='25px'
      borderRadius='10px'
      boxShadow='md'
      transition='all 0.3s ease'
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
      }}
    >
      <Heading
        fontSize='20px'
        mb='20px'
        color='blue.400'
        borderBottom='2px'
        borderColor='blue.400'
        pb='10px'
      >
        進貨訂單列表
      </Heading>
      <Box overflowX='auto'>
        <Table variant='simple'>
          <Thead bg='#4facfe'>
            <Tr>
              <Th color='white'>訂單編號</Th>
              <Th color='white'>供應商</Th>
              <Th color='white'>總金額</Th>
              <Th color='white'>訂單日期</Th>
              <Th color='white'>狀態</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr
              bg='#f8f9fa'
              _hover={{ bg: '#e9ecef', transform: 'scale(1.02)' }}
            >
              <Td>PO-001</Td>
              <Td>供應商A</Td>
              <Td>$5,000</Td>
              <Td>2024-07-20</Td>
              <Td>
                <Badge variant='solid' colorScheme='green'>
                  已完成
                </Badge>
              </Td>
            </Tr>
            <Tr
              bg='#f8f9fa'
              _hover={{ bg: '#e9ecef', transform: 'scale(1.02)' }}
            >
              <Td>PO-002</Td>
              <Td>供應商B</Td>
              <Td>$3,500</Td>
              <Td>2024-07-22</Td>
              <Td>
                <Badge variant='solid' colorScheme='yellow'>
                  處理中
                </Badge>
              </Td>
            </Tr>
            <Tr
              bg='#f8f9fa'
              _hover={{ bg: '#e9ecef', transform: 'scale(1.02)' }}
            >
              <Td>PO-003</Td>
              <Td>供應商C</Td>
              <Td>$2,800</Td>
              <Td>2024-07-23</Td>
              <Td>
                <Badge variant='solid' colorScheme='red'>
                  已取消
                </Badge>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default PurchaseOrderList;
