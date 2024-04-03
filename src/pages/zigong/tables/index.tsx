import { UsersForm } from '@components/Form/FormCRUD/Users';
import AddButton from '@components/Icons/AddFormIcon';
import Authors from '@components/Layout/AdminLayout/Tables/components/Authors';
import Projects from '@components/Layout/AdminLayout/Tables/components/Projects';
import LoadingLayout from '@components/Layout/LoadingLayout';
import TabsLayout from '@components/Layout/TabsLayout';
import MessageModal from '@components/Modal/MessageModal';
import { UsersConfig } from '@fixtures/Tabs-configs';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { adminCreateAccountsAsync } from '@reducers/admin/auth/actions';
import { useEffect, useState } from 'react';
import { dashboardTableData } from 'src/variables/general';

const TablesPage = () => {
  const dispatch = useAppDispatch();
  const {
    status: {
      createAccountsFailed,
      createAccountsLoading,
      createAccountsSuccess,
    },
    error: { createAccountsError },
  } = useAppSelector((state) => state.adminAuth);
  const [modalContent, setModalContent] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('新增使用者');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSubmit = (data: any) => {
    dispatch(adminCreateAccountsAsync(data));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (createAccountsSuccess) {
      setIsModalOpen(true);
      setModalContent('使用者新增成功！');
    }

    if (createAccountsFailed) {
      setIsModalOpen(true);
      setModalContent('');
    }
  }, [createAccountsFailed, createAccountsLoading, createAccountsSuccess]);

  useEffect(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <LoadingLayout isLoading={createAccountsLoading}>
      <AddButton
        formTitle='Add Users account'
        formContent={<UsersForm />}
        onSubmit={handleSubmit}
      />

      <TabsLayout tabsConfig={UsersConfig}>
        <Authors
          title={'帳號管理'}
          captions={['使用者名稱', '信箱', '角色', '城市', '']}
        />
      </TabsLayout>
      <Projects
        title={'Projects Table'}
        captions={['Companies', 'Budget', 'Status', 'Completion', '']}
        data={dashboardTableData}
      />

      <MessageModal
        title={modalTitle}
        isActive={isModalOpen}
        error={createAccountsError}
        onClose={handleCloseModal}
      >
        {modalContent}
      </MessageModal>
    </LoadingLayout>
  );
};

export default TablesPage;
