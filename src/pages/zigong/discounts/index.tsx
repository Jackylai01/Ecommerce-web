import { Box } from '@chakra-ui/react';
import DiscountForm from '@components/Form/FormCRUD/DiscountForm';
import AddButton from '@components/Icons/AddFormIcon';
import DiscountTableContainer from '@components/Layout/AdminLayout/Discount';
import LoadingLayout from '@components/Layout/LoadingLayout';
import MessageModal from '@components/Modal/MessageModal';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { Discount } from '@models/entities/shared/discount';
import { resetDiscountState } from '@reducers/admin/discount';
import { addDiscountAsync } from '@reducers/admin/discount/actions';
import { useEffect, useState } from 'react';

const NewDiscount = () => {
  const dispatch = useAppDispatch();
  const {
    status: { addDiscountLoading, addDiscountSuccess, addDiscountFailed },
    error: { addDiscountError },
  } = useAppSelector((state) => state.adminDiscount);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('新增折扣');

  const handleSubmit = (data: Discount) => {
    dispatch(addDiscountAsync(data));
  };

  useEffect(() => {
    if (addDiscountSuccess) {
      setIsModalOpen(true);
      setModalContent('新增折扣成功！');
      setModalTitle('新增折扣');
    }

    if (addDiscountFailed) {
      setIsModalOpen(true);
      setModalContent('');
    }
  }, [addDiscountSuccess, addDiscountFailed]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    return () => {
      dispatch(resetDiscountState());
    };
  }, [dispatch]);

  return (
    <LoadingLayout isLoading={addDiscountLoading}>
      <AddButton
        formTitle='Add Discount'
        formContent={<DiscountForm />}
        onSubmit={handleSubmit}
      />
      <Box mt='8rem'>
        <DiscountTableContainer />
      </Box>
      <MessageModal
        title={modalTitle}
        isActive={isModalOpen}
        error={addDiscountError}
        onClose={handleCloseModal}
      >
        {modalContent}
      </MessageModal>
    </LoadingLayout>
  );
};

export default NewDiscount;
