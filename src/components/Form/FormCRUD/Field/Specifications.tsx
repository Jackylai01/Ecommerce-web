import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton, Input, VStack } from '@chakra-ui/react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useAdminColorMode } from 'src/context/colorMode';
import { Specification } from './Specification';

const DynamicSpecifications = () => {
  const { colorMode } = useAdminColorMode();
  const bgColor = colorMode === 'light' ? 'gray.700' : 'white';
  const textColor = colorMode === 'light' ? 'gray.700' : 'white';
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'specifications',
  });

  const handleAddSpecification = () => {
    append({
      type: '', // 規格類型，例如颜色、尺寸等
      specs: [{ key: '', value: '' }], //詳細規格
      inventory: 0, // 庫存
    });
  };
  return (
    <VStack spacing={4}>
      {fields.map((field, index) => (
        <Box
          key={field.id}
          p={4}
          borderWidth='1px'
          borderRadius='lg'
          shadow='md'
          color='black'
        >
          <Flex alignItems='center' justifyContent='space-between'>
            <Input
              {...register(`specifications[${index}].type`)}
              placeholder='颜色（如“黑色”）'
              w='full'
              mr={2}
              borderColor={bgColor}
              sx={{ '::placeholder': { color: 'white' } }}
              color={textColor}
            />
            <IconButton
              aria-label='删除規格組合'
              icon={<DeleteIcon color={textColor} />}
              onClick={() => remove(index)}
            />
          </Flex>
          <Specification specIndex={index} />
        </Box>
      ))}
      <Button
        leftIcon={<AddIcon />}
        colorScheme='teal'
        onClick={handleAddSpecification}
      >
        新增規格
      </Button>
    </VStack>
  );
};

export default DynamicSpecifications;
