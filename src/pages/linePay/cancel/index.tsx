import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CancelPage = () => {
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    toast({
      title: '支付已取消',
      description: '您已取消支付。',
      status: 'warning',
      isClosable: true,
    });

    router.push('/checkout');
  }, [router, toast]);

  return <div>支付取消中...</div>;
};

export default CancelPage;
