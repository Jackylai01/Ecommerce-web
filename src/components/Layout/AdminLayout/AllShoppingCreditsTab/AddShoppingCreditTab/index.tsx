import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { adminGetAllClientUsersAsync } from '@reducers/admin/client-users/actions';
import { addShoppingCreditAsync } from '@reducers/admin/shoppingCredits/actions';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const AddShoppingCreditTab = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      userId: '',
      amount: '',
      type: 'birthday',
      status: 'unused',
      expiryDate: '',
    },
  });
  const dispatch = useAppDispatch();
  const toast = useToast();

  const {
    status: {
      addShoppingCreditLoading,
      addShoppingCreditFailed,
      addShoppingCreditSuccess,
    },
    error: { addShoppingCreditError },
  } = useAppSelector((state) => state.adminShoppingCredits);

  const {
    list: users,
    status: { adminDetailClientUserProfileLoading },
  } = useAppSelector((state) => state.adminClientUsers);

  useEffect(() => {
    dispatch(adminGetAllClientUsersAsync({ page: 1, limit: 10 }));
  }, [dispatch]);

  const onSubmit = async (data: any) => {
    await dispatch(addShoppingCreditAsync(data));
    reset(); // 清空表單
  };

  useEffect(() => {
    if (addShoppingCreditSuccess) {
      toast({
        title: '購物金狀態更新成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else if (addShoppingCreditFailed) {
      toast({
        title: '購物金狀態更新失敗',
        description: addShoppingCreditError,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [
    toast,
    dispatch,
    addShoppingCreditFailed,
    addShoppingCreditSuccess,
    addShoppingCreditError,
  ]);

  return (
    <LoadingLayout isLoading={addShoppingCreditLoading}>
      <Box p={4} borderWidth={1} borderRadius='lg' boxShadow='lg'>
        <Box as='form' onSubmit={handleSubmit(onSubmit)}>
          <FormControl id='userId' mb='4'>
            <FormLabel>用戶</FormLabel>
            <Select
              {...register('userId')}
              placeholder='選擇用戶'
              isDisabled={adminDetailClientUserProfileLoading}
            >
              {users?.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username} (
                  {user.birthday
                    ? new Date(user.birthday).toLocaleDateString()
                    : '無生日資訊'}
                  )
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl id='amount' mb='4'>
            <FormLabel>金額</FormLabel>
            <Input type='number' {...register('amount')} />
          </FormControl>
          <FormControl id='type' mb='4'>
            <FormLabel>類型</FormLabel>
            <Select {...register('type')}>
              <option value='birthday'>生日</option>
              <option value='promotion'>促銷</option>
              <option value='other'>其他</option>
            </Select>
          </FormControl>

          <FormControl id='expiryDate' mb='4'>
            <FormLabel>到期日</FormLabel>
            <Input type='date' {...register('expiryDate')} />
          </FormControl>
          <Button type='submit' colorScheme='teal'>
            新增購物金
          </Button>
        </Box>
      </Box>
    </LoadingLayout>
  );
};

export default AddShoppingCreditTab;
