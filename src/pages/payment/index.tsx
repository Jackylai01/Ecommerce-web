import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

const PaymentPage = () => {
  const router = useRouter();
  const formContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const paymentHtml = localStorage.getItem('paymentForm');

    if (paymentHtml && formContainerRef.current) {
      formContainerRef.current.innerHTML = paymentHtml;

      const form = formContainerRef.current.querySelector(
        'form',
      ) as HTMLFormElement;
      if (form) {
        form.style.display = 'none';
        form.submit();
      } else {
        console.error('No form found in the payment HTML');
        router.push('/checkout');
      }
    } else {
      console.error('No payment form found in localStorage');
      router.push('/checkout');
    }
  }, [router]);

  return <div ref={formContainerRef}></div>;
};

export default PaymentPage;
