import { Box } from '@chakra-ui/react';
import DotAnimationLoadingLayout from '@components/Layout/LoadingLayout/dotAnimationLoading';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const PaymentPage = () => {
  const router = useRouter();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const paymentHtml = localStorage.getItem('paymentForm');

    setLoading(true);

    if (paymentHtml && formContainerRef.current) {
      formContainerRef.current.innerHTML = paymentHtml;

      const form = formContainerRef.current.querySelector(
        'form',
      ) as HTMLFormElement;
      if (form) {
        setLoading(false);
        form.style.display = 'none';
        form.submit();
      } else {
        console.error('No form found in the payment HTML');
        setLoading(true);
        router.push('/checkout');
      }
    } else {
      console.error('No payment form found in localStorage');
      setLoading(true);
      router.push('/checkout');
    }
  }, [router]);

  return (
    <DotAnimationLoadingLayout isLoading={loading}>
      <Box ref={formContainerRef}></Box>;
    </DotAnimationLoadingLayout>
  );
};

export default PaymentPage;
