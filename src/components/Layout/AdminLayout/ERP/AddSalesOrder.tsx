import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

const AddSalesOrder = () => {
  const toast = useToast();
  const [customerName, setCustomerName] = useState('');
  const [saleProduct, setSaleProduct] = useState('');
  const [saleQuantity, setSaleQuantity] = useState(0);
  const [saleUnitPrice, setSaleUnitPrice] = useState('');
  const [saleOrderDate, setSaleOrderDate] = useState('');

  const handleSaleFormSubmit = (e: any) => {
    e.preventDefault();
    toast({
      title: '銷售訂單已創建',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      bg='white'
      p='25px'
      borderRadius='10px'
      boxShadow='md'
      transition='all 0.3s ease'
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
      }}
    >
      <Heading
        fontSize='20px'
        mb='20px'
        color='blue.400'
        borderBottom='2px'
        borderColor='blue.400'
        pb='10px'
      >
        新增銷售訂單
      </Heading>
      <form onSubmit={handleSaleFormSubmit}>
        <FormControl mb='15px'>
          <FormLabel>客戶名稱</FormLabel>
          <Input
            type='text'
            placeholder='客戶名稱'
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </FormControl>
        <FormControl mb='15px'>
          <FormLabel>選擇產品</FormLabel>
          <Select
            value={saleProduct}
            onChange={(e) => setSaleProduct(e.target.value)}
            placeholder='選擇產品'
          >
            <option value='1'>產品A</option>
            <option value='2'>產品B</option>
            <option value='3'>產品C</option>
          </Select>
        </FormControl>
        <FormControl mb='15px'>
          <FormLabel>數量</FormLabel>
          <Input
            type='number'
            placeholder='數量'
            value={saleQuantity}
            onChange={(e) => setSaleQuantity(parseInt(e.target.value, 10))}
          />
        </FormControl>
        <FormControl mb='15px'>
          <FormLabel>單價</FormLabel>
          <Input
            type='number'
            placeholder='單價'
            value={saleUnitPrice}
            onChange={(e) => setSaleUnitPrice(e.target.value)}
          />
        </FormControl>
        <FormControl mb='15px'>
          <FormLabel>訂單日期</FormLabel>
          <Input
            type='date'
            value={saleOrderDate}
            onChange={(e) => setSaleOrderDate(e.target.value)}
          />
        </FormControl>
        <Button type='submit' colorScheme='blue' w='full'>
          創建銷售訂單
        </Button>
      </form>
    </Box>
  );
};

export default AddSalesOrder;
