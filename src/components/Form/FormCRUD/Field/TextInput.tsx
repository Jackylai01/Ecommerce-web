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
  isRequired: boolean;
  type?: string;
}

export const TextInput = ({
  name,
  label,
  placeholder,
  isRequired = false,
  type,
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
        id={name}
        placeholder={placeholder}
        {...register(name)}
        type={type}
      />
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
};
