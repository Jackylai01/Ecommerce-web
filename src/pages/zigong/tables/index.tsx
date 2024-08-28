import { UsersForm } from '@components/Form/FormCRUD/Users';
import AddButton from '@components/Icons/AddFormIcon';
import RoleManagement from '@components/Layout/AdminLayout/RoleManagement';
import Authors from '@components/Layout/AdminLayout/Tables/components/Authors';
import LoadingLayout from '@components/Layout/LoadingLayout';
import TabsLayout from '@components/Layout/TabsLayout';
import MessageModal from '@components/Modal/MessageModal';
import { UsersConfig } from '@fixtures/Tabs-configs';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { adminCreateAccountsAsync } from '@reducers/admin/auth/actions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const TablesPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
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
      setModalTitle('新增使用者');
      setModalContent('使用者新增成功！');
    }

    if (createAccountsFailed) {
      setIsModalOpen(true);
      setModalTitle('新增使用者失敗');
      setModalContent(createAccountsError || '發生未知錯誤');
    }
  }, [createAccountsFailed, createAccountsSuccess, createAccountsError]);

  useEffect(() => {
    setIsModalOpen(false);
  }, []);

  // 確定當前路由是否為角色管理
  const isRoleManagementPage = router.pathname === '/zigong/tables/roles';

  return (
    <LoadingLayout isLoading={createAccountsLoading}>
      {/* 根據當前頁面動態顯示表單 */}
      {!isRoleManagementPage ? (
        <>
          <AddButton
            formTitle='Add Users account'
            formContent={<UsersForm />}
            onSubmit={handleSubmit}
          />
          <TabsLayout tabsConfig={UsersConfig}>
            <Authors
              title={'帳號管理'}
              captions={['使用者名稱', '信箱', '城市', '']}
            />
          </TabsLayout>
        </>
      ) : (
        <RoleManagement />
      )}

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
