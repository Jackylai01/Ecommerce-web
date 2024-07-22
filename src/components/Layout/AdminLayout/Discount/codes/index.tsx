import { Box, Button, HStack, Text, useToast } from '@chakra-ui/react';

interface DiscountItemProps {
  code: string;
  amount: string;
  expiry: string;
  usage: string;
  condition: string;
  onClick: () => void;
}

const DiscountItem: React.FC<DiscountItemProps> = ({
  code,
  amount,
  expiry,
  usage,
  condition,
  onClick,
}) => {
  const toast = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: '折扣碼已複製',
        description: `折扣碼已複製：${text}`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    });
  };

  return (
    <Box
      bg='gray.100'
      p={4}
      borderRadius='md'
      boxShadow='md'
      mb={4}
      w='90%'
      _hover={{ transform: 'translateY(-3px)', boxShadow: 'lg' }}
      onClick={onClick}
    >
      <HStack justify='space-between' mb={2}>
        <Button
          variant='link'
          colorScheme='blue'
          onClick={(e) => {
            e.stopPropagation();
            copyToClipboard(code);
          }}
        >
          {code}
        </Button>
        <Text fontWeight='bold' color='orange.400'>
          {amount}
        </Text>
      </HStack>
      <HStack justify='space-between' fontSize='sm' color='gray.500'>
        <Text>
          <span role='img' aria-label='calendar'>
            🗓️
          </span>{' '}
          到期：{expiry}
        </Text>
        <Text>
          <span role='img' aria-label='repeat'>
            🔄
          </span>{' '}
          {usage}
        </Text>
      </HStack>
      <Text fontSize='sm' color='gray.600' mt={2}>
        {condition}
      </Text>
    </Box>
  );
};

export default DiscountItem;
