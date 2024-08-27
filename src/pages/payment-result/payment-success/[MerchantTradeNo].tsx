import { ArrowBackIcon, CheckCircleIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import { onlyDate, onlyTime } from '@helpers/date';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  getLinePayStatusAsync,
  getPaymentStatusAsync,
} from '@reducers/public/payments/actions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PaymentSuccess = () => {
  const router = useRouter();
  const { MerchantTradeNo } = router.query;
  const [animate, setAnimate] = useState(false);
  const dispatch = useAppDispatch();
  const {
    linePayStatus,
    paymentStatus,
    status: { getPaymentStatusLoading },
  } = useAppSelector((state) => state.publicPayments);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const titleColor = useColorModeValue('blue.500', 'blue.300');
  const iconBgColor = useColorModeValue('blue.50', 'blue.900');
  const detailBgColor = useColorModeValue('gray.50', 'gray.700');
  const labelColor = useColorModeValue('gray.500', 'gray.400');
  const valueColor = useColorModeValue('blue.500', 'blue.300');
  const buttonBgColor = useColorModeValue('blue.500', 'blue.300');
  const buttonHoverBgColor = useColorModeValue('blue.600', 'blue.400');

  useEffect(() => {
    localStorage.removeItem('logisticsSelection');
    localStorage.removeItem('order');
    localStorage.removeItem('paymentForm');
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    if (MerchantTradeNo) {
      dispatch(getLinePayStatusAsync(MerchantTradeNo as string));
      dispatch(getPaymentStatusAsync(MerchantTradeNo as string));
    }
  }, [MerchantTradeNo, dispatch]);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const renderPaymentDetails = () => {
    const provider =
      paymentStatus?.paymentProvider || linePayStatus?.paymentProvider;

    if (provider === 'EcPay') {
      return (
        <VStack spacing='15px' align='stretch'>
          <HStack
            justifyContent='space-between'
            alignItems='center'
            py='10px'
            borderBottom={`1px solid ${borderColor}`}
          >
            <Text color={labelColor} fontWeight='500'>
              訂單編號
            </Text>
            <Text fontWeight='600' color={valueColor}>
              {paymentStatus?.MerchantTradeNo}
            </Text>
          </HStack>
          <HStack
            justifyContent='space-between'
            alignItems='center'
            py='10px'
            borderBottom={`1px solid ${borderColor}`}
          >
            <Text color={labelColor} fontWeight='500'>
              付款金額
            </Text>
            <Text fontWeight='600' color={valueColor}>
              ${paymentStatus?.TotalAmount}
            </Text>
          </HStack>
          <HStack justifyContent='space-between' alignItems='center' py='10px'>
            <Text color={labelColor} fontWeight='500'>
              付款日期
            </Text>
            <Text fontWeight='600' color={valueColor}>
              {onlyDate(paymentStatus?.MerchantTradeDate) +
                onlyTime(paymentStatus?.MerchantTradeDate)}
              {paymentStatus?.MerchantTradeDate}
            </Text>
          </HStack>
        </VStack>
      );
    } else if (provider === 'LinePay') {
      return (
        <VStack spacing='15px' align='stretch'>
          <HStack
            justifyContent='space-between'
            alignItems='center'
            py='10px'
            borderBottom={`1px solid ${borderColor}`}
          >
            <Text color={labelColor} fontWeight='500'>
              訂單編號
            </Text>
            <Text fontWeight='600' color={valueColor}>
              {linePayStatus?.orderId}
            </Text>
          </HStack>
          <HStack
            justifyContent='space-between'
            alignItems='center'
            py='10px'
            borderBottom={`1px solid ${borderColor}`}
          >
            <Text color={labelColor} fontWeight='500'>
              付款金額
            </Text>
            <Text fontWeight='600' color={valueColor}>
              ${linePayStatus?.TotalAmount}
            </Text>
          </HStack>
          <HStack justifyContent='space-between' alignItems='center' py='10px'>
            <Text color={labelColor} fontWeight='500'>
              付款日期
            </Text>
            <Text fontWeight='600' color={valueColor}>
              {onlyDate(linePayStatus?.createdAt) +
                onlyTime(linePayStatus?.createdAt)}
            </Text>
          </HStack>
        </VStack>
      );
    }
    return null;
  };

  return (
    <LoadingLayout isLoading={getPaymentStatusLoading}>
      <Box
        maxW='500px'
        mx='auto'
        my='40px'
        p='40px 30px'
        textAlign='center'
        bg={bgColor}
        borderRadius='20px'
        boxShadow='0 10px 50px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.05)'
        opacity={animate ? 1 : 0}
        transform={animate ? 'translateY(0)' : 'translateY(30px)'}
        transition='opacity 0.6s ease-out, transform 0.6s ease-out'
      >
        <Heading
          fontSize='36px'
          fontWeight='700'
          mb='25px'
          color={titleColor}
          letterSpacing='-0.5px'
        >
          付款成功！
        </Heading>
        <Box
          bg={iconBgColor}
          w='120px'
          h='120px'
          borderRadius='60px'
          mx='auto'
          mb='30px'
          display='flex'
          justifyContent='center'
          alignItems='center'
          transform={
            animate ? 'scale(1) rotate(360deg)' : 'scale(0) rotate(0deg)'
          }
          transition='transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        >
          <Icon as={CheckCircleIcon} w='60px' h='60px' color={titleColor} />
        </Box>
        <Text
          fontSize='18px'
          color='gray.600'
          mb='35px'
          lineHeight='1.6'
          opacity={animate ? 1 : 0}
          transition='opacity 0.6s ease-out'
          transitionDelay='0.2s'
        >
          您的訂單已經成功處理。感謝您的購買，我們將盡快為您安排發貨！
        </Text>
        <Box
          bg={detailBgColor}
          borderRadius='15px'
          p='25px'
          mb='35px'
          boxShadow='inset 0 2px 4px rgba(0, 0, 0, 0.04)'
          opacity={animate ? 1 : 0}
          transform={animate ? 'translateY(0)' : 'translateY(20px)'}
          transition='opacity 0.6s ease-out, transform 0.6s ease-out'
          transitionDelay='0.3s'
        >
          {renderPaymentDetails()}
        </Box>
        <Button
          bg={buttonBgColor}
          color='white'
          px='28px'
          py='14px'
          borderRadius='50px'
          fontSize='18px'
          fontWeight='600'
          boxShadow='0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'
          transition='all 0.3s ease'
          _hover={{
            bg: buttonHoverBgColor,
            transform: 'translateY(-2px)',
            boxShadow:
              '0 7px 14px rgba(0, 0, 0, 0.12), 0 3px 6px rgba(0, 0, 0, 0.08)',
          }}
          opacity={animate ? 1 : 0}
          transform={animate ? 'translateY(0)' : 'translateY(20px)'}
          transitionDelay='0.4s'
          leftIcon={<ArrowBackIcon w='20px' h='20px' />}
          onClick={() => router.push('/')}
        >
          返回首頁
        </Button>
      </Box>
    </LoadingLayout>
  );
};

export default PaymentSuccess;
