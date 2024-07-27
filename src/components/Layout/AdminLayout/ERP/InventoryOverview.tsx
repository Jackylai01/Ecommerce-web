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
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getInventoryAsync } from '@reducers/admin/admin-erp/inventory/actions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const InventoryOverview = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { list: inventoryList } = useAppSelector(
    (state) => state.adminERPInventory,
  );
  const { list: products } = useAppSelector((state) => state.adminProducts);
  const { list: salesList } = useAppSelector(
    (state) => state.adminERPSalesOrder,
  );

  const recentInbound = inventoryList
    ?.filter((item) => item.type === 'inbound')
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  const recentOutbound = salesList
    ?.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  useEffect(() => {
    const page = parseInt(router.query.page as string) || 1;
    const limit = 10;
    dispatch(getInventoryAsync({ page, limit }));
  }, [dispatch]);

  const getProductStock = (productId: string) => {
    const product = products?.find((product) => product._id === productId);
    return product ? product.stock : '尚未設定';
  };

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
          {inventoryList &&
            inventoryList?.map((item) => (
              <Tr
                key={item.productId}
                bg='gray.50'
                _hover={{ bg: 'gray.100', transform: 'scale(1.02)' }}
              >
                <Td>{item?.name}</Td>
                <Td>{getProductStock(item._id)}</Td>
                <Td>{item?.reorderLevel || '尚未設定'}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      <Heading
        fontSize='20px'
        mt='40px'
        mb='20px'
        color='blue.400'
        borderBottom='2px'
        borderColor='blue.400'
        pb='10px'
      >
        最近進貨
      </Heading>
      <Table width='100%'>
        <Thead>
          <Tr>
            <Th bg='blue.400' color='white' fontWeight='600'>
              日期
            </Th>
            <Th bg='blue.400' color='white' fontWeight='600'>
              產品
            </Th>
            <Th bg='blue.400' color='white' fontWeight='600'>
              數量
            </Th>
            <Th bg='blue.400' color='white' fontWeight='600'>
              供應商
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {recentInbound &&
            recentInbound.map((item) => (
              <Tr
                key={item._id}
                bg='gray.50'
                _hover={{ bg: 'gray.100', transform: 'scale(1.02)' }}
              >
                <Td>{new Date(item.createdAt).toLocaleDateString()}</Td>
                <Td>{item.product.name}</Td>
                <Td>{item.quantity}</Td>
                <Td>{item.supplier}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>

      <Heading
        fontSize='20px'
        mt='40px'
        mb='20px'
        color='blue.400'
        borderBottom='2px'
        borderColor='blue.400'
        pb='10px'
      >
        最近銷售
      </Heading>
      <Table width='100%'>
        <Thead>
          <Tr>
            <Th bg='blue.400' color='white' fontWeight='600'>
              日期
            </Th>
            <Th bg='blue.400' color='white' fontWeight='600'>
              產品
            </Th>
            <Th bg='blue.400' color='white' fontWeight='600'>
              數量
            </Th>
            <Th bg='blue.400' color='white' fontWeight='600'>
              客戶
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {recentOutbound &&
            recentOutbound.map((item) =>
              item.products.map((product) => (
                <Tr
                  key={`${item._id}-${product.productId}`}
                  bg='gray.50'
                  _hover={{ bg: 'gray.100', transform: 'scale(1.02)' }}
                >
                  <Td>{new Date(item.createdAt).toLocaleDateString()}</Td>
                  <Td>{product.productName}</Td>
                  <Td>{product.quantity}</Td>
                  <Td>{item.customerName}</Td>
                </Tr>
              )),
            )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default InventoryOverview;
