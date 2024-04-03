import { EmailIcon } from '@chakra-ui/icons';
import { Box, IconButton, useDisclosure } from '@chakra-ui/react';
import SendEmailForm from '@components/Form/FormCRUD/SendEmail';
import Members from '@components/Layout/AdminLayout/Tables/components/Members';
import LoadingLayout from '@components/Layout/LoadingLayout';
import TabsLayout from '@components/Layout/TabsLayout';
import FormModal from '@components/Modal/FormModal';
import MessageModal from '@components/Modal/MessageModal';
import { UsersConfig } from '@fixtures/Tabs-configs';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { notifySelectedUsersAsync } from '@reducers/admin/client-users/actions';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useAdminColorMode } from 'src/context/colorMode';

const MembersPages: NextPage = () => {
  const dispatch = useAppDispatch();
  const {
    status: {
      notifySelectedUsersLoading,
      notifySelectedUsersSuccess,
      notifySelectedUsersFailed,
    },
    error: { notifySelectedUsersError },
  } = useAppSelector((state) => state.adminClientUsers);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useAdminColorMode();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleSubmitEmail = (emailData: any) => {
    console.log(emailData);
    dispatch(notifySelectedUsersAsync(emailData));
    onClose();
  };

  useEffect(() => {
    if (notifySelectedUsersSuccess) {
      setIsModalOpen(true);
      setModalContent('送出郵件成功！');
    }

    if (notifySelectedUsersFailed) {
      setIsModalOpen(true);
      setModalContent('');
    }
  }, [notifySelectedUsersSuccess, notifySelectedUsersFailed]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <LoadingLayout isLoading={notifySelectedUsersLoading}>
      <Box h='100vh'>
        <IconButton
          aria-label='寄送郵件'
          icon={<EmailIcon />}
          onClick={onOpen}
          position='absolute'
          right='10'
          color={colorMode === 'light' ? 'white' : 'white'}
          bg={colorMode === 'light' ? 'teal.500' : 'gray.600'}
          _hover={{
            bg: colorMode === 'light' ? 'teal.600' : 'gray.500',
          }}
        />
        <TabsLayout tabsConfig={UsersConfig}>
          <Members
            title={'會員管理'}
            captions={['會員帳號', '信箱', '縣市', '地址', '性別', '']}
          />
        </TabsLayout>
        <FormModal
          isOpen={isOpen}
          onClose={onClose}
          title='寄信通知'
          onSubmit={handleSubmitEmail}
        >
          <SendEmailForm />
        </FormModal>
        <MessageModal
          title='寄送郵件'
          isActive={isModalOpen}
          error={notifySelectedUsersError}
          onClose={handleCloseModal}
        >
          {modalContent}
        </MessageModal>
      </Box>
    </LoadingLayout>
  );
};

export default MembersPages;
