import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Card from '@components/Card/Card';
import CardBody from '@components/Card/CardBody';
import CardHeader from '@components/Card/CardHeader';
import BillingRow from '@components/Tables/BillingRow';

interface BilingInFormationType {
  title: string;
  data: {
    name: string;
    company: string;
    email: string;
    number: string;
  }[];
}

const BillingInformation = ({ title, data }: BilingInFormationType) => {
  const textColor = useColorModeValue('gray.700', 'white');
  return (
    <Card my={{ lg: '24px' }} me={{ lg: '24px' }}>
      <Flex direction='column'>
        <CardHeader py='12px'>
          <Text color={textColor} fontSize='lg' fontWeight='bold'>
            {title}
          </Text>
        </CardHeader>
        <CardBody>
          <Flex direction='column' w='100%'>
            {data.map((row, index) => {
              return (
                <BillingRow
                  key={index}
                  name={row.name}
                  company={row.company}
                  email={row.email}
                  number={row.number}
                />
              );
            })}
          </Flex>
        </CardBody>
      </Flex>
    </Card>
  );
};

export default BillingInformation;
