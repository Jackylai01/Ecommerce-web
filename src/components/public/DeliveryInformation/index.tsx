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
import { ChangeEvent, useState } from 'react';

interface DeliveryInformationProps {
  formData: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
    email: string;
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

  const [selectedOption, setSelectedOption] = useState(''); // 選擇載具編號、統一編號或愛心碼

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <Card borderWidth='1px' bg='none' shadow='none'>
      <CardHeader>
        <Heading size='md'>配送資訊</Heading>
      </CardHeader>
      <CardBody>
        {shipmentDataFromState ? (
          <Table variant='simple' colorScheme='gray'>
            <Thead>
              <Tr>
                <Th>欄位</Th>
                <Th>詳細資料</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>姓名</Td>
                <Td>{shipmentDataFromState.receiverName}</Td>
              </Tr>
              <Tr>
                <Td>地址</Td>
                <Td>{shipmentDataFromState.receiverAddress}</Td>
              </Tr>
              <Tr>
                <Td>城市</Td>
                <Td>{shipmentDataFromState.orderId?.shippingAddress.city}</Td>
              </Tr>
              <Tr>
                <Td>郵遞區號</Td>
                <Td>
                  {shipmentDataFromState.orderId?.shippingAddress.postalCode}
                </Td>
              </Tr>
              <Tr>
                <Td>國家</Td>
                <Td>
                  {shipmentDataFromState.orderId?.shippingAddress.country}
                </Td>
              </Tr>
              <Tr>
                <Td>電話</Td>
                <Td>{shipmentDataFromState.receiverCellPhone}</Td>
              </Tr>
              <Tr>
                <Td>電子郵件</Td>
                <Td>{shipmentDataFromState.receiverEmail}</Td>
              </Tr>
            </Tbody>
          </Table>
        ) : (
          <Stack spacing='2rem' color='black'>
            <Box>
              <FormLabel>付款方式</FormLabel>
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
              <FormLabel>姓名</FormLabel>
              <Input
                type='text'
                name='fullName'
                placeholder='請輸入姓名'
                value={formData.fullName}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <FormLabel>地址</FormLabel>
              <Input
                type='text'
                name='address'
                placeholder='請輸入地址'
                value={formData.address}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <FormLabel>城市</FormLabel>
              <Input
                type='text'
                name='city'
                placeholder='請輸入城市'
                value={formData.city}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <FormLabel>郵遞區號</FormLabel>
              <Input
                type='text'
                name='postalCode'
                placeholder='請輸入郵遞區號'
                value={formData.postalCode}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <FormLabel>國家</FormLabel>
              <Input
                type='text'
                name='country'
                placeholder='請輸入國家'
                value={formData.country}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <FormLabel>電話</FormLabel>
              <Input
                type='text'
                name='phone'
                placeholder='請輸入電話號碼'
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
              <FormLabel>選擇發票類型</FormLabel>
              <RadioGroup onChange={handleOptionChange} value={selectedOption}>
                <Stack direction='row' mt='1rem'>
                  <Radio value='carrierNum'>載具編號</Radio>
                  <Radio value='taxId'>統一編號</Radio>
                  <Radio value='donateCode'>愛心碼</Radio>
                </Stack>
              </RadioGroup>
            </Box>
            {selectedOption === 'carrierNum' && (
              <Box>
                <FormLabel>載具編號</FormLabel>
                <Input
                  type='text'
                  name='carrierNum'
                  placeholder='請輸入載具編號'
                  value={formData.carrierNum}
                  onChange={handleChange}
                />
              </Box>
            )}
            {selectedOption === 'taxId' && (
              <Box>
                <FormLabel>統一編號</FormLabel>
                <Input
                  type='text'
                  name='taxId'
                  placeholder='請輸入統一編號'
                  value={formData.taxId}
                  onChange={handleChange}
                />
              </Box>
            )}
            {selectedOption === 'donateCode' && (
              <Box>
                <FormLabel>愛心碼</FormLabel>
                <Input
                  type='text'
                  name='donateCode'
                  placeholder='請輸入愛心碼'
                  value={formData.donateCode}
                  onChange={handleChange}
                />
              </Box>
            )}
          </Stack>
        )}
      </CardBody>
    </Card>
  );
};

export default DeliveryInformation;
