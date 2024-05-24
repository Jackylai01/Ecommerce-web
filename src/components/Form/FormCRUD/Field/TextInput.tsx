import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useAdminColorMode } from 'src/context/colorMode';

interface TextInputType {
  name: string;
  label: string;
  placeholder: string;
  isRequired?: boolean;
  type?: string;
  as?: React.ElementType; // 添加这一行来支持Textarea组件
  height?: string; // 添加高度属性
  min?: number;
  max?: number;
}

export const TextInput = ({
  name,
  label,
  placeholder,
  isRequired = false,
  type,
  as,
  height,
  min,
  max,
}: TextInputType) => {
  const { colorMode } = useAdminColorMode();
  const textColor = colorMode === 'light' ? 'gray.700' : 'white';
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const isInvalid = Boolean(errors[name]);

  return (
    <FormControl isInvalid={isInvalid} isRequired={isRequired}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        as={as || 'input'}
        id={name}
        placeholder={placeholder}
        {...register(name)}
        type={type}
        h={height}
        min={min}
        max={max}
        borderColor={textColor}
        color={textColor}
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
      />
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
};
