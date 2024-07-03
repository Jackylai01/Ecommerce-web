import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
} from '@chakra-ui/react';
import {
  PaymentStatus,
  PaymentTypeKey,
  paymentStatusMap,
  paymentTypeMap,
} from '@fixtures/payments';
import {
  LogisticsSubType,
  ShipmentStatus,
  logisticsSubTypeMap,
  shipmentStatusMap,
} from '@fixtures/shipment';
import { dateTime } from '@helpers/date';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getAdminOrdersDetailAsync } from '@reducers/admin/orders/actions';
import { useEffect } from 'react';

interface OpenOrdersDetail {
  selectedOrderId: string | null;
  isOpen: any;
  onClose: any;
}

const OrdersDetail = ({
  selectedOrderId,
  isOpen,
  onClose,
}: OpenOrdersDetail) => {
  const { detail } = useAppSelector((state) => state.adminOrders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedOrderId) {
      dispatch(getAdminOrdersDetailAsync(selectedOrderId));
    }
  }, [selectedOrderId, dispatch]);

  return (
    <Drawer isOpen={isOpen} placement='right' onClose={onClose} size='lg'>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>訂單詳情</DrawerHeader>
        <DrawerBody>
          {detail ? (
            <Box>
              <Heading size='md'>用戶資料</Heading>
              <Box mt={4}>
                <strong>用戶名：</strong> {detail.user.username}
                <br />
                <strong>Email：</strong> {detail.user.email}
                <br />
              </Box>
              <Heading size='md' mt={6}>
                訂單資訊
              </Heading>
              <Box mt={4}>
                <strong>訂單編號：</strong>
                {detail?.order?.paymentResult?.ecpayData.MerchantTradeNo}
                <br />
                <strong>訂單建立日期：</strong>
                {detail?.order?.createdAt
                  ? dateTime(detail?.order?.createdAt)
                  : '不明'}
                <br />
                <strong>總金額：</strong> {detail.order.totalPrice}
                <br />
              </Box>
              <Heading size='md' mt={6}>
                物流資訊
              </Heading>
              <Box mt={4}>
                {detail.shipments.map((shipment: any) => (
                  <Box key={shipment._id} mb={4}>
                    <strong>物流臨時訂單：</strong> {shipment.tempLogisticsID}
                    <br />
                    <strong>狀態：</strong>
                    {shipmentStatusMap[
                      shipment.shipmentStatus as ShipmentStatus
                    ] || shipment.shipmentStatus}
                    <br />
                    <strong>物流類型：</strong>
                    {logisticsSubTypeMap[
                      shipment.logisticsSubType as LogisticsSubType
                    ] || shipment.logisticsSubType}
                    <br />
                    <strong>物流門市：</strong> {shipment.receiverAddress}
                    <br />
                  </Box>
                ))}
              </Box>
              <Heading size='md' mt={6}>
                付款資訊
              </Heading>
              <Box mt={4}>
                {detail.payments.map((payment: any) => (
                  <Box key={payment._id} mb={4}>
                    <strong>付款方式描述：</strong>
                    {paymentTypeMap[payment.PaymentType as PaymentTypeKey] ??
                      `未知付款方式: ${payment.PaymentType}`}
                    <br />
                    <strong>金額：</strong> {payment.TotalAmount}
                    <br />
                    <strong>金流手續費：</strong>
                    {payment.PaymentTypeChargeFee}
                    <br />
                    <strong>狀態：</strong>
                    {paymentStatusMap[payment.PaymentStatus as PaymentStatus] ||
                      payment.PaymentStatus}
                    <br />
                  </Box>
                ))}
              </Box>
              <Heading size='md' mt={6}>
                發票資訊
              </Heading>
              <Box mt={4}>
                {detail.invoices.map((invoice: any) => (
                  <Box key={invoice._id} mb={4}>
                    <strong>發票號碼：</strong> {invoice.invoiceNumber}
                    <br />
                    <strong>總金額：</strong> {invoice.totalAmount}
                    <br />
                  </Box>
                ))}
              </Box>
            </Box>
          ) : (
            <Box>Loading...</Box>
          )}
        </DrawerBody>
        <DrawerFooter>
          <Button variant='outline' mr={3} onClick={onClose}>
            關閉
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default OrdersDetail;
