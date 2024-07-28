import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Pagination from '@components/Pagination';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  getPurchaseOrdersAsync,
  updatePurchaseOrderAsync,
} from '@reducers/admin/admin-erp/purchaseOrder/actions';
import { useEffect, useState } from 'react';

const PurchaseOrderList = () => {
  const dispatch = useAppDispatch();
  const { list: purchaseOrders, metadata } = useAppSelector(
    (state) => state.adminERPPurchaseOrder,
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPurchaseOrdersAsync({ page, limit: 10, search: searchTerm }));
  }, [dispatch, page, searchTerm]);

  const handleStatusChange = (
    orderId: string,
    newStatus: 'Pending' | 'Completed' | 'Cancelled',
  ) => {
    dispatch(
      updatePurchaseOrderAsync({ orderId, data: { status: newStatus } }),
    );
  };

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
      <HStack mb={4}>
        <Input
          placeholder='搜尋訂單'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          onClick={() =>
            dispatch(
              getPurchaseOrdersAsync({ page, limit: 10, search: searchTerm }),
            )
          }
        >
          搜尋
        </Button>
      </HStack>
      <Box overflowX='auto' className='tables-container'>
        <Table variant='simple' className='tables-container__table'>
          <Thead bg='#4facfe'>
            <Tr>
              <Th
                color='black'
                className='tables-container__header-cell tables-container__sticky-column'
              >
                供應商
              </Th>
              <Th color='white'>總金額</Th>
              <Th color='white'>訂單日期</Th>
              <Th color='white'>狀態</Th>
              <Th color='white'>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {purchaseOrders?.map((order) => (
              <Tr
                key={order._id}
                bg='#f8f9fa'
                _hover={{ bg: '#e9ecef', transform: 'scale(1.02)' }}
              >
                <Td className='tables-container__header-cell tables-container__sticky-column'>
                  {order.supplier.name}
                </Td>
                <Td className='tables-container__body-cell'>
                  ${order.totalAmount}
                </Td>
                <Td className='tables-container__body-cell'>
                  {new Date(order.orderDate).toLocaleDateString()}
                </Td>
                <Td className='tables-container__body-cell'>
                  <Badge
                    variant='solid'
                    colorScheme={
                      order.status === 'Completed'
                        ? 'green'
                        : order.status === 'Pending'
                        ? 'yellow'
                        : 'red'
                    }
                  >
                    {order.status === 'Completed'
                      ? '已完成'
                      : order.status === 'Pending'
                      ? '處理中'
                      : '已取消'}
                  </Badge>
                </Td>
                <Td className='tables-container__body-cell'>
                  <Select
                    ml={2}
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order._id,
                        e.target.value as 'Pending' | 'Completed' | 'Cancelled',
                      )
                    }
                    size='sm'
                  >
                    <option value='Pending'>處理中</option>
                    <option value='Completed'>已完成</option>
                    <option value='Cancelled'>已取消</option>
                  </Select>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {metadata && <Pagination metadata={metadata} />}
      </Box>
    </Box>
  );
};

export default PurchaseOrderList;
