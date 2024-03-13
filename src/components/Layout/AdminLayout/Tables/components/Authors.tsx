import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import Card from '@components/Card/Card';
import CardBody from '@components/Card/CardBody';
import CardHeader from '@components/Card/CardHeader';
import TablesTableRow from '@components/Tables/TablesTableRow';

interface AuthorsProps {
  title: string;
  captions: string[];
  data: {
    logo: any;
    name: string;
    email: string;
    subdomain: string;
    domain: string;
    status: any;
  }[];
}

interface AuthorRowData {
  logo: string;
  name: string;
  email: string;
  subdomain: string;
  domain: string;
  status: string;
}

const Authors = ({ title, captions, data }: AuthorsProps) => {
  const textColor = useColorModeValue('gray.700', 'white');

  const renderCell = [
    (row: AuthorRowData) => (
      <Flex align='center'>
        <Avatar src={row.logo} w='50px' borderRadius='12px' />
        <Text pl='15px'>{row.name}</Text>
      </Flex>
    ),
    (row: AuthorRowData) => <Text>{row.email}</Text>,
    (row: AuthorRowData) => <Text>{row.subdomain}</Text>,
    (row: AuthorRowData) => <Text>{row.domain}</Text>,
    (row: AuthorRowData) => (
      <Badge colorScheme={row.status === 'Online' ? 'green' : 'red'}>
        {row.status}
      </Badge>
    ),

    (row: AuthorRowData) => (
      <Button colorScheme='blue' size='sm' onClick={() => editRow(row)}>
        Edit
      </Button>
    ),
  ];

  const editRow = (row: AuthorRowData) => {
    console.log('Editing row:', row);
  };

  return (
    <Card>
      <CardHeader p='6px 0px 22px 0px'>
        <Text fontSize='xl' color={textColor} fontWeight='bold'>
          {title}
        </Text>
      </CardHeader>
      <CardBody>
        <Box overflowX='auto' w='full'>
          <Table variant='simple' color={textColor} size='sm'>
            <Thead>
              <Tr>
                {captions.map((caption, idx) => (
                  <Th
                    key={idx}
                    minWidth={caption === 'Email' ? '100px' : '200px'}
                  >
                    {caption}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {data.map((row, index) => (
                <TablesTableRow key={index} row={row} renderCell={renderCell} />
              ))}
            </Tbody>
          </Table>
        </Box>
      </CardBody>
    </Card>
  );
};

export default Authors;
