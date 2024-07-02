import {
  Badge,
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Pagination from '@components/Pagination';
import { statusColors, statusMap } from '@helpers/statusMaps';
import useAppSelector from '@hooks/useAppSelector';
import { ordersResponse } from '@models/responses/orders.res';

const OrdersTab = () => {
  const { list, metadata } = useAppSelector((state) => state.adminOrders);

  return (
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
              <Th>訂單ID</Th>
              <Th>用戶</Th>
              <Th>總金額</Th>
              <Th>狀態</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {list &&
              list.map((order: ordersResponse) => (
                <Tr key={order._id}>
                  <Td>{order._id}</Td>
                  <Td>{order.user.username}</Td>
                  <Td>{order.totalPrice}</Td>
                  <Td>
                    <Badge colorScheme={statusColors[order.status]}>
                      {statusMap[order.status]}
                    </Badge>
                  </Td>
                  <Td>
                    <Button
                      variant='link'
                      colorScheme='blue'
                      className='hover-scale'
                    >
                      查看詳情
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
          {metadata && <Pagination metadata={metadata} />}
        </Table>
      </Box>
    </Box>
  );
};

export default OrdersTab;
