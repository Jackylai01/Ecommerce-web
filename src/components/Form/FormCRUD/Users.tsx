import { VStack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import TextInput from './Field/TextInput';
import ToggleSwitch from './Field/ToggleSwitch';

interface UsersType {}

export const UsersForm = () => {
  const { setValue } = useFormContext();

  return (
    <VStack spacing={4} align='flex-start'>
      <TextInput
        name='username'
        label='姓名'
        placeholder='請輸入姓名'
        type='text'
        isRequired
      />
      <TextInput
        name='email'
        label='信箱'
        type='email'
        placeholder='請輸入電子信箱'
        isRequired
      />
      <ToggleSwitch
        name='role'
        label='角色狀態'
        onValue='admin'
        offValue='staff'
        onLabel='管理員'
        offLabel='員工'
      />
    </VStack>
  );
};
