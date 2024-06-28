import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getPaymentResultAsync } from '@reducers/public/payments/actions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PaymentResult = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    status: {
      sendMerchantTradeNoSuccess,
      sendMerchantTradeNoFailed,
      sendMerchantTradeNoLoading,
    },
  } = useAppSelector((state) => state.publicPayments);

  useEffect(() => {
    const handlePaymentResult = async () => {
      const { MerchantTradeNo } = router.query;
      if (MerchantTradeNo) {
        await dispatch(getPaymentResultAsync(MerchantTradeNo as string));
      }
    };

    handlePaymentResult();
  }, [router.query, dispatch]);

  useEffect(() => {
    if (sendMerchantTradeNoSuccess) {
      router.push('/payment-result/payment-success');
    } else if (sendMerchantTradeNoFailed) {
      router.push('/payment-result/payment-failure');
    }
  }, [sendMerchantTradeNoSuccess, sendMerchantTradeNoFailed, router]);

  return <div>處理支付結果中...</div>;
};

export default PaymentResult;
