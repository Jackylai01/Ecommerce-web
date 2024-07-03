import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import Pagination from '@components/Pagination';
import { statusColors, statusMap } from '@fixtures/statusMaps';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { ordersResponse } from '@models/responses/orders.res';
import { Transaction } from '@models/responses/transactions.res';
import {
  getAdminAllOrdersAsync,
  getAdminOrdersDetailAsync,
} from '@reducers/admin/orders/actions';
import { useEffect, useRef, useState } from 'react';
import { FaFilter, FaPlus } from 'react-icons/fa';
import OrdersDetail from '../OrdersDetail';

const OrdersTab = () => {
  const {
    list,
    metadata,
    status: { getOrdersDetailsLoading },
  } = useAppSelector((state) => state.adminOrders);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    minPrice: '',
    maxPrice: '',
    status: '' as Transaction['status'] | '',
  });
  const tableRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    if (selectedOrderId) {
      dispatch(getAdminOrdersDetailAsync(selectedOrderId));
    }
  }, [selectedOrderId, dispatch]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value as Transaction['status'],
    });
  };

  const handleApplyFilters = () => {
    const queryParams: any = {
      page: 1,
      limit: 10,
    };

    if (filters.startDate) {
      queryParams.startDate = filters.startDate;
    }
    if (filters.endDate) {
      queryParams.endDate = filters.endDate;
    }
    if (filters.minPrice && filters.minPrice !== '0') {
      queryParams.minPrice = filters.minPrice;
    }
    if (filters.maxPrice && filters.maxPrice !== '0') {
      queryParams.maxPrice = filters.maxPrice;
    }
    if (filters.status) {
      queryParams.status = filters.status;
    }

    dispatch(getAdminAllOrdersAsync(queryParams));

    const searchParams = new URLSearchParams(queryParams).toString();
    window.history.pushState({}, '', `?${searchParams}`);
  };

  const handleViewDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
    onOpen();
  };

  return (

      <Box
        bg='white'
        borderRadius='16px'
        boxShadow='md'
        overflow='hidden'
        minH='450px'
      >
        <Flex justify='flex-end' align='center' mb='8'>
          <Button leftIcon={<FaPlus />} colorScheme='purple' size='lg'>
            新增交易
          </Button>
        </Flex>
        <Box
          bg='white'
          borderRadius='16px'
          boxShadow='md'
          p='6'
          mb='8'
          className='animate-slide-up'
        >
          <Heading
            as='h3'
            fontSize='xl'
            fontWeight='semibold'
            mb='4'
            color='gray.700'
          >
            <FaFilter className='mr-2 text-indigo-600' /> 篩選器
          </Heading>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap='6'>
            <Box position='relative'>
              <Input
                type='date'
                name='startDate'
                placeholder='開始日期'
                value={filters.startDate}
                onChange={handleFilterChange}
                pl='10'
              />
            </Box>
            <Box position='relative'>
              <Input
                type='date'
                name='endDate'
                placeholder='結束日期'
                value={filters.endDate}
                onChange={handleFilterChange}
                pl='10'
              />
            </Box>
            <Box position='relative'>
              <InputGroup>
                <InputLeftAddon children='最低金額' />
                <Input
                  type='number'
                  name='minPrice'
                  placeholder='最低金額'
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                />
              </InputGroup>
            </Box>
            <Box position='relative'>
              <InputGroup>
                <InputLeftAddon children='最高金額' />
                <Input
                  type='number'
                  name='maxPrice'
                  placeholder='最高金額'
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                />
              </InputGroup>
            </Box>
            <Box position='relative' w='100%'>
              <Select
                name='status'
                placeholder='全部狀態'
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value='Pending'>待處理</option>
                <option value='Paid'>已支付</option>
                <option value='Shipped'>已出貨</option>
                <option value='Completed'>完成</option>
                <option value='Cancelled'>取消</option>
              </Select>
            </Box>
          </Grid>
          <Button
            colorScheme='purple'
            size='lg'
            mt='6'
            mx='auto'
            display='block'
            onClick={handleApplyFilters}
          >
            應用篩選
          </Button>
        </Box>
        <Box className='tables-container' ref={tableRef}>
          <Table className='tables-container__table' variant='simple'>
            <Thead bg='gray.50'>
              <Tr>
                <Th className='tables-container__header-cell tables-container__sticky-column'>
                  用戶
                </Th>
                <Th className='tables-container__header-cell'>訂單編號</Th>
                <Th className='tables-container__header-cell'>總金額</Th>
                <Th className='tables-container__header-cell'>狀態</Th>
                <Th className='tables-container__header-cell'>操作</Th>
              </Tr>
            </Thead>
            <Tbody>
              {list &&
                list.map((order: ordersResponse) => (
                  <Tr key={order._id}>
                    <Td className='tables-container__body-cell tables-container__sticky-column'>
                      {order.user.username}
                    </Td>
                    <Td className='tables-container__body-cell'>
                      {order?.paymentResult?.ecpayData.MerchantTradeNo}
                    </Td>
                    <Td className='tables-container__body-cell'>
                      {order.totalPrice}
                    </Td>
                    <Td className='tables-container__body-cell'>
                      <Badge colorScheme={statusColors[order.status]}>
                        {statusMap[order.status]}
                      </Badge>
                    </Td>
                    <Td className='tables-container__body-cell'>
                      <Button
                        onClick={() => handleViewDetails(order._id)}
                        colorScheme='teal'
                        variant='outline'
                      >
                        查看詳情
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
        {metadata && <Pagination metadata={metadata} />}
        <OrdersDetail
          isOpen={isOpen}
          onClose={onClose}
          selectedOrderId={selectedOrderId}
        />
      </Box>

  );
};

export default OrdersTab;
