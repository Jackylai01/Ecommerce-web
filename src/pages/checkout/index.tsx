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
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import {
  calculateItemsTotal,
  formatPrice,
  getSubstring,
} from '@helpers/products';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  createOrderAsync,
  createPaymentAsync,
  handleClientReplyAsync,
  redirectToLogisticsSelectionAsync,
} from '@reducers/public/payments/actions';

import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const CheckoutPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [subTotal, setSubTotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
    email: '',
  });

  const [logisticsResult, setLogisticsResult] = useState<any>(null);
  const { checkout } = useAppSelector((state) => state.clientCart);
  const {
    order,
    logisticsSelection,
    status: { createOrderSuccess, createOrderLoading, createOrderFailed },
  } = useAppSelector((state) => state.publicPayments);

  const { userInfo } = useAppSelector((state) => state.clientAuth);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const logisticsResult = queryParams.get('logisticsResult');
    const orderId = queryParams.get('orderId');
    if (logisticsResult) {
      setLogisticsResult(JSON.parse(decodeURIComponent(logisticsResult)));
    }
    if (orderId && !order) {
      dispatch(handleClientReplyAsync({ orderId }));
    }
  }, [dispatch, order]);

  useEffect(() => {
    const subTotal = calculateItemsTotal(checkout);
    const tax = 0.1 * subTotal;
    setSubTotal(subTotal);
    setTax(tax);
  }, [checkout]);

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
      })),
      totalPrice: subTotal + tax,
      shippingAddress: {
        ...formData,
      },
    };
    await dispatch(createOrderAsync(orderData));
  };

  const handlePaymentSubmit = async () => {
    if (order) {
      const paymentData = {
        orderId: order._id,
        TradeDesc: 'Your order description',
        ItemName: checkout.map((item) => item.name).join('#'),
        ReturnURL: 'http://localhost:3000/public/payment-success',
        ChoosePayment: 'ALL',
      };
      await dispatch(createPaymentAsync(paymentData));
    }
  };

  const handleLogisticsSelection = async () => {
    if (order) {
      const response = await dispatch(
        redirectToLogisticsSelectionAsync(order._id),
      );

      if (
        response.payload &&
        response.payload.data &&
        response.payload.data.html
      ) {
        const newWindow = window.open();
        newWindow?.document.write(response.payload.data.html);
      } else {
        toast({
          title: '選擇物流失敗',
          description: '無法獲取物流選擇頁面，請重試',
          status: 'error',
          isClosable: true,
        });
      }
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
  }, [
    createOrderSuccess,
    createOrderFailed,
    handleLogisticsSelection,
    onOpen,
    toast,
  ]);

  useEffect(() => {
    if (logisticsResult) {
      toast({
        title: '物流選擇成功',
        description: '請繼續付款',
        status: 'success',
        isClosable: true,
      });
    }
  }, [logisticsResult, toast]);

  if (checkout.length === 0) {
    return (
      <Flex justify='center' align='center' h='100vh'>
        <Text fontSize='2xl' fontWeight='bold'>
          您的購物車是空的
        </Text>
      </Flex>
    );
  }

  return (
    <Flex
      w={{ base: '100%', lg: '90%' }}
      mx='auto'
      flexDir={{ base: 'column', lg: 'row' }}
      gap='2rem'
      shadow='md'
    >
      <Stack spacing={10} w={{ base: '100%', lg: '60%' }}>
        <Card borderWidth='1px' bg='none' borderColor='gray.200' shadow='none'>
          <CardHeader>
            <Heading size='md' color='black'>
              Review Items
            </Heading>
          </CardHeader>
          <CardBody>
            <Stack spacing='2rem'>
              {checkout.map((item) => (
                <Flex key={item._id} align='center' justify='space-between'>
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
                    <Text fontWeight='bold' fontSize={{ base: 'md', lg: 'lg' }}>
                      ${formatPrice(item.price)}
                    </Text>
                    <Text fontSize={{ base: 'sm', lg: 'md' }}>
                      Quantity: {item.count}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </Stack>
          </CardBody>
        </Card>
        <Card borderWidth='1px' bg='none' shadow='none'>
          <CardHeader>
            <Heading size='md'>Delivery Information</Heading>
          </CardHeader>
          <CardBody>
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
            </Stack>
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
                <Text fontWeight='bold'>${formatPrice(subTotal)}</Text>
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
                <Text fontWeight='bold'>-${formatPrice(0)}</Text>
              </Flex>
              <Divider />
              <Flex justify='space-between' align='center' my='1rem'>
                <Text fontWeight='bold'>Total</Text>
                <Text fontWeight='bold'>${formatPrice(subTotal)}</Text>
              </Flex>
            </Box>

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
              Pay ${formatPrice(subTotal)}
            </Button>
          </CardBody>
        </Card>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
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
  );
};

export default CheckoutPage;
