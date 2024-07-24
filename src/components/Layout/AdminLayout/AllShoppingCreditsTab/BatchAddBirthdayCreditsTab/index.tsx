import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  VStack,
} from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { adminGetAllClientUsersAsync } from '@reducers/admin/client-users/actions';
import { addBirthdayShoppingCreditsAsync } from '@reducers/admin/shoppingCredits/actions';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';

const BatchAddBirthdayCreditsTab = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { amount: 0 },
  });
  const dispatch = useAppDispatch();
  const toast = useToast();

  const {
    list: users,
    metadata,
    status,
  } = useAppSelector((state) => state.adminClientUsers);

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(adminGetAllClientUsersAsync({ page: 1, limit: 10 }));
  }, [dispatch]);

  const onSubmit = async (data: { amount: number }) => {
    try {
      await dispatch(
        addBirthdayShoppingCreditsAsync({
          userIds: selectedUsers,
          amount: data.amount,
        }),
      );
      toast({
        title: '批量發放生日購物金成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      reset();
      setSelectedUsers([]);
    } catch (error) {
      toast({
        title: '批量發放生日購物金失敗',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users?.length) {
      setSelectedUsers([]);
    } else {
      const userIds =
        users
          ?.map((user) => user._id)
          .filter((id): id is string => id !== undefined) || [];
      setSelectedUsers(userIds);
    }
  };

  const handleSearch = () => {
    dispatch(adminGetAllClientUsersAsync({ page: 1, limit: 10, search }));
  };

  return (
    <Box p={4} borderWidth={1} borderRadius='lg' boxShadow='lg'>
      <VStack spacing={4}>
        <Box as='form' w='full' onSubmit={handleSubmit(onSubmit)}>
          <FormControl id='amount' mb='4'>
            <FormLabel>金額</FormLabel>
            <Input
              type='number'
              {...register('amount', { valueAsNumber: true })}
            />
          </FormControl>
          <Button type='submit' colorScheme='teal' w='full'>
            批量發放生日購物金
          </Button>
        </Box>
        <InputGroup>
          <Input
            placeholder='搜尋用戶'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            shadow='sm'
            borderRadius='10px 20px 20px 10px'
          />
          <InputRightElement>
            <IconButton
              aria-label='Search users'
              icon={<FaSearch />}
              onClick={handleSearch}
              colorScheme='teal'
              borderLeftRadius={0}
            />
          </InputRightElement>
        </InputGroup>
        <Table variant='simple' size='md'>
          <Thead>
            <Tr>
              <Th>
                <Checkbox
                  isChecked={selectedUsers.length === users?.length}
                  onChange={handleSelectAll}
                  borderColor='teal.500'
                />
              </Th>

              <Th>用戶名</Th>
              <Th>電子郵件</Th>
              <Th>生日</Th>
            </Tr>
          </Thead>
          <Tbody>
            {status.getAllClientUsersLoading ? (
              <Tr>
                <Td colSpan={5} textAlign='center'>
                  <Spinner />
                </Td>
              </Tr>
            ) : (
              users?.map((user) => (
                <Tr key={user._id}>
                  <Td>
                    <Checkbox
                      isChecked={selectedUsers.includes(user._id!)}
                      onChange={() => handleSelectUser(user._id!)}
                      borderColor='teal.500'
                    />
                  </Td>
                  <Td>{user.username}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    {user.birthday
                      ? new Date(user.birthday).toLocaleDateString()
                      : '無'}
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
};

export default BatchAddBirthdayCreditsTab;
