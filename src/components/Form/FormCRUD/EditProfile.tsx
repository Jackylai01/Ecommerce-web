import { VStack, useToast } from '@chakra-ui/react';
import useAppSelector from '@hooks/useAppSelector';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import TextInput from './Field/TextInput';

export const EditProfileForm = () => {
  const toast = useToast();
  const { setValue } = useFormContext();
  const { userProfile } = useAppSelector((state) => state.adminAuth);

  useEffect(() => {
    if (userProfile) {
      setValue('username', userProfile.username || '');
      setValue('email', userProfile.email || '');
      setValue('address', userProfile.address || '');
      setValue('city', userProfile.city || '');
      setValue('country', userProfile.country || '');
      setValue('postalCode', userProfile.postalCode || '');
    }
  }, [userProfile, setValue]);

  return (
    <>
      <VStack spacing={4}>
        <TextInput
          name='username'
          label='用戶名'
          placeholder='請輸入用戶名'
          isRequired
        />
        <TextInput
          name='email'
          label='電子郵件'
          placeholder='請輸入電子郵件'
          isRequired
          type='email'
        />
        <TextInput name='address' label='地址' placeholder='請輸入地址' />
        <TextInput name='city' label='城市' placeholder='請輸入城市' />
        <TextInput name='country' label='國家' placeholder='請輸入國家' />
        <TextInput
          name='postalCode'
          label='郵政編碼'
          placeholder='請輸入郵政編碼'
        />
      </VStack>
    </>
  );
};
