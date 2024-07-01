import { Box, Heading } from '@chakra-ui/react';

interface HistoryItemProps {
  name: string;
  date: string;
  price: string | number;
}

export const HistoryItem = ({ name, date, price }: HistoryItemProps) => (
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
      {name}
    </Heading>
    <Box>購買日期: {date}</Box>
    <Box>價格: NT${price}</Box>
  </Box>
);
