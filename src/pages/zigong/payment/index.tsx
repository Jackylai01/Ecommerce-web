import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import OrdersTab from '@components/Layout/AdminLayout/orders/OrdersTab';
import PrintShipments from '@components/Layout/AdminLayout/orders/PrintShipments';
import ShipmentsTab from '@components/Layout/AdminLayout/orders/ShipmentsTab';
import useAppDispatch from '@hooks/useAppDispatch';
import { resetAdminOrdersState } from '@reducers/admin/orders';
import { getAdminAllOrdersAsync } from '@reducers/admin/orders/actions';
import { resetShipmentState } from '@reducers/admin/shipments';
import {
  getFormalShipmentsAsync,
  getPendingShipmentsAsync,
} from '@reducers/admin/shipments/actions';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { useAdminColorMode } from 'src/context/colorMode';

const FinanceManagement: NextPage = () => {
  const dispatch = useAppDispatch();
  const { colorMode } = useAdminColorMode();
  const bgColor = colorMode === 'light' ? 'black' : 'white';

  useEffect(() => {
    dispatch(getAdminAllOrdersAsync({ page: 1, limit: 10 }));
    dispatch(getPendingShipmentsAsync({ page: 1, limit: 10 }));
    dispatch(getFormalShipmentsAsync({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetAdminOrdersState());
      dispatch(resetShipmentState());
    };
  }, []);

  return (
    <Box minH='100vh' py='8' mt='1rem'>
      <Box maxW='90%' mx='auto' px='4'>
        <Tabs>
          <TabList color={bgColor}>
            <Tab>所有訂單</Tab>
            <Tab>待出貨</Tab>
            <Tab>列印出貨單</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <OrdersTab />
            </TabPanel>
            <TabPanel>
              <ShipmentsTab />
            </TabPanel>
            <TabPanel>
              <PrintShipments />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default FinanceManagement;
