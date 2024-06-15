import { FormControl, FormLabel, Switch, Text } from '@chakra-ui/react';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface ToggleSwitchProps {
  name: string;
  label?: string;
  onValue: string | boolean;
  offValue: string | boolean;
  onLabel: string;
  offLabel: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  name,
  label,
  onValue,
  offValue,
  onLabel,
  offLabel,
}) => {
  const { control, watch } = useFormContext();
  const value = watch(name);

  const isChecked = value === onValue;

  return (
    <FormControl display='flex' alignItems='center'>
      {label && (
        <FormLabel htmlFor={name} mb='0'>
          {label}
        </FormLabel>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={offValue}
        render={({ field: { onChange, ref } }) => (
          <Switch
            id={name}
            ref={ref}
            isChecked={isChecked}
            onChange={(e) => onChange(e.target.checked ? onValue : offValue)}
            sx={{
              '.chakra-switch__track': {
                boxShadow: '0 0 0 1px #afafaf',
              },
              '.chakra-switch__thumb': {
                bg: isChecked ? 'white' : 'gray.300',
              },
            }}
          />
        )}
      />
      <Text ml={2}>{isChecked ? onLabel : offLabel}</Text>
    </FormControl>
  );
};

export default ToggleSwitch;
