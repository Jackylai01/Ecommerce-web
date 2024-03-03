import {
  Box,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import FormSearch from '@components/Form/FormSearch';
import LoadingLayout from '@components/Layout/LoadingLayout';
import Pagination from '@components/Pagination';
import { TableDataConfig } from '@fixtures/crud-configs';
import { tableLayoutFormat } from '@helpers/table-layout-format';
import { ApiPaginationResult } from '@services/shared/api';

type Props = {
  title: string;
  isLoading: boolean;
  listData: ApiPaginationResult<unknown> | null;
  tableConfigs?: TableDataConfig[];
  actions: React.ReactNode;
  tableActions?: (item: { _id: string }) => React.ReactNode;
};

const TableLayoutUI = ({
  title,
  isLoading,
  listData,
  tableConfigs,
  actions,
  tableActions,
}: Props) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const fontSize = useBreakpointValue({ base: '18', md: 'md', lg: 'lg' });

  return (
    <LoadingLayout isLoading={isLoading}>
      <VStack spacing={4} w='full'>
        <Flex justifyContent='space-between' alignItems='center' w='full'>
          <Heading as='h2' size='lg' color='whiteAlpha.800'>
            {title}
          </Heading>
          <Box>{actions}</Box>
        </Flex>
        <Box w='full'>
          <FormSearch />
          {listData?.data &&
            (isMobile ? (
              listData.data.map((item: any) => (
                <Box
                  borderWidth='10px'
                  borderRadius='lg'
                  overflow='hidden'
                  p={4}
                  mb={4}
                  key={item._id}
                  _hover={{ border: '3px solid #5eb67d' }}
                >
                  {tableConfigs?.map((config) => (
                    <Flex
                      justify='space-between'
                      key={config.key}
                      color='white'
                    >
                      <Text fontWeight='bold' color='white' fontSize={fontSize}>
                        {config.title}:
                      </Text>
                      <Text color='white' fontSize={fontSize}>
                        {tableLayoutFormat(item, config)}
                      </Text>
                    </Flex>
                  ))}
                  <Flex justify='flex-end' mt={2}>
                    {tableActions && tableActions(item)}
                  </Flex>
                </Box>
              ))
            ) : (
              <Box overflowX='auto'>
                <Table
                  variant='simple'
                  size='md'
                  borderWidth='1px'
                  borderColor='gray.200'
                >
                  <Thead>
                    <Tr>
                      {tableConfigs?.map(({ title }) => (
                        <Th key={title} color='white' borderWidth='1px'>
                          {title}
                        </Th>
                      ))}
                      <Th color='white' borderWidth='1px'></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {listData.data.map((item: any) => (
                      <Tr key={item._id}>
                        {tableConfigs?.map((config) => (
                          <Td key={config.key} color='white' borderWidth='1px'>
                            {tableLayoutFormat(item, config)}
                          </Td>
                        ))}
                        <Td isNumeric borderWidth='1px'>
                          {tableActions && tableActions(item)}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            ))}
          {listData?.metadata && <Pagination metadata={listData.metadata} />}
        </Box>
      </VStack>
    </LoadingLayout>
  );
};

export default TableLayoutUI;
