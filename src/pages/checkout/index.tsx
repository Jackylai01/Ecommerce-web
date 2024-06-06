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
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  calculateItemsTotal,
  formatPrice,
  getSubstring,
} from '@helpers/products';
import useAppSelector from '@hooks/useAppSelector';
import axios from 'axios';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

// TODO 實際的金流串接

export const CheckoutPage: NextPage = () => {
  const [subTotal, setSubTotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [formAction, setFormAction] = useState('');
  const [formInputs, setFormInputs] = useState<JSX.Element[]>([]);
  const [paymentMethod, setPaymentMethod] = useState(''); // 選擇支付方式
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    email: '',
    orderId: '',
    TotalAmount: '',
    TradeDesc: '',
    ItemName: '',
    ReturnURL: '',
    ChoosePayment: 'ALL',
  });

  const { checkout } = useAppSelector((state) => state.clientCart);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/ecpay/create-payment', {
        ...formData,
        orderId: 'some-generated-order-id', // 替換為實際訂單 ID
        TotalAmount: subTotal + tax,
        TradeDesc: 'Your order description',
        ItemName: checkout.map((item) => item.name).join('#'),
        ReturnURL: 'http://localhost:3000/payment-success', // 替換為實際回調 URL
      });
      const { apiURL, params } = response.data;

      setFormAction(apiURL);
      setFormInputs(
        Object.entries(params).map(([key, value]) => (
          <input key={key} name={key} value={String(value)} readOnly />
        )),
      );

      const form = document.getElementById('ecpayForm') as HTMLFormElement;
      if (form) {
        form.submit();
      }
    } catch (error) {
      console.error('Error creating payment', error);
    }
  };

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
                <Flex key={item.id} align='center' justify='space-between'>
                  <Flex align='center'>
                    <Image
                      src={item.mainImage}
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
                  _hover={{
                    bgColor: 'brand.primaryDark',
                  }}
                  _active={{
                    bgColor: 'brand.primaryDark',
                  }}
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
              _hover={{
                bgColor: 'red.200',
              }}
              _active={{
                bgColor: 'red.500',
              }}
              bg='red.300'
              onClick={handleSubmit}
            >
              Pay ${formatPrice(subTotal)}
            </Button>
          </CardBody>
        </Card>
      </Box>
      <form id='ecpayForm' method='post' action={formAction}>
        {formInputs}
        <input type='submit' value='送出參數' />
      </form>
    </Flex>
  );
};

export default CheckoutPage;
