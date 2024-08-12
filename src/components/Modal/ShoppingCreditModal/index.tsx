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
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import { ShoppingCredit } from '@models/responses/shoppingCredit';
import { addShoppingCreditsForMembershipLevelAsync } from '@reducers/admin/shoppingCredits/actions';

import React, { useState } from 'react';
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

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ShoppingCredit) => {
    setIsLoading(true);
    try {
      await dispatch(
        addShoppingCreditsForMembershipLevelAsync({ ...data, levelId }),
      );
      toast({
        title: '購物金發放成功',
        description: '已成功發放購物金給該會員分級的所有會員。',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
      reset();
    } catch (error) {
      toast({
        title: '發放失敗',
        description: '購物金發放過程中發生錯誤。',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

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
              <Input
                placeholder='輸入購物金類型'
                {...register('type', {
                  required: '購物金類型是必填項目',
                })}
              />
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
              isLoading={isLoading}
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
