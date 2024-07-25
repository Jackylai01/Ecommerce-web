import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { formatPrice } from '@helpers/products';
import { IDiscount } from '@models/responses/discounts';
import { ShoppingCredit } from '@models/responses/shoppingCredit';
import { useRouter } from 'next/router';

interface PaymentDetailsProps {
  total: number;
  subTotal: number;
  logisticsFee: number;
  appliedDiscount: number;
  handleOrderSubmit: (e: React.FormEvent) => void;
  handlePaymentSubmit: () => void;
  isOrderButtonDisabled: boolean;
  uniqueId: string | string[] | undefined;
  freeShipping: boolean;
  discountCode: string;
  handleDiscountCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleApplyDiscountCode: () => void;
  discount: IDiscount | null;
  paymentMethod: string; // 新增付款方式
  shoppingCredits: ShoppingCredit[]; // 傳遞購物金
  useShoppingCredit: boolean; // 傳遞購物金使用狀態
  handleCreditChange: () => void; // 傳遞購物金勾選函數
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  total,
  subTotal,
  logisticsFee,
  appliedDiscount,
  handleOrderSubmit,
  handlePaymentSubmit,
  isOrderButtonDisabled,
  uniqueId,
  freeShipping,
  discountCode,
  handleDiscountCodeChange,
  handleApplyDiscountCode,
  discount,
  paymentMethod,
  shoppingCredits,
  useShoppingCredit,
  handleCreditChange,
}) => {
  const router = useRouter();

  const handleViewOrder = () => {
    router.push('/client');
  };

  const availableCredit = shoppingCredits.reduce(
    (acc, credit) => acc + credit.amount,
    0,
  );

  return (
    <Box w='100%'>
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
            {!uniqueId && (
              <>
                <Flex justify='space-between' align='center'>
                  <Text fontWeight='bold'>Discount Code</Text>
                  <Input
                    value={discountCode}
                    onChange={handleDiscountCodeChange}
                    placeholder='輸入折扣碼'
                    w='65%'
                  />
                </Flex>
                <Button onClick={handleApplyDiscountCode}>應用</Button>
              </>
            )}

            <Flex justify='space-between' align='center'>
              <Text fontWeight='bold'>Sub Total</Text>
              <Text fontWeight='bold'>${formatPrice(subTotal)}</Text>
            </Flex>

            {discount && (
              <Flex justify='space-between' align='center'>
                <Text fontWeight='bold'>Applied Discount</Text>
                <Text fontWeight='bold'>
                  {discount.name} - ${formatPrice(discount.value)}
                </Text>
              </Flex>
            )}

            {appliedDiscount > 0 && (
              <Flex justify='space-between' align='center'>
                <Text fontWeight='bold'>Order Discount</Text>
                <Text fontWeight='bold'>-${formatPrice(appliedDiscount)}</Text>
              </Flex>
            )}

            {!freeShipping && (
              <Flex justify='space-between' align='center'>
                <Text fontWeight='bold'>Shipping Cost</Text>
                <Text fontWeight='bold'>${formatPrice(logisticsFee)}</Text>
              </Flex>
            )}

            {shoppingCredits.length > 0 && !uniqueId && (
              <Flex justify='space-between' align='center'>
                <Text fontWeight='bold'>Available Shopping Credit</Text>
                <Text fontWeight='bold'>${formatPrice(availableCredit)}</Text>
                <Checkbox
                  isChecked={useShoppingCredit}
                  onChange={handleCreditChange}
                  ml='4'
                  borderColor='gray.400'
                >
                  使用購物金
                </Checkbox>
              </Flex>
            )}

            <Divider />
            <Flex justify='space-between' align='center'>
              <Text fontWeight='bold'>Total</Text>
              <Text fontWeight='bold'>${formatPrice(total)}</Text>
            </Flex>
          </Stack>
          <Divider mt='1rem' mb='1rem' />

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
              disabled={isOrderButtonDisabled}
            >
              Create Order
            </Button>
          ) : paymentMethod === 'COD' ? (
            <Button
              bgColor='brand.primary'
              color='white'
              w='100%'
              rounded='full'
              _hover={{ bgColor: 'blue.200' }}
              _active={{ bgColor: 'blue.500' }}
              bg='blue.300'
              onClick={handleViewOrder}
              mt='1rem'
            >
              查看訂單
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
              Pay ${formatPrice(total)}
            </Button>
          )}
        </CardBody>
      </Card>
    </Box>
  );
};

export default PaymentDetails;
