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
import HistoryItem from '@components/Layout/ClientLayout/HistoryItem';
import { OrderItem } from '@components/Layout/ClientLayout/OrderItem';
import Profiles from '@components/Layout/ClientLayout/Profiles';
import RefundForm from '@components/Layout/ClientLayout/RefundForm';
import LoadingLayout from '@components/Layout/LoadingLayout';
import { Navbar } from '@components/Navbar/NavBar';
import Pagination from '@components/Pagination';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  getClientOrderHistoryAsync,
  getClientOrdersAsync,
} from '@reducers/client/orders/actions';
import { clientUserShoppingCreditsAsync } from '@reducers/client/shopping-credits/actions';

import { useEffect } from 'react';

const ClientDashboard = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.clientAuth);
  const {
    list: orderList,
    historyList: orderHistoryList,
    metadata,
    status: { getClientOrdersLoading },
  } = useAppSelector((state) => state.clientOrders);
  const {
    list,
    status: { userShoppingCreditsLoading },
  } = useAppSelector((state) => state.clientShoppingCredits);

  useEffect(() => {
    if (!userInfo) return;
    dispatch(
      getClientOrdersAsync({
        userId: userInfo._id,
        query: { limit: 10, page: 1 },
      }),
    );
    dispatch(
      getClientOrderHistoryAsync({
        userId: userInfo._id,
        query: { limit: 10, page: 1 },
      }),
    );
    dispatch(clientUserShoppingCreditsAsync(userInfo._id));
  }, [dispatch, userInfo]);

  return (
    <ClientLayout>
      <Navbar />
      <LoadingLayout
        isLoading={userShoppingCreditsLoading || getClientOrdersLoading}
      >
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
                購物金
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
                  {orderList && orderList.length > 0 ? (
                    <VStack spacing='20px'>
                      {orderList.map((order) => (
                        <OrderItem
                          key={order._id}
                          orderId={order._id}
                          date={new Date(order.createdAt).toLocaleDateString()}
                          amount={order.totalPrice}
                          refunds={order.refunds}
                          shipments={order.shipments}
                          paymentResult={order.paymentResult}
                          payments={order.payments}
                          invoice={order.invoice}
                          paymentMethod={order.paymentMethod}
                        />
                      ))}
                      {metadata && <Pagination metadata={metadata} />}
                    </VStack>
                  ) : (
                    <Box>尚無訂單。</Box>
                  )}
                </VStack>
              </TabPanel>
              <TabPanel>
                <Heading as='h2' fontSize='24px' mb='20px'>
                  購物歷史
                </Heading>
                {orderHistoryList && orderHistoryList.length > 0 ? (
                  <VStack spacing='20px'>
                    <HistoryItem orderHistoryList={orderHistoryList} />
                  </VStack>
                ) : (
                  <Box>尚無購物歷史。</Box>
                )}
              </TabPanel>
              <TabPanel>
                <Heading as='h2' fontSize='24px' mb='20px'>
                  購物金
                </Heading>

                <Box fontSize='20px'>您的當前購物金：</Box>
                {list && list.length > 0 ? (
                  list.map((credit: any) => (
                    <Box
                      key={credit._id}
                      w='100%'
                      p='20px'
                      borderWidth='1px'
                      borderRadius='lg'
                      overflow='hidden'
                    >
                      <Box
                        fontSize='64px'
                        fontWeight='600'
                        color='#c0a080'
                        textAlign='center'
                        mt='20px'
                        textShadow='2px 2px 4px rgba(0,0,0,0.1)'
                      >
                        {credit.amount} 點
                      </Box>
                      <Box fontSize='14px' color='gray.600' textAlign='center'>
                        <Box textAlign='center' mt='10px'>
                          可兌換價值 NT$ {credit.amount} 的商品
                        </Box>
                        類型: {credit.type.name}
                      </Box>
                      <Box fontSize='14px' color='gray.600' textAlign='center'>
                        創建日期:{' '}
                        {new Date(credit.createdAt).toLocaleDateString()}
                      </Box>
                      <Box fontSize='14px' color='gray.600' textAlign='center'>
                        到期日:{' '}
                        {credit.expiryDate
                          ? new Date(credit.expiryDate).toLocaleDateString()
                          : '無'}
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Box>尚無購物金。</Box>
                )}
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
