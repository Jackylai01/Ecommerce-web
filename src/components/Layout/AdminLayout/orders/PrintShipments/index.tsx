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
import {
  ShipmentStatus,
  getStatusShipmentColorScheme,
  shipmentStatusMap,
} from '@fixtures/shipment';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  getFormalShipmentsAsync,
  printTradeShipmentsAsync,
} from '@reducers/admin/shipments/actions';
import { useEffect, useRef, useState } from 'react';

const PrintShipments = () => {
  const dispatch = useAppDispatch();
  const { formalList, FormalMetadata, printTradeShipments } = useAppSelector(
    (state) => state.adminShipment,
  );

  const [isOverflowing, setIsOverflowing] = useState(false);
  const tableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(getFormalShipmentsAsync({ page: 1, limit: 10 }));
  }, [dispatch]);

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

  const handlePrint = async (LogisticsID: string, LogisticsSubType: any) => {
    dispatch(printTradeShipmentsAsync({ LogisticsID, LogisticsSubType }));
  };

  useEffect(() => {
    if (printTradeShipments) {
      const printWindow = window.open('', '_blank', 'width=800,height=600');
      if (printWindow) {
        printWindow.document.write(printTradeShipments);
        printWindow.document.close();
        printWindow.focus();
      } else {
        alert('無法打開新窗口。請檢查您的瀏覽器設定允許彈出窗口。');
      }
    }
  }, [printTradeShipments]);

  return (
    <LoadingLayout isLoading={false}>
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
                <Th className='tables-container__header-cell'>操作</Th>
              </Tr>
            </Thead>
            <Tbody>
              {formalList &&
                formalList.map((shipment) => (
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
                      <Badge
                        colorScheme={getStatusShipmentColorScheme(
                          shipment.shipmentStatus,
                        )}
                      >
                        {shipmentStatusMap[
                          shipment.shipmentStatus as ShipmentStatus
                        ] || shipment.shipmentStatus}
                      </Badge>
                    </Td>
                    <Td className='tables-container__body-cell'>
                      <Button
                        colorScheme='blue'
                        size='sm'
                        m={1}
                        onClick={() =>
                          handlePrint(
                            shipment.LogisticsID,
                            shipment.logisticsSubType,
                          )
                        }
                      >
                        列印
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
        {FormalMetadata && <Pagination metadata={FormalMetadata} />}
      </Box>
    </LoadingLayout>
  );
};

export default PrintShipments;
