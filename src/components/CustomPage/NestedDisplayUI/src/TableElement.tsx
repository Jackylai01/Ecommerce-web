import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Button,
  IconButton,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ElementProps } from '..';

const TableElement = ({ element, isEdit, onBlur }: ElementProps) => {
  const dispatch = useAppDispatch();
  const { setValue, getValues } = useFormContext();
  const [data, setData] = useState(element.data || []);

  useEffect(() => {
    setData(element.data || []);
  }, [element]);

  const handleChange = (value: string, rowIndex: number, colIndex: number) => {
    const newData = data.map((row, rIdx) =>
      row.map((cell, cIdx) =>
        rIdx === rowIndex && cIdx === colIndex ? value : cell,
      ),
    );
    setData(newData);
    updateFormData(newData);
  };

  const handleAddRow = () => {
    const newData = [...data, new Array(data[0].length).fill('')];
    setData(newData);
    updateFormData(newData);
  };

  const handleDeleteRow = (index: number) => {
    const newData = data.filter((_, idx) => idx !== index);
    setData(newData);
    updateFormData(newData);
  };

  const updateFormData = (newData: string[][]) => {
    const updatedBlocks = getValues('detailDescription').map((block: any) => {
      if (block.elements.some((el: any) => el.id === element.id)) {
        return {
          ...block,
          elements: block.elements.map((el: any) =>
            el.id === element.id ? { ...el, data: newData } : el,
          ),
        };
      }
      return block;
    });

    setValue('detailDescription', updatedBlocks, { shouldValidate: true });
    if (onBlur) onBlur();
  };

  return (
    <VStack spacing={4} align='flex-start' w='100%'>
      <Table variant='simple'>
        <Thead>
          <Tr>
            {data[0].map((_, colIndex) => (
              <Th key={colIndex}>標題名稱</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <Td key={colIndex}>
                  {isEdit ? (
                    <Input
                      value={cell}
                      onChange={(e) =>
                        handleChange(e.target.value, rowIndex, colIndex)
                      }
                    />
                  ) : (
                    cell
                  )}
                </Td>
              ))}
              {isEdit && (
                <Td>
                  <IconButton
                    aria-label='Delete row'
                    icon={<DeleteIcon />}
                    onClick={() => handleDeleteRow(rowIndex)}
                  />
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
      {isEdit && (
        <Button leftIcon={<AddIcon />} onClick={handleAddRow}>
          新增一行
        </Button>
      )}
    </VStack>
  );
};

export default TableElement;
