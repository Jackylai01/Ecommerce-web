import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import ClientLayout from '@components/Layout/ClientLayout';
import { HistoryItem } from '@components/Layout/ClientLayout/HistoryItem';
import { OrderItem } from '@components/Layout/ClientLayout/OrderItem';
import Profiles from '@components/Layout/ClientLayout/Profiles';
import RefundForm from '@components/Layout/ClientLayout/RefundForm';
import LoadingLayout from '@components/Layout/LoadingLayout';
import { Navbar } from '@components/Navbar/NavBar';
import Pagination from '@components/Pagination';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getClientOrdersAsync } from '@reducers/client/orders/actions';
import { useEffect } from 'react';

const ClientDashboard = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.clientAuth);
  const {
    list: orderList,
    metadata,
    status: { getClientOrdersLoading },
  } = useAppSelector((state) => state.clientOrders);

  useEffect(() => {
    if (!userInfo) return;
    dispatch(
      getClientOrdersAsync({
        userId: userInfo._id,
        query: { limit: 10, page: 1 },
      }),
    );
  }, [dispatch, userInfo]);

  return (
    <ClientLayout>
      <Navbar />
      <LoadingLayout isLoading={getClientOrdersLoading}>
        <Box
          w='80%'
          mx='auto'
          mt='40px'
          bg='white'
          boxShadow='0 10px 20px rgba(0, 0, 0, 0.05)'
          borderRadius='12px'
          overflow='hidden'
        >
          <Box
            bgGradient='linear(to-r, #3a4f66, #5a6f86)'
            color='white'
            p='40px'
            textAlign='center'
            position='relative'
            overflow='hidden'
            _before={{
              content: "''",
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              bg: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
              transform: 'rotate(30deg)',
            }}
          >
            <Heading fontSize='32px' fontWeight='600' letterSpacing='1px'>
              會員專區
            </Heading>
          </Box>
          <Tabs variant='soft-rounded' colorScheme='orange'>
            <TabList
              justifyContent='center'
              bg='gray.100'
              p='5px'
              borderRadius='30px'
              mt='20px'
            >
              <Tab
                _selected={{ bg: '#c0a080', color: 'white' }}
                _hover={{ bg: 'rgba(192, 160, 128, 0.1)' }}
              >
                訂單狀況
              </Tab>
              <Tab
                _selected={{ bg: '#c0a080', color: 'white' }}
                _hover={{ bg: 'rgba(192, 160, 128, 0.1)' }}
              >
                購物歷史
              </Tab>
              <Tab
                _selected={{ bg: '#c0a080', color: 'white' }}
                _hover={{ bg: 'rgba(192, 160, 128, 0.1)' }}
              >
                會員積分
              </Tab>
              <Tab
                _selected={{ bg: '#c0a080', color: 'white' }}
                _hover={{ bg: 'rgba(192, 160, 128, 0.1)' }}
              >
                個人資料
              </Tab>
              <Tab
                _selected={{ bg: '#c0a080', color: 'white' }}
                _hover={{ bg: 'rgba(192, 160, 128, 0.1)' }}
              >
                退貨申請
              </Tab>
            </TabList>
            <TabPanels p='40px'>
              <TabPanel>
                <Heading as='h2' fontSize='24px' mb='20px'>
                  訂單狀況
                </Heading>
                <VStack spacing='20px'>
                  {orderList?.map((order: any) => (
                    <OrderItem
                      key={order._id}
                      orderId={order._id}
                      date={new Date(order.createdAt).toLocaleDateString()}
                      status={order.status}
                      amount={order.totalPrice}
                      refunds={order.refunds}
                      shipments={order.shipments}
                      paymentResult={order.paymentResult}
                    />
                  ))}
                  {metadata && <Pagination metadata={metadata} />}
                </VStack>
              </TabPanel>
              <TabPanel>
                <Heading as='h2' fontSize='24px' mb='20px'>
                  購物歷史
                </Heading>
                <VStack spacing='20px'>
                  <HistoryItem
                    name='精品手錶 Model X'
                    date='2024-05-20'
                    price='50000'
                  />
                  <HistoryItem
                    name='高級皮夾 Brand Y'
                    date='2024-05-15'
                    price='7500'
                  />
                </VStack>
              </TabPanel>
              <TabPanel>
                <Heading as='h2' fontSize='24px' mb='20px'>
                  會員積分
                </Heading>
                <Box
                  bg='white'
                  p='30px'
                  borderRadius='12px'
                  boxShadow='0 10px 20px rgba(0, 0, 0, 0.05)'
                >
                  <Box fontSize='20px'>您的當前積分：</Box>
                  <Box
                    fontSize='64px'
                    fontWeight='600'
                    color='#c0a080'
                    textAlign='center'
                    mt='20px'
                    textShadow='2px 2px 4px rgba(0,0,0,0.1)'
                  >
                    10,000 點
                  </Box>
                  <Box textAlign='center' mt='10px'>
                    可兌換價值 NT$1,000 的商品
                  </Box>
                </Box>
              </TabPanel>
              <TabPanel>
                <Heading as='h2' fontSize='24px' mb='20px'>
                  個人資料
                </Heading>
                <Profiles />
              </TabPanel>
              <TabPanel>
                <Heading as='h2' fontSize='24px' mb='20px'>
                  退貨申請
                </Heading>
                <RefundForm />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </LoadingLayout>
    </ClientLayout>
  );
};

export default ClientDashboard;
