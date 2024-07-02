import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import OrdersTab from '@components/Layout/AdminLayout/orders/OrdersTab';
import ShipmentsTab from '@components/Layout/AdminLayout/orders/ShipmentsTab';
import useAppDispatch from '@hooks/useAppDispatch';
import { Transaction } from '@models/responses/transactions.res';
import { getAdminAllOrdersAsync } from '@reducers/admin/orders/actions';
import { getPendingShipmentsAsync } from '@reducers/admin/shipments/actions';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { FaFilter, FaPlus } from 'react-icons/fa';

const FinanceManagement: NextPage = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    minPrice: '',
    maxPrice: '',
    status: '' as Transaction['status'] | '',
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAdminAllOrdersAsync({ page: 1, limit: 10 }));
    dispatch(getPendingShipmentsAsync({ page: 1, limit: 10 }));
  }, [dispatch]);

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

  return (
    <Box bg='#f0f4f8' minH='100vh' py='8'>
      <Box maxW='1200px' mx='auto' px='4'>
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
        <Tabs>
          <TabList>
            <Tab>所有訂單</Tab>
            <Tab>待出貨</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <OrdersTab />
            </TabPanel>
            <TabPanel>
              <ShipmentsTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default FinanceManagement;
