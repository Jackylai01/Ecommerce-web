import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Stack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface TagsMultiSelectProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  isRequired?: boolean;
}

export const TagsMultiSelect = ({
  name,
  label,
  options,
  isRequired = false,
  ...selectProps
}: TagsMultiSelectProps) => {
  const { setValue, watch, control } = useFormContext();
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules: { required: isRequired },
  });

  const selectedTags = watch(name);

  useEffect(() => {
    setValue(name, selectedTags);
  }, [selectedTags, setValue, name]);

  return (
    <FormControl isRequired={isRequired}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <CheckboxGroup
        colorScheme='blue'
        defaultValue={selectedTags}
        {...selectProps}
        {...inputProps}
      >
        <Stack pl={6} mt={1} spacing={1} display='flex' flexDirection='row'>
          {options.map((option) => (
            <Checkbox
              key={option.value}
              value={option.value}
              borderColor='black'
              defaultValue={selectedTags}
            >
              {option.label}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </FormControl>
  );
};
