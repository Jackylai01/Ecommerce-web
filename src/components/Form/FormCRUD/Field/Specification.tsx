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
    name: `specifications[${specIndex}].details`,
  });

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
              {...register(
                `specifications[${specIndex}].details[${index}].key`,
              )}
              placeholder='如“尺寸”'
            />
          </FormControl>
          <FormControl>
            <FormLabel>值</FormLabel>
            <Input
              {...register(
                `specifications[${specIndex}].details[${index}].value`,
              )}
              placeholder='如“M”'
            />
          </FormControl>
          <FormControl>
            <FormLabel>庫存</FormLabel>
            <HStack>
              <Input
                {...register(
                  `specifications[${specIndex}].details[${index}].inventory`,
                )}
                placeholder='數量'
                type='number'
              />
              <IconButton
                aria-label='删除規格'
                icon={<DeleteIcon />}
                onClick={() => remove(index)}
              />
            </HStack>
          </FormControl>
        </Grid>
      ))}
      <Button
        onClick={() => append({ key: '', value: '', inventory: 0 })}
        colorScheme='blue'
      >
        新增細節規格
      </Button>
    </VStack>
  );
};
