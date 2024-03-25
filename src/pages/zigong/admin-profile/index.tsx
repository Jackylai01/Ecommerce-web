import FormLayout from '@components/CRUDLayout/FormLayout';
import LoadingLayout from '@components/Layout/LoadingLayout';
import MessageModal from '@components/Modal/MessageModal';
import crudConfigMap from '@fixtures/crud-configs';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { resetAdminAuthStatus } from '@reducers/admin/auth';
import { adminModifyProfileAsync } from '@reducers/admin/auth/actions';
import { setCrudLayoutDetail } from '@reducers/crud-layout';
import type { NextPage } from 'next';
import { useEffect } from 'react';

const AdminUserProfilePage: NextPage = () => {
  const dispatch = useAppDispatch();

  const {
    userProfile,
    status: {
      modifyProfileFailed,
      modifyProfileLoading,
      modifyProfileSuccess,
      adminDetailUserProfileLoading,
    },
    error: { modifyProfileError },
  } = useAppSelector((state) => state.adminAuth);

  useEffect(() => {
    if (!userProfile) return;
    dispatch(setCrudLayoutDetail(userProfile));
  }, [dispatch, userProfile]);

  const onSubmit = (data: any) => {
    dispatch(adminModifyProfileAsync(data));
  };

  return (
    <>
      <LoadingLayout isLoading={modifyProfileLoading}>
        <FormLayout
          moduleName='admin-profile'
          config={crudConfigMap['admin-profile']}
          isLoading={modifyProfileLoading || adminDetailUserProfileLoading}
          customSubmit={onSubmit}
        />
        <MessageModal
          title='儲存'
          isActive={modifyProfileSuccess || modifyProfileFailed}
          error={modifyProfileError}
          onClose={() => dispatch(resetAdminAuthStatus())}
        />
      </LoadingLayout>
    </>
  );
};

export default AdminUserProfilePage;
