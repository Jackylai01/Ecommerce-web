import { UsersForm } from '@components/Form/FormCRUD/Users';
import RoleManagement from '@components/Layout/AdminLayout/RoleManagement';
import UserManagementTable from '@components/Layout/AdminLayout/UserManagement/UserManagementTable';
import TableToolbar from '@components/Layout/AdminLayout/UserManagement/TableToolbar';
import LoadingLayout from '@components/Layout/LoadingLayout';
import TabsLayout from '@components/Layout/TabsLayout';
import FormModal from '@components/Modal/FormModal';
import { UsersConfig } from '@fixtures/Tabs-configs';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { adminCreateAccountsAsync } from '@reducers/admin/auth/actions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDisclosure, useToast, Box } from '@chakra-ui/react';

const TablesPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    status: {
      createAccountsFailed,
      createAccountsLoading,
      createAccountsSuccess,
    },
    error: { createAccountsError },
    metadata,
  } = useAppSelector((state) => state.adminAuth);

  const handleSubmit = (data: any) => {
    dispatch(adminCreateAccountsAsync(data));
  };

  const handleAddUser = () => {
    onOpen();
  };

  useEffect(() => {
    if (createAccountsSuccess) {
      toast({
        title: '新增成功',
        description: '用戶已成功新增',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
      // 重新載入用戶列表
      const page = parseInt(router.query.page as string) || 1;
      window.location.reload();
    }

    if (createAccountsFailed) {
      toast({
        title: '新增失敗',
        description: createAccountsError || '發生未知錯誤',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [createAccountsFailed, createAccountsSuccess, createAccountsError, toast, onClose, router.query.page]);

  // 確定當前路由是否為角色管理
  const isRoleManagementPage = router.pathname === '/zigong/tables/roles';

  return (
    <LoadingLayout isLoading={createAccountsLoading}>
      <Box p={{ base: 4, md: 6 }}>
        {/* 根據當前頁面動態顯示內容 */}
        {!isRoleManagementPage ? (
          <>
            {/* 工具列 */}
            <TableToolbar
              onAddUser={handleAddUser}
              totalCount={metadata?.count || 0}
            />

            {/* Tab 切換 */}
            <TabsLayout tabsConfig={UsersConfig}>
              {/* 新的用戶管理表格 */}
              <UserManagementTable />
            </TabsLayout>

            {/* 新增用戶表單對話框 */}
            <FormModal
              isOpen={isOpen}
              onClose={onClose}
              onSubmit={handleSubmit}
              title='新增用戶'
            >
              <UsersForm />
            </FormModal>
          </>
        ) : (
          <RoleManagement />
        )}
      </Box>
    </LoadingLayout>
  );
};

export default TablesPage;
