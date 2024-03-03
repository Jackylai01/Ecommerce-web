import { isClientLoggedIn } from '@helpers/token';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useClientAuth = () => {
  const router = useRouter();

  useEffect(() => {
    if (!isClientLoggedIn()) {
      router.push('/public/auth/login');
    }
  }, [router]);

  return {};
};

export default useClientAuth;
