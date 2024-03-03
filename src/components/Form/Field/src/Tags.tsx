import { AddIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { InnerProps } from '..';

const Tags = ({
  control,
  formState: { errors },
  fieldConfig: { name, label, required, col },
}: InnerProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  const { setValue, watch } = useFormContext();
  const tags = watch(name) || [];

  const createTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setValue(name, [...tags, tag]);
      setInputValue('');
    }
  };

  const removeTag = (tag: string) => {
    setValue(
      name,
      tags.filter((t: string) => t !== tag),
    );
  };

  const handleAddClick = () => {
    if (inputValue.trim()) {
      createTag(inputValue);
    }
  };

  return (
    <FormControl isInvalid={Boolean(errors[name])} className={`col-${col}`}>
      <FormLabel htmlFor={name} color='white'>
        {required && <span style={{ color: 'red' }}>*</span>}
        {label}
      </FormLabel>
      <HStack spacing={2}>
        {tags.map((tag: string, index: number) => (
          <Tag size='md' key={index} borderRadius='full'>
            <TagLabel>{tag}</TagLabel>
            <TagCloseButton onClick={() => removeTag(tag)} />
          </Tag>
        ))}
      </HStack>
      <HStack spacing={2} mt={2}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              <Input
                {...field}
                placeholder='請輸入標籤名稱並新增'
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && inputValue.trim()
                    ? createTag(inputValue)
                    : null
                }
                color='white'
              />
              <IconButton
                aria-label='Add tag'
                icon={<AddIcon />}
                onClick={handleAddClick}
              />
            </>
          )}
        />
      </HStack>
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default Tags;
