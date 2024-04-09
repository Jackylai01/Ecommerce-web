import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import { updateBlockElementData } from '@reducers/admin/custom-page';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import { ElementProps } from '..';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const TableElement = ({ element, isEdit }: ElementProps) => {
  const [tableData, setTableData] = useState(element.data || [[]]);
  const dispatch = useAppDispatch();

  const updateTableData = useCallback(
    (newData) => {
      setTableData(newData);
      dispatch(updateBlockElementData({ id: element.id, newData }));
    },
    [dispatch, element.id],
  );
  const handleCellChange = useCallback(
    (rowIndex, columnIndex, content) => {
      if (tableData[rowIndex][columnIndex] !== content) {
        const newData = tableData.map((row, idx) => {
          if (idx === rowIndex) {
            const newRow = [...row];
            newRow[columnIndex] = content;
            return newRow;
          }
          return row;
        });
        setTableData(newData);
        dispatch(updateBlockElementData({ id: element.id, newData }));
      }
    },
    [dispatch, element.id, tableData],
  );
  const addRow = () => {
    const newRow = new Array(tableData[0]?.length || 1).fill('');
    updateTableData([...tableData, newRow]);
  };

  const addColumn = () => {
    const newData =
      tableData.length === 0 ? [['']] : tableData.map((row) => [...row, '']);
    updateTableData(newData);
  };

  const deleteRow = useCallback(
    (rowIndex) => {
      const newData = tableData.filter((_, index) => index !== rowIndex);
      updateTableData(newData);
    },
    [tableData, updateTableData],
  );
  const deleteColumn = useCallback(
    (columnIndex) => {
      if (tableData.length > 0 && tableData[0].length > 1) {
        const newData = tableData.map((row) =>
          row.filter((_, idx) => idx !== columnIndex),
        );
        updateTableData(newData);
      }
    },
    [tableData, updateTableData],
  );
  return (
    <Box>
      {isEdit && (
        <Box mb='4'>
          <Button onClick={addRow} mr='2'>
            Add Row
          </Button>
          <Button onClick={addColumn}>Add Column</Button>
        </Box>
      )}
      <Table variant='simple'>
        <Thead>
          <Tr>
            {tableData[0]?.map((_, columnIndex) => (
              <Th key={`th-${columnIndex}`}>
                Column {columnIndex + 1}
                {isEdit && (
                  <IconButton
                    aria-label='Delete column'
                    icon={<DeleteIcon />}
                    size='xs'
                    onClick={() => deleteColumn(columnIndex)}
                    ml='2'
                    colorScheme='red'
                  />
                )}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {row.map((cell, columnIndex) => (
                <Td key={`row-${rowIndex}-col-${columnIndex}`} border='1px'>
                  {isEdit ? (
                    <ReactQuill
                      theme='bubble'
                      value={cell || ''}
                      onChange={(content) =>
                        handleCellChange(rowIndex, columnIndex, content)
                      }
                    />
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: cell || '' }} />
                  )}
                </Td>
              ))}
              {isEdit && (
                <>
                  <IconButton
                    aria-label='Delete row'
                    icon={<DeleteIcon />}
                    size='xs'
                    onClick={() => deleteRow(rowIndex)}
                    colorScheme='red'
                  />
                </>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableElement;
