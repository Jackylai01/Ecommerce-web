import {
  Badge,
  Box,
  Heading,
  Input,
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
import { getSalesOrdersAsync } from '@reducers/admin/admin-erp/salesOrder/actions';
import { useEffect, useState } from 'react';

const SalesOrderList = () => {
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();

  const { list: salesOrdersList, metadata } = useAppSelector(
    (state) => state.adminERPSalesOrder,
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    dispatch(getSalesOrdersAsync({ page: 1, limit: 10, search }));
  }, [dispatch, search]);

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
      <Input
        placeholder='搜尋訂單編號或客戶姓名'
        value={search}
        onChange={handleSearchChange}
        mb='20px'
      />
      <Box overflowX='auto' className='tables-container'>
        <Table variant='simple' className='tables-container__table'>
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
            {Array.isArray(salesOrdersList) &&
              salesOrdersList.map((order) => (
                <Tr
                  key={order._id}
                  bg='#f8f9fa'
                  _hover={{ bg: '#e9ecef', transform: 'scale(1.02)' }}
                >
                  <Td className='tables-container__header-cell tables-container__sticky-column'>
                    {order._id}
                  </Td>
                  <Td className='tables-container__body-cell'>
                    {order.user && order.user.username
                      ? order.user.username
                      : 'N/A'}
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
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
      {metadata && <Pagination metadata={metadata} />}
    </Box>
  );
};

export default SalesOrderList;
