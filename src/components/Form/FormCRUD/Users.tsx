it import { FormControl, FormLabel, Select, VStack } from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getAllRolesAsync } from '@reducers/admin/admin-roles/actions';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import TextInput from './Field/TextInput';

export const UsersForm = () => {
  const { setValue } = useFormContext();
  const dispatch = useAppDispatch();
  const { list: roles } = useAppSelector((state) => state.adminRoles);

  useEffect(() => {
    dispatch(getAllRolesAsync());
  }, [dispatch]);

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
      <FormControl id='roles'>
        <FormLabel>選擇角色</FormLabel>
        <Select
          placeholder='選擇角色'
          onChange={(e) => setValue('roles', e.target.value)}
        >
          {roles?.map((role: any) => (
            <option key={role._id} value={role._id}>
              {role.name}
            </option>
          ))}
        </Select>
      </FormControl>
    </VStack>
  );
};
