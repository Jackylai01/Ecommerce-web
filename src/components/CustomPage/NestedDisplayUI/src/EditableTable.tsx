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
import { updateBlockElementData } from '@reducers/admin/custom-page';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useAdminColorMode } from 'src/context/colorMode';
import { ElementProps } from '..';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const EditableTable = ({ element, isEdit }: ElementProps) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<string[][]>([[]]);
  const { colorMode } = useAdminColorMode();
  const textColor = colorMode === 'light' ? 'white' : 'gray.700';
  const bgColor = colorMode === 'light' ? 'gray.700' : 'white';

  useEffect(() => {
    if (element.data && element.data.length > 0) {
      setData(element.data);
    } else {
      setData([['']]);
    }
  }, [element.data]);

  const handleAddColumn = useCallback(() => {
    const newData = data.map((row) => [...row, '']);
    setData(newData);
    dispatch(updateBlockElementData({ id: element._id, newData }));
  }, [data, dispatch, element._id]);

  const handleAddRow = useCallback(() => {
    const newRow = new Array(data[0].length).fill('');
    const newData = [...data, newRow];
    setData(newData);
    dispatch(updateBlockElementData({ id: element._id, newData }));
  }, [data, dispatch, element._id]);

  const handleDeleteColumn = useCallback(
    (colIndex: number) => {
      if (data[0].length === 1) return; // 確保至少有一個欄位
      const newData = data.map((row) =>
        row.filter((_, index) => index !== colIndex),
      );
      setData(newData);
      dispatch(updateBlockElementData({ id: element._id, newData }));
    },
    [data, dispatch, element._id],
  );

  const handleDeleteRow = useCallback(
    (rowIndex: number) => {
      if (data.length === 1) return; // 確保至少有一行
      const newData = data.filter((_, index) => index !== rowIndex);
      setData(newData);
      dispatch(updateBlockElementData({ id: element._id, newData }));
    },
    [data, dispatch, element._id],
  );

  const handleCellChange = useCallback(
    (rowIndex: number, colIndex: number, value: string) => {
      if (data[rowIndex][colIndex] === value) return; // 如果值沒有改變則不進行更新
      const newData = data.map((row, rIndex) =>
        rIndex === rowIndex
          ? row.map((cell, cIndex) => (cIndex === colIndex ? value : cell))
          : row,
      );
      setData(newData);
      dispatch(updateBlockElementData({ id: element._id, newData }));
    },
    [data, dispatch, element._id],
  );

  return (
    <Box>
      {data.length > 0 && data[0].length > 0 && (
        <Table variant='simple'>
          <Thead>
            <Tr>
              {isEdit && <Th></Th>}
              {data[0].map((_, colIndex) => (
                <Th key={colIndex}>
                  {isEdit && (
                    <IconButton
                      aria-label='Delete column'
                      icon={<FaTrash />}
                      onClick={() => handleDeleteColumn(colIndex)}
                      size='xs'
                      mr={2}
                    />
                  )}
                  欄位 {colIndex + 1}
                </Th>
              ))}
              {isEdit && (
                <Th>
                  <Button size='xs' onClick={handleAddColumn} bg={bgColor}>
                    新增欄位
                  </Button>
                </Th>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row, rowIndex) => (
              <Tr key={rowIndex}>
                {isEdit && (
                  <Td>
                    <IconButton
                      aria-label='Delete row'
                      icon={<FaTrash />}
                      onClick={() => handleDeleteRow(rowIndex)}
                      size='xs'
                      bg={bgColor}
                    />
                  </Td>
                )}
                {row.map((cell, colIndex) => (
                  <Td key={colIndex}>
                    {isEdit ? (
                      <ReactQuill
                        theme='bubble'
                        value={cell}
                        onChange={(value) =>
                          handleCellChange(rowIndex, colIndex, value)
                        }
                        modules={{ toolbar: false }}
                      />
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: cell }} />
                    )}
                  </Td>
                ))}
              </Tr>
            ))}
            {isEdit && (
              <Tr>
                <Td colSpan={data[0].length + 1}>
                  <Button size='xs' onClick={handleAddRow} bg={bgColor}>
                    新增列
                  </Button>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default EditableTable;
