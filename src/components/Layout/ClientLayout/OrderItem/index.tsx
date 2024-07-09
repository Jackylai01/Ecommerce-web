import { Badge, Box, Button, Heading, useDisclosure } from '@chakra-ui/react';
import ReturnStatusModal from '@components/Modal/ReturnStatusModal';
import { paymentStatusMap } from '@fixtures/payments';
import {
  getStatusShipmentColorScheme,
  logisticsSubTypeMap,
  shipmentStatusMap,
} from '@fixtures/shipment';
import { getPaymentStatusColorScheme } from '@fixtures/statusMaps';

interface Shipment {
  _id: string;
  shipmentStatus:
    | 'Pending'
    | 'Processing'
    | 'Shipped'
    | 'Delivered'
    | 'Returned';
  logisticsSubType: string;
  LogisticsID: string;
  ReceiverStoreName: string;
}

interface OrderItemProps {
  orderId: string | number;
  date: string;
  amount: string | number;
  refunds?: any[];
  shipments: Shipment[];
  paymentResult: any;
  payments: any[];
}

export const OrderItem: React.FC<OrderItemProps> = ({
  orderId,
  date,
  amount,
  refunds,
  shipments,
  paymentResult,
  payments,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      w='100%'
      bg='#f8f9fa'
      p='20px'
      borderRadius='12px'
      boxShadow='0 10px 20px rgba(0, 0, 0, 0.05)'
      borderLeft='5px solid #c0a080'
      _hover={{ transform: 'translateX(5px)' }}
    >
      <Heading as='h3' fontSize='20px'>
        訂單 {orderId}
      </Heading>
      <Box>下單日期: {date}</Box>
      <Box>
        {payments?.map((payment: any) => (
          <Box key={payment._id}>
            付款狀態:
            <Badge
              colorScheme={getPaymentStatusColorScheme(payment.PaymentStatus)}
            >
              {paymentStatusMap[payment.PaymentStatus]}
            </Badge>
          </Box>
        ))}
      </Box>
      <Box>
        訂單編號:
        <Badge>{paymentResult.ecpayData.MerchantTradeNo}</Badge>
      </Box>
      <Box mt='10px'>
        {shipments?.map((shipment) => (
          <Box key={shipment._id}>
            物流狀態:
            <Badge
              colorScheme={getStatusShipmentColorScheme(
                shipment.shipmentStatus,
              )}
            >
              {shipmentStatusMap[shipment.shipmentStatus]}
            </Badge>
            <Box>
              物流公司: {logisticsSubTypeMap[shipment.logisticsSubType]}
            </Box>
            {shipment.ReceiverStoreName && (
              <Box>送達地址: {shipment.ReceiverStoreName}</Box>
            )}
            {shipment.LogisticsID && (
              <Box>物流訂單編號: {shipment.LogisticsID}</Box>
            )}
          </Box>
        ))}
      </Box>
      <Box mt='10px'>總額: NT${amount}</Box>
      {refunds && refunds.length > 0 && (
        <Button colorScheme='teal' mt='10px' onClick={onOpen}>
          查看退換貨狀態
        </Button>
      )}
      <ReturnStatusModal isOpen={isOpen} onClose={onClose} refunds={refunds} />
    </Box>
  );
};
