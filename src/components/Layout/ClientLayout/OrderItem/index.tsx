import {
  Badge,
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import ReturnStatusModal from '@components/Modal/ReturnStatusModal';
import { paymentStatusMap } from '@fixtures/payments';
import {
  getStatusShipmentColorScheme,
  logisticsSubTypeMap,
  shipmentStatusMap,
} from '@fixtures/shipment';
import { getPaymentStatusColorScheme } from '@fixtures/statusMaps';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { resetCancelOrderState } from '@reducers/client/orders';
import { cancelClientOrderAsync } from '@reducers/client/orders/actions';
import { useEffect } from 'react';

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
  orderId: string;
  date: string;
  amount: string | number;
  refunds?: any[];
  shipments: Shipment[];
  paymentResult: any;
  payments: any[];
  invoice: any; // 添加這一行
}

export const OrderItem: React.FC<OrderItemProps> = ({
  orderId,
  date,
  amount,
  refunds,
  shipments,
  paymentResult,
  payments,
  invoice,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCancelOpen,
    onOpen: onCancelOpen,
    onClose: onCancelClose,
  } = useDisclosure();
  const dispatch = useAppDispatch();
  const {
    status: { cancelOrderFailed, cancelOrderLoading, cancelOrderSuccess },
    error: { cancelOrderError },
  } = useAppSelector((state) => state.clientOrders);
  const toast = useToast();

  const handleCancelOrder = async () => {
    const isPending = shipments.every(
      (shipment) => shipment.shipmentStatus === 'Pending',
    );
    if (!isPending) {
      onCancelOpen();
    } else {
      dispatch(cancelClientOrderAsync(orderId));
    }
  };

  useEffect(() => {
    if (cancelOrderSuccess) {
      toast({
        title: '訂單已取消',
        description: '您的訂單已成功取消。',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      dispatch(resetCancelOrderState());
    } else if (cancelOrderFailed) {
      toast({
        title: '取消失敗',
        description: cancelOrderError,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      dispatch(resetCancelOrderState());
    }
  }, [cancelOrderFailed, cancelOrderSuccess, cancelOrderError, toast]);

  return (
    <LoadingLayout isLoading={cancelOrderLoading}>
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
        <Box>發票號碼: {invoice?.invoiceNumber || '尚未開立'}</Box>
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
        <Box
          mt='10px'
          onClick={handleCancelOrder}
          cursor='pointer'
          display='flex'
          justifyContent='flex-end'
        >
          取消訂單
        </Box>
        <ReturnStatusModal
          isOpen={isOpen}
          onClose={onClose}
          refunds={refunds}
        />
        <Modal isOpen={isCancelOpen} onClose={onCancelClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>無法取消訂單</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>產品已經出貨，不能取消訂單。請與客服進行聯繫，謝謝。</Box>
            </ModalBody>
            <ModalFooter>
              <Button mt='10px' onClick={onCancelClose}>
                確定
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </LoadingLayout>
  );
};
