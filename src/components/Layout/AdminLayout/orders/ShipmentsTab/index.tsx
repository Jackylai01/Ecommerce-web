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
import { FaEye } from 'react-icons/fa';

const ShipmentsTab = () => {
  const { pendingList: pendingShipments, metadata: shipmentsMetadata } =
    useAppSelector((state) => state.adminShipment);

  return (
    <Box
      bg='white'
      borderRadius='16px'
      boxShadow='md'
      overflow='hidden'
      minH='450px'
      overflowX='auto'
    >
      <Box minW='900px'>
        <Table variant='simple'>
          <Thead bg='gray.50'>
            <Tr>
              <Th>訂單ID</Th>
              <Th>承運商</Th>
              <Th>收件人</Th>
              <Th>出貨狀態</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pendingShipments &&
              pendingShipments.map((shipment: ShipmentResponse) => (
                <Tr key={shipment._id}>
                  <Td>{shipment.orderId._id}</Td>
                  <Td>{shipment.carrier}</Td>
                  <Td>{shipment.receiverName}</Td>
                  <Td>
                    <Badge colorScheme='orange'>未出貨</Badge>
                  </Td>
                  <Td>
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
          {shipmentsMetadata && <Pagination metadata={shipmentsMetadata} />}
        </Table>
      </Box>
    </Box>
  );
};

export default ShipmentsTab;
