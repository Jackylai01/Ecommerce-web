import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PaymentSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    console.log('Payment was successful!');
  }, []);

  return (
    <div>
      <h1>Payment Success</h1>
      <p>
        Thank you for your payment. Your transaction has been successfully
        processed.
      </p>
    </div>
  );
};

export default PaymentSuccess;
