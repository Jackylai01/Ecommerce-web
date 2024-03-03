import useAppSelector from '@hooks/useAppSelector';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// 非admin 導回首頁或登入頁的防護機制

const useAdminAuth = () => {
  const router = useRouter();
  const { userProfile } = useAppSelector((state) => state.adminAuth);

  const isAdmin = userProfile?.roles.includes('admin');

  useEffect(() => {
    if (userProfile && !isAdmin) {
      router.push('/');
    }
  }, [router, isAdmin, userProfile]);

  return {};
};

export default useAdminAuth;
