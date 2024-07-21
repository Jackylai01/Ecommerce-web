import {
  Box,
  Card,
  CardBody,
  CardHeader,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import useAppSelector from '@hooks/useAppSelector';
import { ChangeEvent } from 'react';

interface DeliveryInformationProps {
  formData: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
    email: string;
    carrierType: string;
    carrierNum: string;
    taxId: string;
    donateCode: string;
    paymentMethod: string;
  };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePaymentMethodChange: (value: string) => void;
}

const DeliveryInformation = ({
  formData,
  handleChange,
  handlePaymentMethodChange,
}: DeliveryInformationProps) => {
  const { shipmentData: shipmentDataFromState } = useAppSelector(
    (state) => state.publicPayments,
  );

  return (
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
                <Td>{shipmentDataFromState.orderId?.shippingAddress.city}</Td>
              </Tr>
              <Tr>
                <Td>Postal Code</Td>
                <Td>
                  {shipmentDataFromState.orderId?.shippingAddress.postalCode}
                </Td>
              </Tr>
              <Tr>
                <Td>Country</Td>
                <Td>
                  {shipmentDataFromState.orderId?.shippingAddress.country}
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
              <FormLabel>Payment Method</FormLabel>
              <RadioGroup
                onChange={handlePaymentMethodChange}
                value={formData.paymentMethod}
              >
                <Stack direction='row'>
                  <Box
                    border='1px solid'
                    borderColor='blue.500'
                    borderRadius='md'
                    p={2}
                  >
                    <Radio value='EcPay' borderColor='gray.600'>
                      綠界金流
                    </Radio>
                  </Box>
                  <Box
                    border='1px solid'
                    borderColor='blue.500'
                    borderRadius='md'
                    p={2}
                  >
                    <Radio value='LinePay' borderColor='gray.600'>
                      LinePay
                    </Radio>
                  </Box>
                  <Box
                    border='1px solid'
                    borderColor='blue.500'
                    borderRadius='md'
                    p={2}
                  >
                    <Radio value='COD' borderColor='gray.600'>
                      貨到付款
                    </Radio>
                  </Box>
                </Stack>
              </RadioGroup>
            </Box>
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
  );
};

export default DeliveryInformation;
