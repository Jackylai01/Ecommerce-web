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
}

export const TextInput = ({
  name,
  label,
  placeholder,
  isRequired = false,
}: TextInputType) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const isInvalid = Boolean(errors[name]);

  return (
    <FormControl isInvalid={isInvalid} isRequired={isRequired}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input id={name} placeholder={placeholder} {...register(name)} />
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
};
