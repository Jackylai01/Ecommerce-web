import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { ShoppingCreditType } from '@models/responses/shoppingCreditType.res';
import {
  addShoppingCreditTypeAsync,
  deleteShoppingCreditTypeAsync,
  getAllShoppingCreditTypesAsync,
  updateShoppingCreditTypeAsync,
} from '@reducers/admin/shopping-credits-type/actions';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const ShoppingCreditTypeManagementTab: React.FC = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [editingType, setEditingType] = useState<string | null>(null);

  const {
    list: creditTypes,
    status: {
      addShoppingCreditTypeLoading,
      updateShoppingCreditTypeLoading,
      deleteShoppingCreditTypeLoading,
    },
    error: {
      updateShoppingCreditTypeError,
      addShoppingCreditTypeError,
      deleteShoppingCreditTypeError,
    },
  } = useAppSelector((state) => state.adminShoppingCreditsType);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<{ name: string }>({
    defaultValues: { name: '' },
  });

  useEffect(() => {
    dispatch(getAllShoppingCreditTypesAsync());
  }, [dispatch]);

  const onSubmit = (data: { name: string }) => {
    if (editingType) {
      dispatch(
        updateShoppingCreditTypeAsync({ id: editingType, body: data }),
      ).then(() => {
        toast({
          title: '類別更新成功',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        reset();
        setEditingType(null); // 重置編輯模式
        dispatch(getAllShoppingCreditTypesAsync());
      });
    } else {
      dispatch(addShoppingCreditTypeAsync(data)).then(() => {
        toast({
          title: '類別新增成功',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        reset();
        dispatch(getAllShoppingCreditTypesAsync());
      });
    }
  };

  const handleEdit = (type: ShoppingCreditType) => {
    setEditingType(type._id);
    setValue('name', type.name); // 將選定的名稱載入到表單中
  };

  const handleDelete = (id: string) => {
    dispatch(deleteShoppingCreditTypeAsync(id)).then(() => {
      toast({
        title: '刪除成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      dispatch(getAllShoppingCreditTypesAsync());
    });
  };

  return (
    <LoadingLayout isLoading={deleteShoppingCreditTypeLoading}>
      <Box>
        <Box mb='4'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb='4' isInvalid={!!errors.name}>
              <FormLabel>購物金類別名稱</FormLabel>
              <Input
                placeholder='輸入購物金類別名稱'
                {...register('name', { required: '此項為必填' })}
              />
              {errors.name && <Box color='red.500'>{errors.name.message}</Box>}
            </FormControl>
            <Button
              colorScheme='teal'
              type='submit'
              isLoading={
                addShoppingCreditTypeLoading || updateShoppingCreditTypeLoading
              }
            >
              {editingType ? '更新類別' : '新增類別'}
            </Button>
            {editingType && (
              <Button
                ml={3}
                variant='outline'
                onClick={() => {
                  reset();
                  setEditingType(null);
                }}
              >
                取消編輯
              </Button>
            )}
          </form>
        </Box>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>名稱</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {creditTypes?.map((type) => (
              <Tr key={type._id}>
                <Td>{type.name}</Td>
                <Td>
                  <IconButton
                    aria-label='Edit'
                    icon={<EditIcon />}
                    mr='2'
                    onClick={() => handleEdit(type)}
                    isLoading={
                      updateShoppingCreditTypeLoading &&
                      editingType === type._id
                    }
                  />
                  <IconButton
                    aria-label='Delete'
                    icon={<DeleteIcon />}
                    colorScheme='red'
                    onClick={() => handleDelete(type._id)}
                    isLoading={deleteShoppingCreditTypeLoading}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </LoadingLayout>
  );
};

export default ShoppingCreditTypeManagementTab;
