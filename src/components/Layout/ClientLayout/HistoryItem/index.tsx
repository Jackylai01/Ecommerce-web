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
import { getStatusColorScheme, statusMap } from '@fixtures/statusMaps';
import { Order } from '@models/responses/orders.res';

interface HistoryType {
  orderHistoryList: Order[];
}

const HistoryItem = ({ orderHistoryList }: HistoryType) => (
  <Box className='tables-container'>
    <Table className='tables-container__table' variant='simple'>
      <Thead bg='gray.100'>
        <Tr>
          <Th
            className='tables-container__header-cell'
            bg='gray.100'
            color='gray.600'
          >
            訂單編號
          </Th>
          <Th
            className='tables-container__header-cell'
            bg='gray.100'
            color='gray.600'
          >
            總金額
          </Th>
          <Th
            className='tables-container__header-cell'
            bg='gray.100'
            color='gray.600'
          >
            訂單狀態
          </Th>
          <Th
            className='tables-container__header-cell'
            bg='gray.100'
            color='gray.600'
          >
            收件地址
          </Th>
          <Th
            className='tables-container__header-cell'
            bg='gray.100'
            color='gray.600'
          >
            收件人
          </Th>
          <Th
            className='tables-container__header-cell'
            bg='gray.100'
            color='gray.600'
          >
            收件人手機
          </Th>
          <Th
            className='tables-container__header-cell'
            bg='gray.100'
            color='gray.600'
          >
            收件人信箱
          </Th>
          <Th
            className='tables-container__header-cell'
            bg='gray.100'
            color='gray.600'
          >
            操作
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {orderHistoryList.map((order) => (
          <Tr key={order._id} color='gray.800'>
            <Td className='tables-container__body-cell'>
              {order.paymentResult?.ecpayData.MerchantTradeNo}
            </Td>
            <Td className='tables-container__body-cell'>
              {order.totalPrice.toLocaleString()}
            </Td>
            <Td className='tables-container__body-cell'>
              <Badge colorScheme={getStatusColorScheme(order.status)}>
                {statusMap[order.status]}
              </Badge>
            </Td>
            <Td className='tables-container__body-cell'>
              {order.shippingAddress?.address}
            </Td>
            <Td className='tables-container__body-cell'>
              {order.receiverName}
            </Td>
            <Td className='tables-container__body-cell'>
              {order.receiverCellPhone}
            </Td>
            <Td className='tables-container__body-cell'>
              {order.receiverEmail}
            </Td>
            <Td className='tables-container__body-cell'>
              <Button
                // onClick={() => handleViewDetails(order._id)}
                colorScheme='teal'
                variant='outline'
              >
                查看詳情
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Box>
);

export default HistoryItem;
