import { Td, Tr, useColorModeValue } from '@chakra-ui/react';

interface TablesTableRowProps {
  row: any;
  renderCell: ((data: any) => JSX.Element)[];
}

function TablesTableRow({ row, renderCell }: TablesTableRowProps) {
  const textColor = useColorModeValue('gray.700', 'white');

  return (
    <Tr>
      {renderCell.map((cell, index) => (
        <Td key={index} color={textColor}>
          {cell(row)}
        </Td>
      ))}
    </Tr>
  );
}

export default TablesTableRow;
