import { FormControl, FormLabel, Switch, Text } from '@chakra-ui/react';
import React from 'react';

interface ToggleSwitchProps {
  name: string;
  label?: string;
  onValue: string | boolean;
  offValue: string | boolean;
  onLabel: string;
  offLabel: string;
  value?: string | boolean;
  onChange?: (value: string | boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  name,
  label,
  onValue,
  offValue,
  onLabel,
  offLabel,
  value,
  onChange,
}) => {
  const isChecked = value === onValue;

  return (
    <FormControl display='flex' alignItems='center'>
      {label && (
        <FormLabel htmlFor={name} mb='0'>
          {label}
        </FormLabel>
      )}
      <Switch
        id={name}
        isChecked={isChecked}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.checked ? onValue : offValue);
          }
        }}
      />
      <Text ml={2}>{isChecked ? onLabel : offLabel}</Text>
    </FormControl>
  );
};

export default ToggleSwitch;
