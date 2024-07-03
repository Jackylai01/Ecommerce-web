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
import useAppSelector from '@hooks/useAppSelector';
import { ShipmentResponse } from '@models/responses/shipments.res';
import { useEffect, useRef, useState } from 'react';
import { FaEye } from 'react-icons/fa';

const ShipmentsTab = () => {
  const { pendingList: pendingShipments, metadata: shipmentsMetadata } =
    useAppSelector((state) => state.adminShipment);
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
              <Th className='tables-container__header-cell'>承運商</Th>
              <Th className='tables-container__header-cell'>收件人</Th>
              <Th className='tables-container__header-cell'>出貨狀態</Th>
              <Th className='tables-container__header-cell'>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pendingShipments &&
              pendingShipments.map((shipment: ShipmentResponse) => (
                <Tr key={shipment._id}>
                  <Td className='tables-container__body-cell tables-container__sticky-column'>
                    {shipment.orderId._id}
                  </Td>
                  <Td className='tables-container__body-cell'>
                    {shipment.carrier}
                  </Td>
                  <Td className='tables-container__body-cell'>
                    {shipment.receiverName}
                  </Td>
                  <Td className='tables-container__body-cell'>
                    <Badge colorScheme='orange'>未出貨</Badge>
                  </Td>
                  <Td className='tables-container__body-cell'>
                    <Button
                      variant='link'
                      colorScheme='blue'
                      className='hover-scale'
                    >
                      <FaEye className='mr-1' /> 查看詳情
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
  );
};

export default ShipmentsTab;
