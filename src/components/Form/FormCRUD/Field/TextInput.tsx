import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

interface TextInputType {
  name: string;
  label: string;
  placeholder: string;
  isRequired?: boolean;
  type?: string;
  as?: React.ElementType; // 添加这一行来支持Textarea组件
  height?: string; // 添加高度属性
}

export const TextInput = ({
  name,
  label,
  placeholder,
  isRequired = false,
  type,
  as,
  height,
}: TextInputType) => {
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
      />
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
};
