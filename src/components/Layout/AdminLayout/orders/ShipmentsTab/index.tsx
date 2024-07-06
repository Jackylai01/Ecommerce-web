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
  useToast,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import Pagination from '@components/Pagination';
import { ShipmentStatus, shipmentStatusMap } from '@fixtures/shipment';
import { tradeStatusMap } from '@fixtures/statusMaps';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { ShipmentResponse } from '@models/responses/shipments.res';
import { getAdminEcPayQueryAsync } from '@reducers/admin/payments/actions';
import {
  createShipmentsAsync,
  getFormalShipmentsAsync,
  getPendingShipmentsAsync,
} from '@reducers/admin/shipments/actions';
import { useEffect, useRef, useState } from 'react';
import { FaTruck } from 'react-icons/fa';
import { useAdminColorMode } from 'src/context/colorMode';

const ShipmentsTab = () => {
  const {
    pendingList: pendingShipments,
    metadata: shipmentsMetadata,
    status: {
      createShipmentsLoading,
      createShipmentsSuccess,
      createShipmentsFailed,
    },
    error: { createShipmentsError },
  } = useAppSelector((state) => state.adminShipment);
  const { ecPayOrders } = useAppSelector((state) => state.adminPayments);

  const dispatch = useAppDispatch();
  const [isOverflowing, setIsOverflowing] = useState(false);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const toast = useToast();

  const { colorMode } = useAdminColorMode();
  const textColor = colorMode === 'light' ? 'gray.700' : 'white';
  const bgColor = colorMode === 'light' ? 'white' : 'gray.700';

  useEffect(() => {
    if (pendingShipments) {
      pendingShipments.forEach((shipment: ShipmentResponse) => {
        if (shipment.orderId.paymentResult?.ecpayData.MerchantTradeNo) {
          dispatch(
            getAdminEcPayQueryAsync(
              shipment.orderId.paymentResult.ecpayData.MerchantTradeNo,
            ),
          );
        }
      });
    }
  }, [dispatch, pendingShipments]);

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

  const handleCreateShipment = (shipment: ShipmentResponse) => {
    dispatch(
      createShipmentsAsync({
        tempLogisticsID: shipment.tempLogisticsID,
        merchantTradeNo:
          shipment.orderId.paymentResult?.ecpayData.MerchantTradeNo,
        orderId: shipment.orderId._id,
      }),
    );
  };

  useEffect(() => {
    if (createShipmentsSuccess) {
      dispatch(getPendingShipmentsAsync({ page: 1, limit: 10 }));
      dispatch(getFormalShipmentsAsync({ page: 1, limit: 10 }));
      toast({
        title: '建立成功',
        description: '正式物流訂單已成功建立。',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    } else if (createShipmentsError) {
      toast({
        title: '建立失敗',
        description: `正式物流訂單建立失敗。${createShipmentsError}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  }, [dispatch, createShipmentsSuccess, toast]);

  return (
    <LoadingLayout isLoading={createShipmentsLoading}>
      <Box
        bg={bgColor}
        borderRadius='16px'
        boxShadow='md'
        overflow='hidden'
        minH='450px'
      >
        <Box className='tables-container' ref={tableRef}>
          <Table className='tables-container__table' variant='simple'>
            <Thead bg={bgColor}>
              <Tr>
                <Th
                  className='tables-container__header-cell tables-container__sticky-column'
                  bg={bgColor}
                  color={textColor}
                >
                  物流臨時訂單ID
                </Th>
                <Th
                  className='tables-container__header-cell'
                  bg={bgColor}
                  color={textColor}
                >
                  承運商
                </Th>
                <Th
                  className='tables-container__header-cell'
                  bg={bgColor}
                  color={textColor}
                >
                  收件人
                </Th>
                <Th
                  className='tables-container__header-cell'
                  bg={bgColor}
                  color={textColor}
                >
                  出貨狀態
                </Th>
                <Th
                  className='tables-container__header-cell'
                  bg={bgColor}
                  color={textColor}
                >
                  對帳狀態(綠界)
                </Th>
                <Th
                  className='tables-container__header-cell'
                  bg={bgColor}
                  color={textColor}
                >
                  操作
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {pendingShipments &&
                pendingShipments.map((shipment: ShipmentResponse) => (
                  <Tr key={shipment._id}>
                    <Td
                      className='tables-container__body-cell tables-container__sticky-column'
                      bg={bgColor}
                      color={textColor}
                    >
                      {shipment.tempLogisticsID}
                    </Td>
                    <Td
                      className='tables-container__body-cell'
                      bg={bgColor}
                      color={textColor}
                    >
                      {shipment.carrier}
                    </Td>
                    <Td
                      className='tables-container__body-cell'
                      bg={bgColor}
                      color={textColor}
                    >
                      {shipment.receiverName}
                    </Td>
                    <Td
                      className='tables-container__body-cell'
                      bg={bgColor}
                      color={textColor}
                    >
                      <Badge colorScheme='orange'>
                        {shipmentStatusMap[
                          shipment.shipmentStatus as ShipmentStatus
                        ] || shipment.shipmentStatus}
                      </Badge>
                    </Td>
                    <Td
                      className='tables-container__body-cell'
                      bg={bgColor}
                      color={textColor}
                    >
                      {ecPayOrders?.TradeStatus ? (
                        <Badge colorScheme='blue'>
                          {tradeStatusMap[ecPayOrders?.TradeStatus]}
                        </Badge>
                      ) : (
                        <Badge colorScheme='gray'>無狀態</Badge>
                      )}
                    </Td>
                    <Td
                      className='tables-container__body-cell'
                      bg={bgColor}
                      color={textColor}
                    >
                      <Button
                        leftIcon={<FaTruck />}
                        colorScheme='green'
                        size='sm'
                        m={1}
                        onClick={() => handleCreateShipment(shipment)}
                      >
                        建立正式物流訂單
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
        {shipmentsMetadata && <Pagination metadata={shipmentsMetadata} />}
      </Box>
    </LoadingLayout>
  );
};

export default ShipmentsTab;
