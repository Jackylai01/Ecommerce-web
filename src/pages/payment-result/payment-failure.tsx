import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PaymentFailure = () => {
  const router = useRouter();

  useEffect(() => {
    // 可以在这里添加任何支付失败后的逻辑
    console.log('Payment failed.');
  }, []);

  return (
    <div>
      <h1>Payment Failure</h1>
      <p>
        Unfortunately, there was an issue processing your payment. Please try
        again.
      </p>
    </div>
  );
};

export default PaymentFailure;
