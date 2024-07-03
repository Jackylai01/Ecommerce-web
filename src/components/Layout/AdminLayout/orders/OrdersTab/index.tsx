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
import { useEffect, useRef, useState } from 'react';

const OrdersTab = () => {
  const { list, metadata } = useAppSelector((state) => state.adminOrders);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const tableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (tableRef.current) {
        setIsOverflowing(
          tableRef.current.scrollWidth > tableRef.current.clientWidth,
        );
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  return (
    <Box
      bg='white'
      borderRadius='16px'
      boxShadow='md'
      overflow='hidden'
      minH='450px'
    >
      <Box className='tables-container' ref={tableRef}>
        <Table className='tables-container__table' variant='simple'>
          <Thead bg='gray.50'>
            <Tr>
              <Th className='tables-container__header-cell tables-container__sticky-column'>
                訂單ID
              </Th>
              <Th className='tables-container__header-cell'>用戶</Th>
              <Th className='tables-container__header-cell'>總金額</Th>
              <Th className='tables-container__header-cell'>狀態</Th>
              <Th className='tables-container__header-cell'>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {list &&
              list.map((order: ordersResponse) => (
                <Tr key={order._id}>
                  <Td className='tables-container__body-cell tables-container__sticky-column'>
                    {order.user.username}
                  </Td>
                  <Td className='tables-container__body-cell'>
                    {order?.paymentResult?.ecpayData.MerchantTradeNo}
                  </Td>
                  <Td className='tables-container__body-cell'>
                    {order.totalPrice}
                  </Td>
                  <Td className='tables-container__body-cell'>
                    <Badge colorScheme={statusColors[order.status]}>
                      {statusMap[order.status]}
                    </Badge>
                  </Td>
                  <Td className='tables-container__body-cell'>
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
        </Table>
        {isOverflowing && (
          <Box className='tables-container__gradient-overlay' />
        )}
      </Box>
      {metadata && <Pagination metadata={metadata} />}
    </Box>
  );
};

export default OrdersTab;
