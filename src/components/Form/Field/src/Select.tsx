import {
  Box,
  Select as ChakraSelect,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';
import { InnerProps } from '..';

const Select = ({
  register,
  formState: { errors },
  fieldConfig: {
    name,
    label,
    required,
    disabled,
    defaultValue,
    pattern,
    validate,
    col,
    options,
    displayOptions,
    placeholder,
  },
}: InnerProps) => {
  return (
    <FormControl isInvalid={!!errors[name]}>
      <FormLabel htmlFor={name} color='white'>
        {required && <span style={{ color: 'red' }}>*</span>}
        {label}
      </FormLabel>
      <ChakraSelect
        id={name}
        {...register(name, {
          required: required && `${label}為必填欄位`,
          pattern,
          validate,
        })}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        color='white'
      >
        {options?.map((option, index) => (
          <Box as='option' key={option} value={option} color='black'>
            {displayOptions && displayOptions[index]
              ? displayOptions[index]
              : option}
          </Box>
        ))}
      </ChakraSelect>
      {errors[name] && (
        <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default Select;
