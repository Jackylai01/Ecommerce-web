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
import LoadingLayout from '@components/Layout/LoadingLayout';
import Pagination from '@components/Pagination';
import { ShipmentStatus, shipmentStatusMap } from '@fixtures/shipment';
import { tradeStatusMap } from '@fixtures/statusMaps';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { ShipmentResponse } from '@models/responses/shipments.res';
import { getAdminEcPayQueryAsync } from '@reducers/admin/payments/actions';
import { CreateShipmentsAsync } from '@reducers/admin/shipments/actions';
import { useEffect, useRef, useState } from 'react';
import { FaTruck } from 'react-icons/fa';

const ShipmentsTab = () => {
  const {
    pendingList: pendingShipments,
    metadata: shipmentsMetadata,
    status: { createShipmentsLoading },
  } = useAppSelector((state) => state.adminShipment);
  const { ecPayOrders } = useAppSelector((state) => state.adminPayments);

  const dispatch = useAppDispatch();
  const [isOverflowing, setIsOverflowing] = useState(false);
  const tableRef = useRef<HTMLDivElement | null>(null);

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
      CreateShipmentsAsync({
        tempLogisticsID: shipment.tempLogisticsID,
        merchantTradeNo:
          shipment.orderId.paymentResult?.ecpayData.MerchantTradeNo,
        orderId: shipment.orderId._id,
      }),
    );
  };

  return (
    <LoadingLayout isLoading={createShipmentsLoading}>
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
                <Th className='tables-container__header-cell'>承運商</Th>
                <Th className='tables-container__header-cell'>收件人</Th>
                <Th className='tables-container__header-cell'>出貨狀態</Th>
                <Th className='tables-container__header-cell'>付款狀態</Th>
                <Th className='tables-container__header-cell'>操作</Th>
              </Tr>
            </Thead>
            <Tbody>
              {pendingShipments &&
                pendingShipments.map((shipment: ShipmentResponse) => (
                  <Tr key={shipment._id}>
                    <Td className='tables-container__body-cell tables-container__sticky-column'>
                      {shipment.tempLogisticsID}
                    </Td>
                    <Td className='tables-container__body-cell'>
                      {shipment.carrier}
                    </Td>
                    <Td className='tables-container__body-cell'>
                      {shipment.receiverName}
                    </Td>
                    <Td className='tables-container__body-cell'>
                      <Badge colorScheme='orange'>
                        {shipmentStatusMap[
                          shipment.shipmentStatus as ShipmentStatus
                        ] || shipment.shipmentStatus}
                      </Badge>
                    </Td>
                    <Td className='tables-container__body-cell'>
                      {ecPayOrders?.TradeStatus ? (
                        <Badge colorScheme='blue'>
                          {tradeStatusMap[ecPayOrders?.TradeStatus]}
                        </Badge>
                      ) : (
                        <Badge colorScheme='gray'>無狀態</Badge>
                      )}
                    </Td>

                    <Td className='tables-container__body-cell'>
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
