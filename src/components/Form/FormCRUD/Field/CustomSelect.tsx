import { FormControl, FormLabel, Select, SelectProps } from '@chakra-ui/react';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface CustomSelectProps extends SelectProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  isRequired?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  label,
  options,
  isRequired = false,
  ...selectProps
}) => {
  const { control } = useFormContext();
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules: { required: isRequired },
  });

  return (
    <FormControl isRequired={isRequired}>
      <FormLabel htmlFor={name}>
        {label} {isRequired && <span style={{ color: 'red' }}></span>}
      </FormLabel>
      <Select id={name} ref={ref} {...inputProps} {...selectProps}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
