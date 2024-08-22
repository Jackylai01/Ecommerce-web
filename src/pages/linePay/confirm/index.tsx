import { Box, Spinner, Text } from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

import { linePayConfirmAsync } from '@reducers/public/payments/actions';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const LinePayConfirmPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { transactionId, orderId } = router.query;

  const {
    status: {
      linePayConfirmFailed,
      linePayConfirmLoading,
      linePayConfirmSuccess,
    },
    error: { linePayConfirmError },
  } = useAppSelector((state) => state.publicPayments);

  useEffect(() => {
    if (transactionId && orderId) {
      dispatch(
        linePayConfirmAsync({
          transactionId: transactionId as string,
          orderId: orderId as string,
        }),
      );
    }
  }, [transactionId, orderId, dispatch]);

  useEffect(() => {
    if (linePayConfirmSuccess) {
      router.push(`/payment-result/payment-success/${orderId}`);
    } else if (linePayConfirmFailed) {
      router.push(`/payment-result/payment-failure/${orderId}`);
    }
  }, [linePayConfirmSuccess, linePayConfirmFailed, router, orderId]);

  if (linePayConfirmLoading) {
    return (
      <Box textAlign='center' py={20}>
        <Spinner size='lg' />
        <Text mt={4}>支付確認中，請稍候...</Text>
      </Box>
    );
  }

  if (linePayConfirmFailed) {
    return (
      <Box textAlign='center' py={20}>
        <Text color='red.500'>支付確認失敗：{linePayConfirmError}</Text>
      </Box>
    );
  }

  return null; // 或者顯示其他佈局
};

export default LinePayConfirmPage;
