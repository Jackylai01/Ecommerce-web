import { DeleteIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  IconButton,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useFieldArray, useFormContext } from 'react-hook-form';

interface SpecificationProps {
  specIndex: number;
}

export const Specification = ({ specIndex }: SpecificationProps) => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `specifications[${specIndex}].specs`,
  });

  const handleAddDetail = () => {
    append({ key: '', value: '' });
  };

  return (
    <VStack spacing={2}>
      {fields.map((field, index) => (
        <Grid
          templateColumns='repeat(3, 1fr)'
          gap={4}
          key={field.id}
          alignItems='end'
        >
          <FormControl>
            <FormLabel>特性</FormLabel>
            <Input
              {...register(`specifications[${specIndex}].specs[${index}].key`)}
              placeholder="例如'尺寸'"
              color='black'
              sx={{ '::placeholder': { color: 'gray.500' } }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>值</FormLabel>
            <Input
              {...register(
                `specifications[${specIndex}].specs[${index}].value`,
              )}
              placeholder="例如'M'"
              color='black'
              sx={{ '::placeholder': { color: 'gray.500' } }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>庫存</FormLabel>
            <HStack>
              <Input
                {...register(
                  `specifications[${specIndex}].specs[${index}].inventory`,
                )}
                placeholder='數量'
                type='number'
                sx={{ '::placeholder': { color: 'gray.500' } }}
              />
              <IconButton
                aria-label='删除規格'
                icon={<DeleteIcon color='black' />}
                onClick={() => remove(index)}
              />
            </HStack>
          </FormControl>
        </Grid>
      ))}
      <Button onClick={handleAddDetail} colorScheme='blue' mt='1rem'>
        新增詳細規格
      </Button>
    </VStack>
  );
};
