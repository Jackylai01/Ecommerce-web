import { FormControl, FormLabel, Select, SelectProps } from '@chakra-ui/react';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useAdminColorMode } from 'src/context/colorMode';

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
  const { colorMode } = useAdminColorMode();
  const textColor = colorMode === 'light' ? 'gray.700' : 'white';
  const bgColor = colorMode === 'light' ? 'white' : 'gray.700';
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
      <Select
        id={name}
        ref={ref}
        placeholder='請選擇'
        {...inputProps}
        {...selectProps}
        bg={bgColor}
        color={textColor}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            style={{ backgroundColor: 'white', color: 'black' }}
          >
            {option.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
