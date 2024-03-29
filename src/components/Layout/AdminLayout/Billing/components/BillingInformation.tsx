import { Flex, Text } from '@chakra-ui/react';
import Card from '@components/Card/Card';
import CardBody from '@components/Card/CardBody';
import CardHeader from '@components/Card/CardHeader';
import BillingRow from '@components/Tables/BillingRow';
import { useAdminColorMode } from 'src/context/colorMode';

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
  const { colorMode } = useAdminColorMode();
  const textColor = colorMode === 'light' ? 'gray.700' : 'white';

  return (
    <Card my={{ lg: '24px' }} me={{ lg: '24px' }} pl='1rem'>
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
