import { Button } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

interface ButtonType {
  label: string;
}

export const SubmitButton = ({ label }: ButtonType) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <Button mt={4} colorScheme='blue' isLoading={isSubmitting} type='submit'>
      {label}
    </Button>
  );
};
