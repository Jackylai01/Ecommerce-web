import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { formatPrice } from '@helpers/products';

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
}) => {
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
            <Flex justify='space-between' align='center'>
              <Text fontWeight='bold'>Sub Total</Text>
              <Text fontWeight='bold'>${formatPrice(subTotal)}</Text>
            </Flex>

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
