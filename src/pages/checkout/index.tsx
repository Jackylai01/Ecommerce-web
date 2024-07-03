import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import DotAnimationLoadingLayout from '@components/Layout/LoadingLayout/dotAnimationLoading';
import { calculateLogisticsFee } from '@fixtures/shipment';
import {
  calculateItemsTotal,
  formatPrice,
  getSubstring,
} from '@helpers/products';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { setOrder } from '@reducers/public/payments';
import {
  createOrderAsync,
  createPaymentAsync,
  getShipmentDataAsync,
  redirectToLogisticsSelectionAsync,
} from '@reducers/public/payments/actions';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const CheckoutPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { uniqueId } = router.query;
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [subTotal, setSubTotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [logisticsFee, setLogisticsFee] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
    email: '',
    carrierType: '', // 載具類型
    carrierNum: '', // 載具號碼
    taxId: '', // 統一編號
    donateCode: '', // 捐贈碼
  });

  const { checkout } = useAppSelector((state) => state.clientCart);
  const {
    order,
    logisticsSelection,
    shipmentData: shipmentDataFromState,
    payment,
    status: {
      createOrderSuccess,
      createOrderLoading,
      createOrderFailed,
      getPaymentNotifyLoading,
      getShipmentDataFailed,
      getShipmentDataLoading,
      createPaymentSuccess,
      createPaymentFailed,
      createPaymentLoading,
      redirectToLogisticsSelectionLoading,
    },
  } = useAppSelector((state) => state.publicPayments);

  const { userInfo } = useAppSelector((state) => state.clientAuth);

  useEffect(() => {
    if (order) {
      localStorage.setItem('order', JSON.stringify(order));
    }
  }, [order]);

  useEffect(() => {
    const savedOrder = localStorage.getItem('order');
    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder);
        dispatch(setOrder(parsedOrder));
      } catch (e) {
        console.error('Failed to parse saved order:', e);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (router.isReady) {
      const { uniqueId } = router.query;

      if (uniqueId) {
        dispatch(
          getShipmentDataAsync(
            Array.isArray(uniqueId) ? uniqueId[0] : uniqueId,
          ),
        );
      }
    }
  }, [router.isReady, router.query, dispatch]);

  useEffect(() => {
    const subTotal = calculateItemsTotal(checkout);
    const tax = 0.1 * subTotal;
    setSubTotal(subTotal);
    setTax(tax);

    if (shipmentDataFromState) {
      const logisticsFee = calculateLogisticsFee(
        shipmentDataFromState,
        shipmentDataFromState.orderId.totalPrice,
      );
      setLogisticsFee(logisticsFee);

      setTotal(subTotal + logisticsFee); // 不計入稅
    }
  }, [checkout, shipmentDataFromState]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo) {
      toast({
        title: '請先登錄',
        description: '您需要登錄才能創建訂單',
        status: 'warning',
        isClosable: true,
      });
      return;
    }
    const orderData = {
      userId: userInfo._id,
      products: checkout.map((item) => ({
        product: item._id,
        quantity: item.count,
        priceAtPurchase: item.price,
        name: item.name,
      })),
      totalPrice: subTotal + tax,
      shippingAddress: { ...formData },
    };
    await dispatch(createOrderAsync(orderData));
  };

  const handlePaymentSubmit = async () => {
    if (order) {
      const paymentData = {
        orderId: order._id,
        TradeDesc: `購買於 我的商店 - 訂單編號 ${order._id}`,
        ItemName: order.products.map((item: any) => item.name).join('#'),
        ChoosePayment: 'ALL',
      };
      await dispatch(createPaymentAsync(paymentData));
    }
  };

  useEffect(() => {
    if (createPaymentSuccess && payment) {
      localStorage.setItem('paymentForm', payment);
      router.push('/payment');
    } else if (createPaymentFailed) {
      toast({
        title: '建立付款失敗',
        description: '請重試',
        status: 'error',
        isClosable: true,
      });
    }
  }, [createPaymentSuccess, createPaymentFailed, payment, router, toast]);

  useEffect(() => {
    if (logisticsSelection) {
      localStorage.setItem('logisticsSelection', logisticsSelection);
      router.push('/logistics');
    }
  }, [logisticsSelection, router]);

  const handleLogisticsSelection = async () => {
    if (order) {
      dispatch(redirectToLogisticsSelectionAsync(order._id));
    }
  };

  useEffect(() => {
    if (createOrderSuccess) {
      onOpen();
    }
    if (createOrderFailed) {
      toast({
        title: '建立訂單失敗',
        description: '請重試',
        status: 'error',
        isClosable: true,
      });
    }
  }, [createOrderSuccess, createOrderFailed, onOpen, toast]);

  if (!checkout.length && !shipmentDataFromState) {
    return (
      <Flex justify='center' align='center' h='100vh'>
        <Text fontSize='2xl' fontWeight='bold'>
          請稍等...
        </Text>
      </Flex>
    );
  }

  return (
    <DotAnimationLoadingLayout
      isLoading={
        createOrderLoading ||
        getShipmentDataLoading ||
        redirectToLogisticsSelectionLoading ||
        createPaymentLoading
      }
      loadingText='處理中...請稍後'
    >
      <Flex
        w={{ base: '100%', lg: '90%' }}
        mx='auto'
        flexDir={{ base: 'column', lg: 'row' }}
        gap='2rem'
        shadow='md'
      >
        <Stack spacing={10} w={{ base: '100%', lg: '60%' }}>
          <Card
            borderWidth='1px'
            bg='none'
            borderColor='gray.200'
            shadow='none'
          >
            <CardHeader>
              <Heading size='md' color='black'>
                Review Items
              </Heading>
            </CardHeader>
            <CardBody>
              <Stack spacing='2rem'>
                {checkout.length
                  ? checkout.map((item) => (
                      <Box key={item._id}>
                        <Flex align='center'>
                          <Image
                            src={item.coverImage.imageUrl}
                            boxSize='100px'
                            bgSize='contain'
                          />
                          <Box mx='1rem'>
                            <Text
                              fontWeight='bold'
                              fontSize={{ base: 'sm', lg: 'lg' }}
                              maxW='500px'
                              color='black'
                            >
                              {item.name}
                            </Text>
                            <Text color='gray.500'>
                              {getSubstring(item.description, 50)}
                            </Text>
                          </Box>
                        </Flex>
                        <Box textAlign='right'>
                          <Text
                            fontWeight='bold'
                            fontSize={{ base: 'md', lg: 'lg' }}
                          >
                            ${formatPrice(item.price)}
                          </Text>
                          <Text fontSize={{ base: 'sm', lg: 'md' }}>
                            Quantity: {item.count}
                          </Text>
                        </Box>
                      </Box>
                    ))
                  : shipmentDataFromState?.orderId.products.map((item: any) => (
                      <Box key={item.product._id}>
                        <Flex align='center'>
                          <Image
                            src={item.product.coverImage.imageUrl}
                            boxSize='100px'
                            bgSize='contain'
                          />
                          <Box mx='1rem'>
                            <Text
                              fontWeight='bold'
                              fontSize={{ base: 'sm', lg: 'lg' }}
                              maxW='500px'
                              color='black'
                            >
                              {item.product.name}
                            </Text>
                            <Text color='gray.500'>
                              {getSubstring(item.product.description, 50)}
                            </Text>
                          </Box>
                        </Flex>
                        <Box textAlign='right'>
                          <Text
                            fontWeight='bold'
                            fontSize={{ base: 'md', lg: 'lg' }}
                          >
                            ${formatPrice(item.priceAtPurchase)}
                          </Text>
                          <Text fontSize={{ base: 'sm', lg: 'md' }}>
                            Quantity: {item.quantity}
                          </Text>
                        </Box>
                      </Box>
                    ))}
              </Stack>
            </CardBody>
          </Card>
          <Card borderWidth='1px' bg='none' shadow='none'>
            <CardHeader>
              <Heading size='md'>Delivery Information</Heading>
            </CardHeader>
            <CardBody>
              {shipmentDataFromState ? (
                <Table variant='simple' colorScheme='gray'>
                  <Thead>
                    <Tr>
                      <Th>Field</Th>
                      <Th>Details</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Full Name</Td>
                      <Td>{shipmentDataFromState.receiverName}</Td>
                    </Tr>
                    <Tr>
                      <Td>Address</Td>
                      <Td>{shipmentDataFromState.receiverAddress}</Td>
                    </Tr>
                    <Tr>
                      <Td>City</Td>
                      <Td>
                        {shipmentDataFromState.orderId.shippingAddress.city}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Postal Code</Td>
                      <Td>
                        {
                          shipmentDataFromState.orderId.shippingAddress
                            .postalCode
                        }
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Country</Td>
                      <Td>
                        {shipmentDataFromState.orderId.shippingAddress.country}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Phone</Td>
                      <Td>{shipmentDataFromState.receiverCellPhone}</Td>
                    </Tr>
                    <Tr>
                      <Td>Email</Td>
                      <Td>{shipmentDataFromState.receiverEmail}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              ) : (
                <Stack spacing='2rem' color='black'>
                  <Box>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      type='text'
                      name='fullName'
                      placeholder='Full name'
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </Box>

                  <Box>
                    <FormLabel>Address</FormLabel>
                    <Input
                      type='text'
                      name='address'
                      placeholder='address'
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </Box>

                  <Box>
                    <FormLabel>City</FormLabel>
                    <Input
                      type='text'
                      name='city'
                      placeholder='city'
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </Box>

                  <Box>
                    <FormLabel>Postal Code</FormLabel>
                    <Input
                      type='text'
                      name='postalCode'
                      placeholder='postal code'
                      value={formData.postalCode}
                      onChange={handleChange}
                    />
                  </Box>

                  <Box>
                    <FormLabel>Country</FormLabel>
                    <Input
                      type='text'
                      name='country'
                      placeholder='country'
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </Box>

                  <Box>
                    <FormLabel>Phone</FormLabel>
                    <Input
                      type='text'
                      name='phone'
                      placeholder='phone number'
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Box>

                  <Box>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type='email'
                      name='email'
                      placeholder='email'
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Box>

                  <Box>
                    <FormLabel>Carrier Type</FormLabel>
                    <Input
                      type='text'
                      name='carrierType'
                      placeholder='carrier type'
                      value={formData.carrierType}
                      onChange={handleChange}
                    />
                  </Box>

                  <Box>
                    <FormLabel>Carrier Number</FormLabel>
                    <Input
                      type='text'
                      name='carrierNum'
                      placeholder='carrier number'
                      value={formData.carrierNum}
                      onChange={handleChange}
                    />
                  </Box>

                  <Box>
                    <FormLabel>Tax ID</FormLabel>
                    <Input
                      type='text'
                      name='taxId'
                      placeholder='tax ID'
                      value={formData.taxId}
                      onChange={handleChange}
                    />
                  </Box>

                  <Box>
                    <FormLabel>Donate Code</FormLabel>
                    <Input
                      type='text'
                      name='donateCode'
                      placeholder='donate code'
                      value={formData.donateCode}
                      onChange={handleChange}
                    />
                  </Box>
                </Stack>
              )}
            </CardBody>
          </Card>
        </Stack>

        <Box w={{ base: '100%', lg: '40%' }}>
          <Card
            borderWidth='1px'
            bg='none'
            borderColor='gray.200'
            color='black'
            p='2rem'
            shadow='md'
          >
            <CardHeader>
              <Heading size='md'>Payment Details</Heading>
            </CardHeader>
            <CardBody>
              <Stack spacing='2rem'>
                <Flex>
                  <Input
                    type='text'
                    placeholder='Enter Coupon Code'
                    rounded='full'
                  />
                  <Button
                    bgColor='brand.primary'
                    rounded='full'
                    ml='-40px'
                    px='2rem'
                    _hover={{ bgColor: 'brand.primaryDark' }}
                    _active={{ bgColor: 'brand.primaryDark' }}
                    color='black'
                    bg='red.200'
                  >
                    Apply Coupon
                  </Button>
                </Flex>
                <Divider mt='1rem' />

                <Box>
                  <Heading size='xs' my='1rem'>
                    Payment Option
                  </Heading>
                  <RadioGroup
                    onChange={(value) => setPaymentMethod(value)}
                    value={paymentMethod}
                  >
                    <Stack>
                      <Radio value='cashOnDelivery'>Cash On Delivery</Radio>
                      <Radio value='momo'>Mobile Money Payment</Radio>
                      <Radio value='3'>Credit Card (Master/Visa)</Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
              </Stack>
              <Divider mt='1rem' />

              <Box>
                <Flex justify='space-between' align='center' my='1rem'>
                  <Text fontWeight='bold'>Sub Total</Text>
                  <Text fontWeight='bold'>
                    $
                    {formatPrice(
                      shipmentDataFromState
                        ? shipmentDataFromState.orderId.totalPrice
                        : subTotal,
                    )}
                  </Text>
                </Flex>

                <Flex justify='space-between' align='center' my='1rem'>
                  <Text fontWeight='bold'>Tax(10%)</Text>
                  <Text fontWeight='bold'>${formatPrice(tax)}</Text>
                </Flex>

                <Flex justify='space-between' align='center' my='1rem'>
                  <Text fontWeight='bold'>Coupon Discount</Text>
                  <Text fontWeight='bold'>-${formatPrice(tax)}</Text>
                </Flex>

                <Flex justify='space-between' align='center' my='1rem'>
                  <Text fontWeight='bold'>Shipping Cost</Text>
                  <Text fontWeight='bold'>${formatPrice(logisticsFee)}</Text>
                </Flex>
                <Divider />
                <Flex justify='space-between' align='center' my='1rem'>
                  <Text fontWeight='bold'>Total</Text>
                  <Text fontWeight='bold'>
                    $
                    {formatPrice(
                      shipmentDataFromState
                        ? shipmentDataFromState.orderId.totalPrice +
                            logisticsFee
                        : total,
                    )}
                  </Text>
                </Flex>
              </Box>

              {!uniqueId ? (
                <Button
                  bgColor='brand.primary'
                  color='white'
                  w='100%'
                  rounded='full'
                  _hover={{ bgColor: 'red.200' }}
                  _active={{ bgColor: 'red.500' }}
                  bg='red.300'
                  onClick={handleOrderSubmit}
                >
                  Create Order
                </Button>
              ) : (
                <Button
                  bgColor='brand.primary'
                  color='white'
                  w='100%'
                  rounded='full'
                  _hover={{ bgColor: 'red.200' }}
                  _active={{ bgColor: 'red.500' }}
                  bg='red.300'
                  onClick={handlePaymentSubmit}
                  mt='1rem'
                >
                  Pay $
                  {formatPrice(
                    shipmentDataFromState
                      ? shipmentDataFromState.orderId.totalPrice + logisticsFee
                      : total,
                  )}
                </Button>
              )}
            </CardBody>
          </Card>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>選擇物流</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>請點擊以下按鈕選擇物流：</Text>
              <Button
                mt='1rem'
                colorScheme='teal'
                onClick={handleLogisticsSelection}
              >
                前往選擇物流
              </Button>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                關閉
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </DotAnimationLoadingLayout>
  );
};

export default CheckoutPage;
