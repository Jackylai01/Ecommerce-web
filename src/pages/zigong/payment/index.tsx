import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import OrdersTab from '@components/Layout/AdminLayout/orders/OrdersTab';
import ShipmentsTab from '@components/Layout/AdminLayout/orders/ShipmentsTab';
import useAppDispatch from '@hooks/useAppDispatch';
import { getAdminAllOrdersAsync } from '@reducers/admin/orders/actions';
import { getPendingShipmentsAsync } from '@reducers/admin/shipments/actions';
import { NextPage } from 'next';
import { useEffect } from 'react';

const FinanceManagement: NextPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAdminAllOrdersAsync({ page: 1, limit: 10 }));
    dispatch(getPendingShipmentsAsync({ page: 1, limit: 10 }));
  }, [dispatch]);

  return (
    <Box minH='100vh' py='8' mt='1rem'>
      <Box maxW='90%' mx='auto' px='4'>
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
