import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Button, Container, Flex, IconButton } from '@chakra-ui/react';
import DiscountForm from '@components/Form/FormCRUD/DiscountForm';
import LoadingLayout from '@components/Layout/LoadingLayout';
import MessageModal from '@components/Modal/MessageModal';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  getDiscountByIdAsync,
  updateDiscountAsync,
} from '@reducers/admin/discount/actions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAdminColorMode } from 'src/context/colorMode';

const DiscountEditPage = () => {
  const router = useRouter();
  const { colorMode } = useAdminColorMode();
  const textColor = colorMode === 'light' ? 'gray.700' : 'white';
  const iconColor = colorMode === 'light' ? 'gray.700' : 'white';
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const methods = useForm();
  const {
    discountDetails,
    status: {
      updateDiscountLoading,
      updateDiscountSuccess,
      updateDiscountFailed,
    },
    error: { updateDiscountError },
  } = useAppSelector((state) => state.adminDiscount);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('編輯折扣');

  useEffect(() => {
    if (id) {
      dispatch(getDiscountByIdAsync(id as string));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (discountDetails) {
      methods.reset(discountDetails);
    }
  }, [discountDetails, methods]);

  useEffect(() => {
    if (updateDiscountSuccess) {
      setIsModalOpen(true);
      setModalContent('折扣更新成功！');
      setModalTitle('更新折扣');
    }

    if (updateDiscountFailed) {
      setIsModalOpen(true);
      setModalContent('');
    }
  }, [updateDiscountSuccess, updateDiscountFailed]);

  const handleSubmit = async (data: any) => {
    if (typeof id === 'string') {
      await dispatch(updateDiscountAsync({ id, body: data }));
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <LoadingLayout isLoading={updateDiscountLoading}>
      <Container maxW='container.2x1' mt='5rem'>
        <Flex justifyContent='space-between' alignItems='center' mb={4}>
          <IconButton
            icon={<ArrowBackIcon />}
            aria-label='Back'
            onClick={handleBack}
            color={iconColor}
          />
          <Box as='h1' fontSize='2xl' color={textColor}>
            編輯折扣
          </Box>
          <Box width='40px' />
        </Flex>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <Box
              border='1px'
              borderRadius='md'
              borderColor='gray.200'
              p={4}
              boxShadow='sm'
            >
              <DiscountForm />
            </Box>
            <Button mt={4} colorScheme='teal' type='submit'>
              送出
            </Button>
          </form>
        </FormProvider>
      </Container>
      <MessageModal
        title={modalTitle}
        isActive={isModalOpen}
        error={updateDiscountError}
        onClose={handleCloseModal}
      >
        {modalContent}
      </MessageModal>
    </LoadingLayout>
  );
};

export default DiscountEditPage;
