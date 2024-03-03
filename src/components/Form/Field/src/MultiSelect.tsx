import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Text,
  VStack,
  useOutsideClick,
} from '@chakra-ui/react';
import React from 'react';
import { InnerProps } from '..';

const MultiSelect = ({
  register,
  watch,
  setValue,
  formState: { errors },
  fieldConfig: {
    name,
    label,
    required,
    defaultValue,
    options,
    displayOptions,
    col,
    isMulti = true, // 表示多選
  },
}: InnerProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const currentValue = watch(name) || defaultValue || [];

  useOutsideClick({
    ref: ref,
    handler: () => setShowDropdown(false),
  });

  const selectOption = (value: any) => {
    const newValue = currentValue.includes(value)
      ? currentValue.filter((option: any) => option !== value)
      : [...currentValue, value];
    setValue(name, newValue);
  };

  return (
    <FormControl isInvalid={!!errors[name]}>
      <FormLabel htmlFor={name} color='white'>
        {required && '* '}
        {label}
      </FormLabel>
      <Box ref={ref} position='relative'>
        <HStack spacing={4} onClick={() => setShowDropdown(!showDropdown)}>
          <Text color='white'>{currentValue.join('、')}</Text>
          <IconButton
            icon={<ChevronDownIcon />}
            variant='outline'
            aria-label='Toggle Dropdown'
            color='white'
          />
        </HStack>
        {showDropdown && (
          <VStack
            position='absolute'
            zIndex='dropdown'
            bg='white'
            p={2}
            shadow='md'
            borderRadius='md'
            maxH='10rem'
            overflowY='auto'
          >
            {options?.map((option, index) => (
              <Checkbox
                key={index}
                isChecked={currentValue.includes(option)}
                onChange={() => selectOption(option)}
                isDisabled={
                  !isMulti &&
                  currentValue.length > 0 &&
                  !currentValue.includes(option)
                }
              >
                {displayOptions && displayOptions[index]
                  ? displayOptions[index]
                  : option}
              </Checkbox>
            ))}
          </VStack>
        )}
      </Box>
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default MultiSelect;
