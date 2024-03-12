import {
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import TablesTableRow from '@components/Tables/TablesTableRow';

// 定义Props类型，使用泛型T来代表data数组中对象的类型
interface TableComponentProps<T> {
  captions: string[];
  data: T[];
}

// 将TableComponent定义为泛型组件
const TableComponent = <T extends { [key: string]: any }>({
  captions,
  data,
}: TableComponentProps<T>) => {
  const textColor = useColorModeValue('gray.700', 'white');

  return (
    <Table variant='simple' color={textColor} mt='2rem'>
      <Thead>
        <Tr my='.8rem' pl='0px' color='gray.400'>
          {captions.map((caption, idx) => (
            <Th color='gray.400' key={idx}>
              {caption}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row, index) => (
          <TablesTableRow
            key={index}
            name={row.name}
            logo={row.logo}
            email={row.email}
            subdomain={row.subdomain}
            domain={row.domain}
            status={row.status}
            date={row.date}
          />
        ))}
      </Tbody>
    </Table>
  );
};

export default TableComponent;
