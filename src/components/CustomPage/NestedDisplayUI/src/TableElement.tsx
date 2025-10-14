import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Button,
  IconButton,
  Table,
  Tbody,
  Td,
  Tr,
  VStack,
} from '@chakra-ui/react';
import TiptapEditor from '@components/TiptapEditor';
import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ElementProps } from '..';

const TableElement = ({ element, isEdit, onBlur }: ElementProps) => {
  const { setValue, getValues } = useFormContext();
  const [data, setData] = useState(element.data || []);

  useEffect(() => {
    setData(element.data || []);
  }, [element]);

  const handleChange = useCallback(
    (value: string, rowIndex: number, colIndex: number) => {
      setData((prevData) =>
        prevData.map((row, rIdx) =>
          row.map((cell, cIdx) =>
            rIdx === rowIndex && cIdx === colIndex ? value : cell,
          ),
        ),
      );
    },
    [],
  );

  const handleBlur = useCallback(() => {
    const updatedBlocks = getValues('detailDescription').map((block: any) => {
      if (block.elements.some((el: any) => el.id === element.id)) {
        return {
          ...block,
          elements: block.elements.map((el: any) =>
            el.id === element.id ? { ...el, data } : el,
          ),
        };
      }
      return block;
    });

    setValue('detailDescription', updatedBlocks, { shouldValidate: true });
    if (onBlur) onBlur();
  }, [element.id, getValues, onBlur, setValue, data]);

  const handleAddRow = () => {
    setData((prevData) => [
      ...prevData,
      new Array(prevData[0].length).fill(''),
    ]);
  };

  const handleDeleteRow = (index: number) => {
    setData((prevData) => prevData.filter((_, idx) => idx !== index));
  };

  return (
    <VStack spacing={4} align='flex-start' w='100%'>
      <Table variant='simple'>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <Td key={colIndex}>
                  {isEdit ? (
                    <TiptapEditor
                      content={cell}
                      onChange={(value) =>
                        handleChange(value, rowIndex, colIndex)
                      }
                      onBlur={handleBlur}
                      placeholder='請輸入內容'
                      minimal={true}
                    />
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: cell }} />
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
