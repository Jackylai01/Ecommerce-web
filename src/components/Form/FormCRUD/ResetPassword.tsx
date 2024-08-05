import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import FormModal from '@components/Modal/FormModal';
import MessageModal from '@components/Modal/MessageModal';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { adminResetPasswordAsync } from '@reducers/admin/auth/actions';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface ResetPasswordType {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  currentPassword: string;
  newPassword: string;
}

export const ResetPasswordForm = ({ isOpen, onClose }: ResetPasswordType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const dispatch = useAppDispatch();
  const {
    status: { resetPasswordFailed, resetPasswordLoading, resetPasswordSuccess },
    error: { resetPasswordError },
  } = useAppSelector((state) => state.adminAuth);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('重設密碼');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    if (resetPasswordSuccess) {
      setIsModalOpen(true);
      setModalContent('重設密碼成功！');
      setModalTitle('重設密碼');
    }

    if (resetPasswordFailed) {
      setIsModalOpen(true);
      setModalContent('重設密碼失敗！');
    }
  }, [resetPasswordFailed, resetPasswordSuccess]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(adminResetPasswordAsync(data));
    onClose();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const toggleCurrentPasswordVisibility = () =>
    setShowCurrentPassword(!showCurrentPassword);
  const toggleNewPasswordVisibility = () =>
    setShowNewPassword(!showNewPassword);

  useEffect(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <LoadingLayout isLoading={resetPasswordLoading}>
        <FormModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit(onSubmit)}
          title='重設密碼'
        >
          <>
            <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type={showCurrentPassword ? 'text' : 'password'}
                placeholder='輸入當前密碼'
                {...register('currentPassword', {
                  required: '當前密碼必填',
                })}
              />
              <InputRightElement width='4.5rem'>
                <Button
                  h='1.75rem'
                  size='sm'
                  onClick={toggleCurrentPasswordVisibility}
                >
                  {showCurrentPassword ? '隱藏' : '顯示'}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.currentPassword && <p>{errors.currentPassword.message}</p>}

            <InputGroup size='md' mt='4'>
              <Input
                pr='4.5rem'
                type={showNewPassword ? 'text' : 'password'}
                placeholder='輸入新密碼'
                {...register('newPassword', {
                  required: '新密碼必填',
                })}
              />
              <InputRightElement width='4.5rem'>
                <Button
                  h='1.75rem'
                  size='sm'
                  onClick={toggleNewPasswordVisibility}
                >
                  {showNewPassword ? '隱藏' : '顯示'}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.newPassword && <p>{errors.newPassword.message}</p>}
          </>
        </FormModal>
        <MessageModal
          title={modalTitle}
          isActive={isModalOpen}
          error={resetPasswordError}
          onClose={handleCloseModal}
        >
          {modalContent}
        </MessageModal>
      </LoadingLayout>
    </>
  );
};
