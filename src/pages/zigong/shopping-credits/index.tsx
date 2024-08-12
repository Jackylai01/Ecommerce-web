import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import AllShoppingCreditsTab from '@components/Layout/AdminLayout/AllShoppingCreditsTab';
import AddShoppingCreditTab from '@components/Layout/AdminLayout/AllShoppingCreditsTab/AddShoppingCreditTab';
import BatchAddBirthdayCreditsTab from '@components/Layout/AdminLayout/AllShoppingCreditsTab/BatchAddBirthdayCreditsTab';
import ShoppingCreditTypeManagementTab from '@components/Layout/AdminLayout/AllShoppingCreditsTab/ShoppingCreditTypeManagementTab';

import { NextPage } from 'next';
import { useAdminColorMode } from 'src/context/colorMode';

const ShoppingCreditsManagement: NextPage = () => {
  const { colorMode } = useAdminColorMode();
  const bgColor = colorMode === 'light' ? 'black' : 'white';

  return (
    <Box minH='100vh' py='8' mt='1rem'>
      <Box w='100%' mx='auto' px='4'>
        <Tabs>
          <TabList color={bgColor}>
            <Tab>所有購物金</Tab>
            <Tab>新增購物金</Tab>
            <Tab>批量發放生日購物金</Tab>
            <Tab>購物金類別管理</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <AllShoppingCreditsTab />
            </TabPanel>
            <TabPanel>
              <AddShoppingCreditTab />
            </TabPanel>
            <TabPanel>
              <BatchAddBirthdayCreditsTab />
            </TabPanel>
            <TabPanel>
              <ShoppingCreditTypeManagementTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default ShoppingCreditsManagement;
