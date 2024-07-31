import { SettingsIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import AddInventory from '@components/Layout/AdminLayout/ERP/AddInventory';
import AddPurchaseOrder from '@components/Layout/AdminLayout/ERP/AddPurchaseOrder';
import InventoryOverview from '@components/Layout/AdminLayout/ERP/InventoryOverview';
import InventoryStatistics from '@components/Layout/AdminLayout/ERP/InventoryStatistics';
import PurchaseOrderList from '@components/Layout/AdminLayout/ERP/PurchaseOrderList';
import SalesReport from '@components/Layout/AdminLayout/ERP/salesReport';
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  createSystemSafetyStockAsync,
  getSystemSafetyStockAsync,
} from '@reducers/admin/admin-erp/inventory/actions';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const InventorySystem: React.FC = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      safetyStockDays: 7,
      leadTimeDays: 5,
    },
  });

  const {
    systemSafetyStock,
    status: {
      createSystemSafetyStockFailed,
      createSystemSafetyStockLoading,
      createSystemSafetyStockSuccess,
    },
    error: { createSystemSafetyStockError },
  } = useAppSelector((state) => state.adminERPInventory);

  const onSubmit = (data: {
    safetyStockDays: number;
    leadTimeDays: number;
  }) => {
    dispatch(createSystemSafetyStockAsync(data));
  };

  useEffect(() => {
    dispatch(getSystemSafetyStockAsync());
  }, [dispatch]);

  useEffect(() => {
    if (systemSafetyStock) {
      setValue('safetyStockDays', systemSafetyStock.safetyStockDays);
      setValue('leadTimeDays', systemSafetyStock.leadTimeDays);
    }
  }, [systemSafetyStock, setValue]);

  useEffect(() => {
    if (createSystemSafetyStockSuccess) {
      toast({
        title: '設定成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } else if (createSystemSafetyStockFailed) {
      toast({
        title: '設定失敗，發生錯誤',
        description: createSystemSafetyStockError,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [
    toast,
    createSystemSafetyStockFailed,
    createSystemSafetyStockSuccess,
    createSystemSafetyStockError,
    onClose,
  ]);

  return (
    <LoadingLayout isLoading={createSystemSafetyStockLoading}>
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
            <IconButton
              aria-label='Settings'
              icon={<SettingsIcon />}
              onClick={onOpen}
              ml='auto'
            />
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

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>設置安全庫存</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <FormControl>
                  <FormLabel>安全庫存天數</FormLabel>
                  <Input type='number' {...register('safetyStockDays')} />
                  <p>用來應對需求波動和供應延遲。</p>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>領先時間天數</FormLabel>
                  <Input type='number' {...register('leadTimeDays')} />
                  <p>從訂單到收到貨物的時間。</p>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' mr={3} type='submit'>
                  保存
                </Button>
                <Button variant='ghost' onClick={onClose}>
                  取消
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Box>
    </LoadingLayout>
  );
};

export default InventorySystem;
