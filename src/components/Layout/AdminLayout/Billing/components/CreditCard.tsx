import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import Card from '@components/Card/Card';
import CardBody from '@components/Card/CardBody';

interface CreditCardType {
  backgroundImage: any;
  title: string;
  icon: any;
  number: number | string;
  validity: any;
  cvv: any;
}

const CreditCard = ({
  backgroundImage,
  title,
  icon,
  number,
  validity,
  cvv,
}: CreditCardType) => {
  return (
    <Card
      w='100%'
      backgroundImage={backgroundImage}
      backgroundRepeat='no-repeat'
      background='cover'
      bgPosition='10%'
      p='16px'
      h={{ sm: '220px', xl: '100%' }}
      gridArea={{ md: '1 / 1 / 2 / 3', xl: '1 / 1 / 2 / 3' }}
    >
      <CardBody h='100%' w='100%'>
        <Flex
          direction='column'
          color='white'
          h='100%'
          p='0px 10px 20px 10px'
          w='100%'
        >
          <Flex justify='space-between' align='center'>
            <Text fontSize='md' fontWeight='bold' color='white'>
              {title}
            </Text>
            {icon}
          </Flex>
          <Spacer />
          <Flex direction='column'>
            <Box>
              <Text
                fontSize='xl'
                letterSpacing='2px'
                fontWeight='bold'
                color='white'
              >
                {number}
              </Text>
            </Box>
            <Flex mt='14px'>
              <Flex direction='column' me='34px'>
                <Text fontSize='xs' color='white'>
                  {validity.name}
                </Text>
                <Text fontSize='xs' fontWeight='bold' color='white'>
                  {validity.date}
                </Text>
              </Flex>
              <Flex direction='column'>
                <Text fontSize='xs' color='white'>
                  {cvv.name}
                </Text>
                <Text fontSize='xs' fontWeight='bold' color='white'>
                  {cvv.code}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default CreditCard;
