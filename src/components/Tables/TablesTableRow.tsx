import { Td, Tr } from '@chakra-ui/react';
import { useAdminColorMode } from 'src/context/colorMode';

interface TablesTableRowProps {
  row: any;
  renderCell: ((data: any) => JSX.Element)[];
}

export function TablesTableRow({ row, renderCell }: TablesTableRowProps) {
  const { colorMode } = useAdminColorMode();
  const textColor = colorMode === 'light' ? 'gray.700' : 'white';

  return (
    <Tr>
      {renderCell.map((cell, index) => (
        <Td
          key={index}
          color={textColor}
          textAlign='left'
          verticalAlign='middle'
          minWidth='120px'
          whiteSpace='nowrap'
        >
          {cell(row)}
        </Td>
      ))}
    </Tr>
  );
}
