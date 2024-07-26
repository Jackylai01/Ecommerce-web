import {
  Box,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import useAppSelector from '@hooks/useAppSelector';

const InventoryOverview = () => {
  const { list } = useAppSelector((state) => state.adminERPInventory);

  return (
    <Box bg='white' p='25px' borderRadius='10px' boxShadow='md'>
      <Heading
        fontSize='20px'
        mb='20px'
        color='blue.400'
        borderBottom='2px'
        borderColor='blue.400'
        pb='10px'
      >
        庫存概覽
      </Heading>
      <Table width='100%'>
        <Thead>
          <Tr>
            <Th bg='blue.400' color='white' fontWeight='600'>
              產品名稱
            </Th>
            <Th bg='blue.400' color='white' fontWeight='600'>
              庫存數量
            </Th>
            <Th bg='blue.400' color='white' fontWeight='600'>
              補貨點
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {list &&
            list.map((item) => (
              <Tr
                key={item.productId}
                bg='gray.50'
                _hover={{ bg: 'gray.100', transform: 'scale(1.02)' }}
              >
                <Td>{item.productName}</Td>
                <Td>{item.stock}</Td>
                <Td>{item.reorderLevel}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default InventoryOverview;
