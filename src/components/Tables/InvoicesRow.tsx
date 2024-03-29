import { Box, Button, Flex, Icon, Spacer, Text } from '@chakra-ui/react';
import { useAdminColorMode } from 'src/context/colorMode';

function InvoicesRow(props: any) {
  const { colorMode } = useAdminColorMode();
  const textColor = colorMode === 'light' ? 'gray.700' : 'white';

  const { date, code, price, format, logo } = props;

  return (
    <Flex my={{ sm: '1rem', xl: '10px' }} alignItems='center'>
      <Flex direction='column'>
        <Text fontSize='md' color={textColor} fontWeight='bold'>
          {date}
        </Text>
        <Text fontSize='sm' color='gray.400' fontWeight='semibold' me='16px'>
          {code}
        </Text>
      </Flex>
      <Spacer />
      <Box me='12px'>
        <Text fontSize='md' color='gray.400' fontWeight='semibold'>
          {price}
        </Text>
      </Box>
      <Button p='0px' bg='transparent' variant='no-hover'>
        <Flex alignItems='center' p='12px'>
          <Icon as={logo} w='20px' h='auto' me='5px' />
          <Text fontSize='md' color={textColor} fontWeight='bold'>
            {format}
          </Text>
        </Flex>
      </Button>
    </Flex>
  );
}

export default InvoicesRow;
