import {
  Box,
  Grid,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from '@chakra-ui/react';
import AddInventory from '@components/Layout/AdminLayout/ERP/AddInventory';
import AddPurchaseOrder from '@components/Layout/AdminLayout/ERP/AddPurchaseOrder';
import InventoryOverview from '@components/Layout/AdminLayout/ERP/InventoryOverview';
import InventoryStatistics from '@components/Layout/AdminLayout/ERP/InventoryStatistics';
import PurchaseOrderList from '@components/Layout/AdminLayout/ERP/PurchaseOrderList';
import SalesReport from '@components/Layout/AdminLayout/ERP/salesReport';

const InventorySystem: React.FC = () => {
  const toast = useToast();

  return (
    <Box w='90%' mx='auto' mt='2rem' p='20px' bg='gray.100' color='gray.800'>
      <Box
        bgGradient='linear(to-r, blue.400, teal.400)'
        color='white'
        p='30px'
        textAlign='center'
        mb='30px'
        borderRadius='10px'
        boxShadow='md'
      >
        <Heading
          fontSize='28px'
          fontWeight='700'
          letterSpacing='1px'
          color='white'
        >
          進銷存管理系統
        </Heading>
      </Box>
      <Tabs variant='soft-rounded' colorScheme='blue'>
        <TabList mb='30px'>
          <Tab>庫存管理</Tab>
          <Tab>進貨管理</Tab>
          <Tab>庫存報告</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <InventoryStatistics />
            <Grid
              templateColumns='repeat(auto-fit, minmax(300px, 1fr))'
              gap='30px'
            >
              <InventoryOverview />
              <AddInventory />
            </Grid>
          </TabPanel>
          <TabPanel>
            <Grid
              templateColumns='repeat(auto-fit, minmax(300px, 1fr))'
              gap='30px'
            >
              <AddPurchaseOrder />
              <PurchaseOrderList />
            </Grid>
          </TabPanel>
          <TabPanel>
            <SalesReport />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default InventorySystem;
