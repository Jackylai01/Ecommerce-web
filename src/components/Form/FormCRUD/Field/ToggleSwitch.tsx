import { FormControl, FormLabel, Switch, Text } from '@chakra-ui/react';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface ToggleSwitchProps {
  name: string;
  label?: string;
  onValue: string;
  offValue: string;
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
        render={({ field: { onChange, ref } }) => (
          <Switch
            id={name}
            ref={ref}
            isChecked={value === onValue}
            onChange={(e) => onChange(e.target.checked ? onValue : offValue)}
          />
        )}
      />

      <Text ml={2}>{value === onValue ? onLabel : offLabel}</Text>
    </FormControl>
  );
};

export default ToggleSwitch;
