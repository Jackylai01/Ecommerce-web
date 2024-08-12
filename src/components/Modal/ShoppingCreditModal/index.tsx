import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { ShoppingCredit } from '@models/responses/shoppingCredit';
import { getAllShoppingCreditTypesAsync } from '@reducers/admin/shopping-credits-type/actions';
import { addShoppingCreditsForMembershipLevelAsync } from '@reducers/admin/shoppingCredits/actions';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface ShoppingCreditModalProps {
  levelId: string;
}

const ShoppingCreditModal: React.FC<ShoppingCreditModalProps> = ({
  levelId,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ShoppingCredit>();

  const {
    list: creditTypes,
    status: {
      addShoppingCreditTypeFailed,
      addShoppingCreditTypeLoading,
      addShoppingCreditTypeSuccess,
    },
    error: { addShoppingCreditTypeError },
  } = useAppSelector((state) => state.adminShoppingCreditsType);

  useEffect(() => {
    dispatch(getAllShoppingCreditTypesAsync());
  }, [dispatch]);

  const onSubmit = (data: ShoppingCredit) => {
    const selectedType = creditTypes?.find((type) => type.name === data.type);
    if (!selectedType) {
      throw new Error('無效的購物金類型');
    }
    dispatch(
      addShoppingCreditsForMembershipLevelAsync({
        ...data,
        type: selectedType._id,
        levelId,
      }),
    );
  };

  useEffect(() => {
    if (addShoppingCreditTypeSuccess) {
      toast({
        title: '購物金發放成功',
        description: '已成功發放購物金給該會員分級的所有會員。',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else if (addShoppingCreditTypeFailed) {
      toast({
        title: '購物金發放失敗',
        description: addShoppingCreditTypeError,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [
    toast,
    addShoppingCreditTypeSuccess,
    addShoppingCreditTypeFailed,
    addShoppingCreditTypeError,
  ]);

  return (
    <>
      <Button onClick={onOpen} colorScheme='teal' ml={4}>
        發放購物金
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as='form' onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>批量發放購物金</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4} isInvalid={!!errors.amount}>
              <FormLabel>購物金金額</FormLabel>
              <Input
                type='number'
                placeholder='輸入金額'
                {...register('amount', {
                  required: '購物金金額是必填項目',
                  valueAsNumber: true,
                })}
              />
              {errors.amount && (
                <Box color='red.500'>{errors.amount.message}</Box>
              )}
            </FormControl>
            <FormControl mb={4} isInvalid={!!errors.type}>
              <FormLabel>類型</FormLabel>
              <Select
                placeholder='選擇購物金類型'
                {...register('type', {
                  required: '購物金類型是必填項目',
                })}
              >
                {creditTypes?.map((type) => (
                  <option key={type._id} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </Select>
              {errors.type && <Box color='red.500'>{errors.type.message}</Box>}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>到期日期</FormLabel>
              <Input
                type='date'
                placeholder='選擇到期日期'
                {...register('expiryDate')}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' onClick={onClose}>
              取消
            </Button>
            <Button
              colorScheme='blue'
              ml={3}
              type='submit'
              isLoading={addShoppingCreditTypeLoading}
            >
              發放
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShoppingCreditModal;
