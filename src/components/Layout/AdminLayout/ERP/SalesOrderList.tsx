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
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getSalesOrdersAsync } from '@reducers/admin/admin-erp/salesOrder/actions';
import { useEffect } from 'react';

const SalesOrderList = () => {
  const dispatch = useAppDispatch();
  const { list: salesOrdersList } = useAppSelector(
    (state) => state.adminERPSalesOrder,
  );

  useEffect(() => {
    dispatch(getSalesOrdersAsync({ page: 1, limit: 10 }));
  }, [dispatch]);

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
        銷售訂單列表
      </Heading>
      <Box overflowX='auto'>
        <Table variant='simple'>
          <Thead bg='#4facfe'>
            <Tr>
              <Th color='white'>訂單編號</Th>
              <Th color='white'>客戶</Th>
              <Th color='white'>總金額</Th>
              <Th color='white'>訂單日期</Th>
              <Th color='white'>狀態</Th>
            </Tr>
          </Thead>
          <Tbody>
            {salesOrdersList?.map((order) => (
              <Tr
                key={order._id}
                bg='#f8f9fa'
                _hover={{ bg: '#e9ecef', transform: 'scale(1.02)' }}
              >
                <Td>{order._id}</Td>
                <Td>{order.user}</Td>
                <Td>${order.totalAmount}</Td>
                <Td>{new Date(order.orderDate).toLocaleDateString()}</Td>
                <Td>
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
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SalesOrderList;
