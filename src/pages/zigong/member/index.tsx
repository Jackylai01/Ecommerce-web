import { Box, useDisclosure, useToast } from '@chakra-ui/react';
import SendEmailForm from '@components/Form/FormCRUD/SendEmail';
import MerbershipLevel from '@components/Layout/AdminLayout/MerbershipLevel';
import MemberManagementTable from '@components/Layout/AdminLayout/MemberManagement/MemberManagementTable';
import MemberToolbar from '@components/Layout/AdminLayout/MemberManagement/MemberToolbar';
import LoadingLayout from '@components/Layout/LoadingLayout';
import TabsLayout from '@components/Layout/TabsLayout';
import FormModal from '@components/Modal/FormModal';
import { UsersConfig } from '@fixtures/Tabs-configs';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { notifySelectedUsersAsync } from '@reducers/admin/client-users/actions';
import { NextPage } from 'next';
import { useEffect } from 'react';

const MembersPages: NextPage = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    status: {
      notifySelectedUsersLoading,
      notifySelectedUsersSuccess,
      notifySelectedUsersFailed,
    },
    error: { notifySelectedUsersError },
    metadata,
  } = useAppSelector((state) => state.adminClientUsers);

  const handleSubmitEmail = (emailData: any) => {
    dispatch(notifySelectedUsersAsync(emailData));
  };

  const handleSendEmail = () => {
    onOpen();
  };

  useEffect(() => {
    if (notifySelectedUsersSuccess) {
      toast({
        title: '送出成功',
        description: '郵件已成功發送',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }

    if (notifySelectedUsersFailed) {
      toast({
        title: '送出失敗',
        description: notifySelectedUsersError || '發生未知錯誤',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [notifySelectedUsersSuccess, notifySelectedUsersFailed, notifySelectedUsersError, toast, onClose]);

  return (
    <LoadingLayout isLoading={notifySelectedUsersLoading}>
      <Box p={{ base: 4, md: 6 }}>
        {/* 工具列 */}
        <MemberToolbar
          onSendEmail={handleSendEmail}
          totalCount={metadata?.count || 0}
        />

        {/* Tab 切換 */}
        <TabsLayout tabsConfig={UsersConfig}>
          {/* 新的會員管理表格 */}
          <MemberManagementTable />
        </TabsLayout>

        {/* 寄信表單對話框 */}
        <FormModal
          isOpen={isOpen}
          onClose={onClose}
          title='寄信通知'
          onSubmit={handleSubmitEmail}
        >
          <SendEmailForm />
        </FormModal>

        {/* 會員等級管理 */}
        <MerbershipLevel />
      </Box>
    </LoadingLayout>
  );
};

export default MembersPages;
