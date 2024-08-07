import {
  Box,
  Button,
  Card,
  CardHeader,
  Flex,
  Heading,
  Image,
  Input,
  Radio,
  RadioGroup,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { CreditCard, Gift, Truck } from 'lucide-react';
import { useState } from 'react';

const CheckoutPage = () => {
  const [couponCode, setCouponCode] = useState('');

  return (
    <Box className='checkout-page min-h-screen bg-gray-100 p-8'>
      <Box className='checkout-page__container max-w-7xl mx-auto'>
        <Heading
          as='h1'
          className='checkout-page__title text-3xl font-bold text-gray-800 mb-8'
        >
          結帳
        </Heading>
        <Flex className='checkout-page__main flex-col lg:flex-row gap-8'>
          {/* Left Column */}
          <VStack className='checkout-page__left flex-grow space-y-8'>
            {/* Shipping Information */}
            <Card className='checkout-page__card'>
              <CardHeader className='checkout-page__card-header'>
                <Flex className='checkout-page__card-title flex items-center text-xl font-semibold'>
                  <Truck className='mr-2' size={24} />
                  送貨資訊
                </Flex>
              </CardHeader>
              <Box className='checkout-page__card-content grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Input placeholder='姓' />
                <Input placeholder='名' />
                <Input placeholder='電子郵件' className='md:col-span-2' />
                <Input placeholder='電話號碼' className='md:col-span-2' />
                <Input placeholder='地址' className='md:col-span-2' />
                <Input placeholder='城市' />
                <Input placeholder='郵遞區號' />
                <Select placeholder='國家'>
                  <option value='tw'>台灣</option>
                  <option value='cn'>中國</option>
                  <option value='jp'>日本</option>
                </Select>
              </Box>
            </Card>

            {/* Order Summary */}
            <Card className='checkout-page__card'>
              <CardHeader className='checkout-page__card-header'>
                <Text className='checkout-page__card-title text-xl font-semibold'>
                  訂單摘要
                </Text>
              </CardHeader>
              <Box className='checkout-page__card-content space-y-4'>
                {/* Sample product, repeat as necessary */}
                <Flex className='checkout-page__product flex items-center justify-between'>
                  <Flex className='checkout-page__product-details flex items-center space-x-4'>
                    <Image
                      src='/api/placeholder/80/80'
                      alt='Product'
                      className='checkout-page__product-image w-20 h-20 object-cover rounded'
                    />
                    <Box>
                      <Heading
                        as='h3'
                        className='checkout-page__product-name font-semibold'
                      >
                        產品名稱
                      </Heading>
                      <Text className='checkout-page__product-quantity text-sm text-gray-500'>
                        數量: 1
                      </Text>
                    </Box>
                  </Flex>
                  <Text className='checkout-page__product-price font-semibold'>
                    NT$1,000
                  </Text>
                </Flex>
                <Box className='checkout-page__summary border-t pt-4'>
                  <Flex className='checkout-page__summary-row flex justify-between'>
                    <Text>小計</Text>
                    <Text>NT$1,000</Text>
                  </Flex>
                  <Flex className='checkout-page__summary-row flex justify-between'>
                    <Text>運費</Text>
                    <Text>NT$100</Text>
                  </Flex>
                </Box>
              </Box>
            </Card>
          </VStack>

          {/* Right Column */}
          <VStack className='checkout-page__right w-full lg:w-1/3 space-y-8'>
            {/* Payment Method */}
            <Card className='checkout-page__card'>
              <CardHeader className='checkout-page__card-header'>
                <Flex className='checkout-page__card-title flex items-center text-xl font-semibold'>
                  <CreditCard className='mr-2' size={24} />
                  付款方式
                </Flex>
              </CardHeader>
              <Box className='checkout-page__card-content space-y-4'>
                <RadioGroup defaultValue='credit-card'>
                  <VStack align='start'>
                    <Radio
                      value='credit-card'
                      className='checkout-page__payment-option flex items-center space-x-2'
                    >
                      <label>信用卡</label>
                    </Radio>
                    <Radio
                      value='line-pay'
                      className='checkout-page__payment-option flex items-center space-x-2'
                    >
                      <label>LINE Pay</label>
                    </Radio>
                    <Radio
                      value='apple-pay'
                      className='checkout-page__payment-option flex items-center space-x-2'
                    >
                      <label>Apple Pay</label>
                    </Radio>
                  </VStack>
                </RadioGroup>
              </Box>
            </Card>

            {/* Discount Code */}
            <Card className='checkout-page__card'>
              <CardHeader className='checkout-page__card-header'>
                <Flex className='checkout-page__card-title flex items-center text-xl font-semibold'>
                  <Gift className='mr-2' size={24} />
                  折扣碼
                </Flex>
              </CardHeader>
              <Box className='checkout-page__card-content space-y-4'>
                <Flex className='checkout-page__coupon flex space-x-2'>
                  <Input
                    placeholder='輸入折扣碼'
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button>套用</Button>
                </Flex>
              </Box>
            </Card>

            {/* Order Total */}
            <Card className='checkout-page__card'>
              <Box className='checkout-page__card-content space-y-4'>
                <Flex className='checkout-page__total flex justify-between items-center'>
                  <Text className='text-lg font-semibold'>總計</Text>
                  <Text className='checkout-page__total-amount text-2xl font-bold'>
                    NT$1,100
                  </Text>
                </Flex>
                <Button className='checkout-page__submit-btn w-full bg-blue-600 hover:bg-blue-700 text-white py-3'>
                  確認付款
                </Button>
                <Text className='checkout-page__terms text-xs text-center text-gray-500'>
                  點擊「確認付款」即表示您同意我們的條款和條件
                </Text>
              </Box>
            </Card>
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
