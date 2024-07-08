import {
  Badge,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
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
  getPendingShipmentsAsync,
  printTradeShipmentsAsync,
  queryLogisticsAsync,
  updateShipmentStatusAsync,
} from '@reducers/admin/shipments/actions';
import { useEffect, useRef, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const PrintShipments = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const {
    formalList,
    FormalMetadata,
    printTradeShipments,
    queryLogistics,
    status: {
      printTradeSuccess,
      updateShipmentStatusSuccess,
      updateShipmentStatusFailed,
      updateShipmentStatusLoading,
    },
    error: { updateShipmentStatusError },
  } = useAppSelector((state) => state.adminShipment);
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const handlePrint = async (LogisticsID: string, LogisticsSubType: any) => {
    dispatch(printTradeShipmentsAsync({ LogisticsID, LogisticsSubType }));
  };

  const handleQueryLogistics = async (
    logisticsID: string,
    merchantTradeNo: string,
  ) => {
    dispatch(queryLogisticsAsync({ logisticsID, merchantTradeNo }));
    onOpen();
  };

  const handleUpdateShipmentStatus = (shipmentId: string) => {
    dispatch(updateShipmentStatusAsync(shipmentId));
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

  useEffect(() => {
    if (updateShipmentStatusSuccess) {
      toast({
        title: '物流狀態更新成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      dispatch(getPendingShipmentsAsync({ page: 1, limit: 10 }));
    } else if (updateShipmentStatusFailed) {
      toast({
        title: '物流狀態更新失敗',
        description: updateShipmentStatusError,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [
    toast,
    dispatch,
    updateShipmentStatusError,
    updateShipmentStatusSuccess,
    updateShipmentStatusFailed,
  ]);

  return (
    <LoadingLayout isLoading={updateShipmentStatusLoading}>
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
                      <Button
                        leftIcon={<FaCheckCircle />}
                        colorScheme='teal'
                        size='sm'
                        m={1}
                        onClick={() => handleUpdateShipmentStatus(shipment._id)}
                      >
                        標記為已出貨
                      </Button>
                      <Button
                        colorScheme='red'
                        size='sm'
                        m={1}
                        onClick={() =>
                          handleQueryLogistics(
                            shipment.LogisticsID,
                            shipment.orderId.paymentResult.ecpayData
                              .MerchantTradeNo,
                          )
                        }
                      >
                        查看物流狀態
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
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>物流狀態</DrawerHeader>
          <DrawerBody>
            {queryLogistics ? (
              <Box>
                <p>Logistics ID: {queryLogistics.LogisticsID}</p>
                <p>Merchant Trade No: {queryLogistics.MerchantTradeNo}</p>
                <p>Status: {queryLogistics.Status}</p>
              </Box>
            ) : (
              <p>Loading...</p>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              關閉
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </LoadingLayout>
  );
};

export default PrintShipments;
