import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { defaultDate } from '@helpers/date';
import { dotKeysValue } from '@helpers/object';
import { InnerProps } from '..';

const ChakraInput = ({
  register,
  setValue,
  formState: { errors },
  fieldConfig: {
    name,
    type,
    label,
    placeholder,
    required,
    disabled,
    defaultValue,
    pattern,
    validate,
    min,
    col,
  },
}: InnerProps) => {
  let currentDefaultValue = defaultValue;

  switch (type) {
    case 'date':
      if (!defaultValue) break;
      setValue(name, defaultDate(defaultValue as string));
      break;
    default:
      // Handle other types or do nothing
      break;
  }

  return (
    <Box
      w='100%'
      display='flex'
      flexDirection='column'
      gridColumn={`span ${col || 1}`}
    >
      <FormControl
        isInvalid={!!dotKeysValue(errors, name)}
        isRequired={required}
      >
        <FormLabel htmlFor={name} fontWeight='bold' color='white'>
          {required && '* '}
          {label}
        </FormLabel>
        <Input
          {...register(name, {
            required: required && `${label}為必填欄位`,
            valueAsNumber: type === 'number',
            pattern: pattern,
            validate: validate,
            min: min,
          })}
          id={name}
          type={type}
          placeholder={placeholder}
          isDisabled={disabled}
          defaultValue={currentDefaultValue}
          color='white'
        />
        <FormErrorMessage>
          {dotKeysValue(errors, name)?.message}
        </FormErrorMessage>
      </FormControl>
    </Box>
  );
};

export default ChakraInput;
