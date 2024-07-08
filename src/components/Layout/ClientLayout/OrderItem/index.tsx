import { Badge, Box, Button, Heading, useDisclosure } from '@chakra-ui/react';
import ReturnStatusModal from '@components/Modal/ReturnStatusModal';
import { getStatusColorScheme, statusMap } from '@fixtures/statusMaps';
import { Transaction } from '@models/responses/transactions.res';

interface OrderItemProps {
  orderId: string | number;
  date: string;
  status: Transaction['status'];
  amount: string | number;
  refunds?: any[];
}

export const OrderItem: React.FC<OrderItemProps> = ({
  orderId,
  date,
  status,
  amount,
  refunds,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(refunds);
  return (
    <Box
      w='100%'
      bg='#f8f9fa'
      p='20px'
      borderRadius='12px'
      boxShadow='0 10px 20px rgba(0, 0, 0, 0.05)'
      borderLeft='5px solid #c0a080'
      _hover={{ transform: 'translateX(5px)' }}
    >
      <Heading as='h3' fontSize='20px'>
        訂單 #{orderId}
      </Heading>
      <Box>下單日期: {date}</Box>
      <Box>
        狀態:
        <Badge colorScheme={getStatusColorScheme(status)}>
          {statusMap[status]}
        </Badge>
      </Box>
      <Box>總額: NT${amount}</Box>
      {refunds && refunds.length > 0 && (
        <Button colorScheme='teal' mt='10px' onClick={onOpen}>
          查看退換貨狀態
        </Button>
      )}
      <ReturnStatusModal isOpen={isOpen} onClose={onClose} refunds={refunds} />
    </Box>
  );
};
