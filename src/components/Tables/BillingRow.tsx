import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { useAdminColorMode } from 'src/context/colorMode';

function BillingRow(props: any) {
  const { colorMode } = useAdminColorMode();
  const textColor = colorMode === 'light' ? 'gray.700' : 'white';
  const bgColor = colorMode === 'light' ? '#F8F9FA' : 'white';
  const nameColor = colorMode === 'light' ? 'gray.500' : 'white';

  const { name, company, email, number } = props;

  return (
    <Box p='24px' bg={bgColor} my='22px' borderRadius='12px'>
      <Flex justify='space-between' w='100%'>
        <Flex direction='column' maxWidth='70%'>
          <Text color={nameColor} fontSize='md' fontWeight='bold' mb='10px'>
            {name}
          </Text>
          <Text color='gray.400' fontSize='sm' fontWeight='semibold'>
            Company Name:{' '}
            <Text as='span' color='gray.500'>
              {company}
            </Text>
          </Text>
          <Text color='gray.400' fontSize='sm' fontWeight='semibold'>
            Email Address:{' '}
            <Text as='span' color='gray.500'>
              {email}
            </Text>
          </Text>
          <Text color='gray.400' fontSize='sm' fontWeight='semibold'>
            VAT Number:{' '}
            <Text as='span' color='gray.500'>
              {number}
            </Text>
          </Text>
        </Flex>
        <Flex
          direction={{ sm: 'column', md: 'row' }}
          align='flex-start'
          p={{ md: '24px' }}
        >
          <Button
            p='0px'
            bg='transparent'
            mb={{ sm: '10px', md: '0px' }}
            me={{ md: '12px' }}
          >
            <Flex color='red.500' cursor='pointer' align='center' p='12px'>
              <Icon as={FaTrashAlt} me='4px' />
              <Text fontSize='sm' fontWeight='semibold'>
                DELETE
              </Text>
            </Flex>
          </Button>
          <Button p='0px' bg='transparent'>
            <Flex color={textColor} cursor='pointer' align='center' p='12px'>
              <Icon as={FaPencilAlt} me='4px' />
              <Text fontSize='sm' fontWeight='semibold'>
                EDIT
              </Text>
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default BillingRow;
