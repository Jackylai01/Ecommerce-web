import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { formatPrice, getSubstring } from '@helpers/products';
import useAppSelector from '@hooks/useAppSelector';

const ReviewItems = () => {
  const { checkout } = useAppSelector((state) => state.clientCart);
  const { shipmentData: shipmentDataFromState } = useAppSelector(
    (state) => state.publicPayments,
  );

  return (
    <Card borderWidth='1px' bg='none' borderColor='gray.200' shadow='none'>
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
                    <Text fontWeight='bold' fontSize={{ base: 'md', lg: 'lg' }}>
                      ${formatPrice(item.price)}
                    </Text>
                    <Text fontSize={{ base: 'sm', lg: 'md' }}>
                      Quantity: {item.count}
                    </Text>
                  </Box>
                </Box>
              ))
            : shipmentDataFromState?.orderId?.products?.map((item: any) => (
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
                    <Text fontWeight='bold' fontSize={{ base: 'md', lg: 'lg' }}>
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
  );
};

export default ReviewItems;
