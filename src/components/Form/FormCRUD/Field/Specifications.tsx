import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Specification } from './Specification';

const DynamicSpecifications = () => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'specifications',
  });
  const bgColor = useColorModeValue('gray.50', 'gray.700');

  return (
    <VStack spacing={4}>
      {fields.map((field, index) => (
        <Box
          key={field.id}
          p={4}
          bg={bgColor}
          borderWidth='1px'
          borderRadius='lg'
          shadow='md'
        >
          <Flex alignItems='center' justifyContent='space-between'>
            <Input
              {...register(`specifications[${index}].color`)}
              placeholder='颜色（如“黑色”）'
              w='full'
              mr={2}
            />
            <IconButton
              aria-label='删除規格組合'
              icon={<DeleteIcon />}
              onClick={() => remove(index)}
            />
          </Flex>
          <Specification specIndex={index} />
        </Box>
      ))}
      <Button
        leftIcon={<AddIcon />}
        colorScheme='teal'
        onClick={() =>
          append({
            color: '',
            details: [{ key: '', value: '', inventory: 0 }],
          })
        }
      >
        新增規格
      </Button>
    </VStack>
  );
};

export default DynamicSpecifications;
