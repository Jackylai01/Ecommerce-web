import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import { createInventoryAsyncAsync } from '@reducers/admin/admin-erp/inventory/actions';
import { useState } from 'react';

const AddInventory = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [reorderLevel, setReorderLevel] = useState(0);

  const handleAddInventory = async () => {
    if (!productName || quantity <= 0 || reorderLevel <= 0) {
      toast({
        title: 'Invalid input',
        description: 'Please fill all fields correctly.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newInventory = {
      productId: '',
      productName,
      productDescription: '',
      stock: quantity,
      reorderLevel,
      reorderAmount: 0,
      updatedAt: new Date(),
    };

    dispatch(createInventoryAsyncAsync(newInventory));
    toast({
      title: 'Inventory added',
      description: `${productName} has been added to inventory.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    setProductName('');
    setQuantity(0);
    setReorderLevel(0);
  };

  return (
    <Box bg='white' p='25px' borderRadius='10px' boxShadow='md'>
      <Heading
        fontSize='20px'
        mb='20px'
        color='blue.400'
        borderBottom='2px'
        borderColor='blue.400'
        pb='10px'
      >
        新增庫存
      </Heading>
      <VStack spacing='15px'>
        <Input
          type='text'
          placeholder='產品名稱'
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <Input
          type='number'
          placeholder='數量'
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
        />
        <Input
          type='number'
          placeholder='補貨點'
          value={reorderLevel}
          onChange={(e) => setReorderLevel(parseInt(e.target.value, 10))}
        />
        <Button type='button' onClick={handleAddInventory} colorScheme='blue'>
          新增
        </Button>
      </VStack>
    </Box>
  );
};

export default AddInventory;
