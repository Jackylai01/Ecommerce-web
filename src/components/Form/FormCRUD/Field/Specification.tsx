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
import { useAdminColorMode } from 'src/context/colorMode';

interface SpecificationProps {
  specIndex: number;
}

export const Specification = ({ specIndex }: SpecificationProps) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const { colorMode } = useAdminColorMode();
  const bgColor = colorMode === 'light' ? 'gray.700' : 'white';
  const textColor = colorMode === 'light' ? 'gray.700' : 'white';
  const { fields, append, remove } = useFieldArray({
    control,
    name: `specifications[${specIndex}].specs`,
  });

  const handleAddDetail = () => {
    append({ key: '', value: '', inventory: '' });
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
            <FormLabel color={textColor}>特性</FormLabel>
            <Input
              {...register(`specifications[${specIndex}].specs[${index}].key`)}
              placeholder="例如'尺寸'"
              sx={{ '::placeholder': { color: 'gray.500' } }}
              borderColor={bgColor}
              color={textColor}
            />
          </FormControl>
          <FormControl>
            <FormLabel color={textColor}>值</FormLabel>
            <Input
              {...register(
                `specifications[${specIndex}].specs[${index}].value`,
              )}
              placeholder="例如'M'"
              sx={{ '::placeholder': { color: 'gray.500' } }}
              borderColor={bgColor}
              color={textColor}
            />
          </FormControl>
          <FormControl>
            <FormLabel color={textColor}>庫存</FormLabel>
            <HStack>
              <Input
                {...register(
                  `specifications[${specIndex}].specs[${index}].inventory`,
                )}
                placeholder='數量'
                type='number'
                sx={{ '::placeholder': { color: 'gray.500' } }}
                borderColor={bgColor}
                color={textColor}
              />
              <IconButton
                aria-label='删除規格'
                icon={<DeleteIcon color={textColor} />}
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
