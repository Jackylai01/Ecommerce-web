import {
  Flex,
  Icon,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import Card from '@components/Card/Card';
import CardHeader from '@components/Card/CardHeader';
import DashboardTableRow from '@components/Tables/DashboardTableRow';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';

interface ProductsType {
  title: string;
  amount: number | string;
  captions: any[];
  data: any[];
}

const Projects = ({ title, amount, captions, data }: ProductsType) => {
  const textColor = useColorModeValue('gray.700', 'white');

  return (
    <Card p='16px' overflowX={{ sm: 'scroll', xl: 'hidden' }}>
      <CardHeader p='12px 0px 28px 0px'>
        <Flex direction='column'>
          <Text fontSize='lg' color={textColor} fontWeight='bold' pb='.5rem'>
            {title}
          </Text>
          <Flex align='center'>
            <Icon
              as={IoCheckmarkDoneCircleSharp}
              color='teal.300'
              w={4}
              h={4}
              pe='3px'
            />
            <Text fontSize='sm' color='gray.400' fontWeight='normal'>
              <Text fontWeight='bold' as='span'>
                {amount} done
              </Text>{' '}
              this month.
            </Text>
          </Flex>
        </Flex>
      </CardHeader>
      <Table variant='simple' color={textColor}>
        <Thead>
          <Tr my='.8rem' ps='0px'>
            {captions.map((caption, idx) => {
              return (
                <Th
                  color='gray.400'
                  key={idx}
                  ps={idx === 0 ? '0px' : undefined}
                >
                  {caption}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => {
            return (
              <DashboardTableRow
                key={row.name}
                name={row.name}
                logo={row.logo}
                members={row.members}
                budget={row.budget}
                progression={row.progression}
              />
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
};

export default Projects;
