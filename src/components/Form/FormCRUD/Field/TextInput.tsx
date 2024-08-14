import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useAdminColorMode } from 'src/context/colorMode';

interface TextInputType {
  name: string;
  label: string;
  placeholder: string;
  isRequired?: boolean;
  type?: string;
  as?: React.ElementType;
  height?: string;
  min?: number;
  max?: number;
  isReadOnly?: boolean;
  value?: any;
  style?: React.CSSProperties;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputType>(
  (
    {
      name,
      label,
      placeholder,
      isRequired = false,
      type = 'text',
      as,
      height,
      min,
      max,
      isReadOnly = false,
      style,
    },
    ref,
  ) => {
    const { colorMode } = useAdminColorMode();
    const textColor = colorMode === 'light' ? 'gray.700' : 'white';
    const {
      register,
      setValue,
      watch,
      formState: { errors },
    } = useFormContext();

    const isInvalid = Boolean(errors[name]);

    useEffect(() => {
      register(name, { required: isRequired });
    }, [register, name, isRequired]);

    // 使用 watch 来获取当前输入的值
    const currentValue = watch(name);

    return (
      <FormControl isInvalid={isInvalid} isRequired={isRequired} style={style}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <Input
          as={as || 'input'}
          id={name}
          placeholder={placeholder}
          type={type}
          h={height}
          min={min}
          max={max}
          borderColor={textColor}
          color={textColor}
          isReadOnly={isReadOnly}
          _hover={{ borderColor: 'gray.400' }}
          sx={{
            ':-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 30px white inset',
              WebkitTextFillColor: 'black',
            },
            ':-webkit-autofill:hover': {
              WebkitBoxShadow: '0 0 0 30px white inset',
            },
            ':-webkit-autofill:focus': {
              WebkitBoxShadow: '0 0 0 30px white inset',
            },
            ':-webkit-autofill:active': {
              WebkitBoxShadow: '0 0 0 30px white inset',
            },
          }}
          ref={ref}
          value={currentValue} // 使用 watch 获取的值
          onChange={(e) => setValue(name, e.target.value)}
        />
        <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
      </FormControl>
    );
  },
);

TextInput.displayName = 'TextInput';
export default TextInput;
