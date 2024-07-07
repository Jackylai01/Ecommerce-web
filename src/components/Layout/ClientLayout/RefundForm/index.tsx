import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { resetQuestReturnState } from '@reducers/client/refunds';
import { requestReturnAsync } from '@reducers/client/refunds/actions';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const RefundForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const {
    status: { requestReturnLoading, requestReturnFailed, requestReturnSuccess },
    error: { requestReturnError },
  } = useAppSelector((state) => state.clientRefunds);
  const { userInfo } = useAppSelector((state) => state.clientAuth);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const onSubmit = async (data: any) => {
    if (!userInfo?._id) return;
    const formData = new FormData();
    formData.append('userId', userInfo._id);
    formData.append('orderId', data.orderId);
    formData.append('reason', data.reason);
    formData.append('description', data.description);
    Array.from(data.files).forEach((file: any) => {
      formData.append('images', file);
    });

    dispatch(requestReturnAsync(formData));
  };

  useEffect(() => {
    if (requestReturnSuccess) {
      toast({
        title: '退貨申請成功！',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      reset();
    } else if (requestReturnFailed) {
      toast({
        title: '退貨申請失敗！',
        description: requestReturnError,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [
    toast,
    requestReturnSuccess,
    requestReturnFailed,
    requestReturnError,
    reset,
  ]);

  useEffect(() => {
    dispatch(resetQuestReturnState());
  }, [requestReturnSuccess]);

  return (
    <LoadingLayout isLoading={requestReturnLoading}>
      <Box
        as='form'
        maxW='500px'
        mx='auto'
        bg='white'
        p='30px'
        borderRadius='12px'
        boxShadow='0 10px 20px rgba(0, 0, 0, 0.05)'
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl mb='24px'>
          <FormLabel>訂單號碼</FormLabel>
          <Input
            type='text'
            {...register('orderId', { required: true })}
            placeholder='請輸入訂單號碼'
          />
        </FormControl>
        <FormControl mb='24px'>
          <FormLabel>退貨說明</FormLabel>
          <Textarea
            {...register('description', { required: true })}
            placeholder='請輸入退貨說明'
          />
        </FormControl>
        <FormControl mb='24px'>
          <FormLabel>退貨原因</FormLabel>
          <Select
            {...register('reason', { required: true })}
            placeholder='請選擇退貨原因'
          >
            <option value='quality-issue'>商品質量問題</option>
            <option value='wrong-item'>收到錯誤商品</option>
            <option value='damaged'>商品損壞</option>
            <option value='not-as-described'>商品與描述不符</option>
            <option value='other'>其他原因</option>
          </Select>
        </FormControl>
        <FormControl mb='24px'>
          <FormLabel
            htmlFor='evidence-upload'
            className='evidence-upload__label'
          >
            <span className='evidence-upload__icon'>📎</span>
            上傳證據（照片或影片）
          </FormLabel>
          <Input
            type='file'
            id='evidence-upload'
            accept='image/*,video/*'
            multiple
            {...register('files')}
            className='evidence-upload__input'
          />
        </FormControl>
        <Button
          type='submit'
          bg='#4a90e2'
          color='white'
          w='full'
          size='lg'
          borderRadius='8px'
          _hover={{ bg: '#3a7bd5', transform: 'translateY(-2px)' }}
        >
          送出退貨申請
        </Button>
      </Box>
    </LoadingLayout>
  );
};

export default RefundForm;
