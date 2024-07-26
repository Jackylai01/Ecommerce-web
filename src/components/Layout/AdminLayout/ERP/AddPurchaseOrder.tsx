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

const AddPurchaseOrder = () => {
  const toast = useToast();
  const [supplier, setSupplier] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState('');
  const [orderDate, setOrderDate] = useState('');

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    toast({
      title: '進貨訂單已創建',
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
        新增進貨訂單
      </Heading>
      <form onSubmit={handleFormSubmit}>
        <FormControl mb='15px'>
          <FormLabel>選擇供應商</FormLabel>
          <Select
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            placeholder='選擇供應商'
          >
            <option value='1'>供應商A</option>
            <option value='2'>供應商B</option>
            <option value='3'>供應商C</option>
          </Select>
        </FormControl>
        <FormControl mb='15px'>
          <FormLabel>產品名稱</FormLabel>
          <Input
            type='text'
            placeholder='產品名稱'
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </FormControl>
        <FormControl mb='15px'>
          <FormLabel>數量</FormLabel>
          <Input
            type='number'
            placeholder='數量'
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          />
        </FormControl>
        <FormControl mb='15px'>
          <FormLabel>單價</FormLabel>
          <Input
            type='number'
            placeholder='單價'
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
          />
        </FormControl>
        <FormControl mb='15px'>
          <FormLabel>訂單日期</FormLabel>
          <Input
            type='date'
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
          />
        </FormControl>
        <Button type='submit' colorScheme='blue' w='full'>
          創建進貨訂單
        </Button>
      </form>
    </Box>
  );
};

export default AddPurchaseOrder;
