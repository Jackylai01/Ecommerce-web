import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import DotAnimationLoadingLayout from '@components/Layout/LoadingLayout/dotAnimationLoading';
import DeliveryInformation from '@components/public/DeliveryInformation';
import DiscountsSection from '@components/public/DiscountsSection';
import PaymentDetails from '@components/public/PaymentDetails';
import ReviewItems from '@components/public/ReviewItems';
import { calculateLogisticsFee } from '@fixtures/shipment';
import { calculateItemsTotal } from '@helpers/products';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { IDiscount } from '@models/responses/discounts';
import { getOrderByOrderIdAsync } from '@reducers/client/orders/actions';
import { getPublicDiscountsListAsync } from '@reducers/public/discounts/actions';
import { setOrder } from '@reducers/public/payments';
import {
  createOrderAsync,
  createPaymentAsync,
  getShipmentDataAsync,
  redirectToLogisticsSelectionAsync,
} from '@reducers/public/payments/actions';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const CheckoutPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { uniqueId, orderId } = router.query;
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [subTotal, setSubTotal] = useState<number>(0);
  const [logisticsFee, setLogisticsFee] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);
  const [freeShipping, setFreeShipping] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
    email: '',
    carrierType: '',
    carrierNum: '',
    taxId: '',
    donateCode: '',
  });

  const [isOrderButtonDisabled, setIsOrderButtonDisabled] = useState(false);
  const { checkout } = useAppSelector((state) => state.clientCart);
  const { list: publicDiscountList } = useAppSelector(
    (state) => state.publicDiscounts,
  );
  const {
    order,
    logisticsSelection,
    shipmentData: shipmentDataFromState,
    payment,
    status: {
      createOrderSuccess,
      createOrderLoading,
      createOrderFailed,
      getPaymentNotifyLoading,
      getShipmentDataLoading,
      createPaymentSuccess,
      createPaymentFailed,
      createPaymentLoading,
      redirectToLogisticsSelectionLoading,
    },
  } = useAppSelector((state) => state.publicPayments);
  const { userInfo } = useAppSelector((state) => state.clientAuth);
  const { getClientOrder } = useAppSelector((state) => state.clientOrders);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDiscountSelection = (
    e: React.ChangeEvent<HTMLInputElement>,
    discount: IDiscount,
  ) => {
    const { checked } = e.target;
    if (checked) {
      const sortedDiscounts = [
        ...selectedDiscounts,
        discount._id.toString(),
      ].sort((a, b) => {
        const discountA = publicDiscountList.find(
          (d: any) => d._id.toString() === a,
        );
        const discountB = publicDiscountList.find(
          (d: any) => d._id.toString() === b,
        );
        return (discountA?.priority ?? 0) - (discountB?.priority ?? 0);
      });

      if (sortedDiscounts.length > 2) {
        toast({
          title: '選擇的折扣超過上限',
          description: '您最多只能選擇兩個折扣',
          status: 'warning',
          isClosable: true,
        });
        return;
      }

      setSelectedDiscounts(sortedDiscounts);
    } else {
      setSelectedDiscounts((prev) =>
        prev.filter((id) => id !== discount._id.toString()),
      );
    }
  };

  const handleExclusiveDiscountSelection = (
    e: React.ChangeEvent<HTMLInputElement>,
    discount: IDiscount,
  ) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedDiscounts((prev) => [
        ...prev.filter((id) =>
          publicDiscountList.find(
            (d: any) => d._id === id && !d.combinableWithOtherDiscounts,
          ),
        ),
        discount._id.toString(),
      ]);
    } else {
      setSelectedDiscounts((prev) =>
        prev.filter((id) => id !== discount._id.toString()),
      );
    }
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo) {
      toast({
        title: '請先登錄',
        description: '您需要登錄才能創建訂單',
        status: 'warning',
        isClosable: true,
      });
      return;
    }
    setIsOrderButtonDisabled(true);
    const orderData = {
      userId: userInfo._id,
      products: checkout.map((item) => ({
        product: item._id,
        quantity: item.count,
        priceAtPurchase: item.price,
        name: item.name,
      })),
      totalPrice:
        subTotal - appliedDiscount + (freeShipping ? 0 : logisticsFee),
      discountsFee: appliedDiscount,
      shippingAddress: { ...formData },
      discountCodes: selectedDiscounts,
    };
    await dispatch(createOrderAsync(orderData));
  };

  const handlePaymentSubmit = async () => {
    if (order) {
      const paymentData = {
        orderId: order._id,
        TradeDesc: `購買於 我的商店 - 訂單編號 ${order._id}`,
        ItemName: order.products.map((item: any) => item.name).join('#'),
        ChoosePayment: 'ALL',
        TotalAmount: total,
      };
      await dispatch(createPaymentAsync(paymentData));
    }
  };

  useEffect(() => {
    if (order) {
      localStorage.setItem('order', JSON.stringify(order));
    }
  }, [order]);

  useEffect(() => {
    const savedOrder = localStorage.getItem('order');
    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder);
        dispatch(setOrder(parsedOrder));
      } catch (e) {
        console.error('Failed to parse saved order:', e);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (router.isReady) {
      if (orderId) {
        dispatch(getOrderByOrderIdAsync(orderId as string));
      }
      if (uniqueId) {
        dispatch(
          getShipmentDataAsync(
            Array.isArray(uniqueId) ? uniqueId[0] : uniqueId,
          ),
        );
      }
    }
  }, [router.isReady, router.query, dispatch, orderId, uniqueId]);

  useEffect(() => {
    if (orderId && getClientOrder) {
      setSubTotal(getClientOrder.totalPrice);
    } else {
      setSubTotal(calculateItemsTotal(checkout));
    }
  }, [checkout, orderId, getClientOrder]);

  useEffect(() => {
    if (shipmentDataFromState && order) {
      const logisticsFee = calculateLogisticsFee(
        shipmentDataFromState,
        subTotal,
      );
      setLogisticsFee(logisticsFee);
    }
  }, [shipmentDataFromState, subTotal, order]);

  useEffect(() => {
    dispatch(getPublicDiscountsListAsync());
  }, [dispatch]);

  useEffect(() => {
    let totalDiscount = 0;
    let combinableDiscounts: IDiscount[] = [];
    let freeShippingDiscount = false;

    publicDiscountList?.forEach((discount: IDiscount) => {
      if (
        discount.isActive &&
        selectedDiscounts.includes(discount._id.toString())
      ) {
        switch (discount.type) {
          case 'orderFreeShipping':
          case 'productFreeShipping':
            if (subTotal >= (discount.minimumAmount ?? 0)) {
              freeShippingDiscount = true;
            } else {
              toast({
                title: '免運費條件不符',
                description: `需消費滿 ${discount.minimumAmount} 元才可享受免運費`,
                status: 'warning',
                isClosable: true,
              });
              setSelectedDiscounts((prev) =>
                prev.filter((id) => id !== discount._id.toString()),
              );
            }
            break;
          case 'orderDiscount':
          case 'productDiscount':
          case 'orderCodeDiscount':
          case 'productCodeDiscount':
            if (discount.combinableWithOtherDiscounts) {
              combinableDiscounts.push(discount);
            } else {
              if (
                discount.value &&
                discount.calculationMethod === 'percentage'
              ) {
                totalDiscount += (subTotal * discount.value) / 100;
              } else if (discount.value) {
                totalDiscount += discount.value;
              }
            }
            break;
          default:
            break;
        }
      }
    });

    combinableDiscounts.forEach((discount) => {
      if (discount.value && discount.calculationMethod === 'percentage') {
        totalDiscount += (subTotal * discount.value) / 100;
      } else if (discount.value) {
        totalDiscount += discount.value;
      }
    });

    setAppliedDiscount(totalDiscount);
    setFreeShipping(freeShippingDiscount);
  }, [selectedDiscounts, publicDiscountList, subTotal, toast]);

  useEffect(() => {
    const newTotal =
      subTotal - appliedDiscount + (freeShipping ? 0 : logisticsFee);

    setTotal(newTotal);
  }, [subTotal, appliedDiscount, logisticsFee, freeShipping]);

  useEffect(() => {
    if (createPaymentSuccess && payment) {
      localStorage.setItem('paymentForm', payment);
      router.push('/payment');
    } else if (createPaymentFailed) {
      toast({
        title: '建立付款失敗',
        description: '請重試',
        status: 'error',
        isClosable: true,
      });
    }
  }, [createPaymentSuccess, createPaymentFailed, payment, router, toast]);

  useEffect(() => {
    if (logisticsSelection) {
      localStorage.setItem('logisticsSelection', logisticsSelection);
      router.push('/logistics');
    }
  }, [logisticsSelection, router]);

  const handleLogisticsSelection = async () => {
    if (order) {
      dispatch(redirectToLogisticsSelectionAsync(order._id));
    }
  };

  useEffect(() => {
    if (createOrderSuccess) {
      onOpen();
    }
    if (createOrderFailed) {
      toast({
        title: '建立訂單失敗',
        description: '請重試',
        status: 'error',
        isClosable: true,
      });
      setIsOrderButtonDisabled(false);
    }
  }, [createOrderSuccess, createOrderFailed, onOpen, toast]);

  useEffect(() => {
    onClose();
  }, [onClose]);

  const checkoutProductIds = checkout.map((item) => item._id);

  if (!checkout.length && !shipmentDataFromState) {
    return (
      <Flex justify='center' align='center' h='100vh'>
        <Box fontSize='2xl' fontWeight='bold'>
          您的購物車沒有商品
        </Box>
      </Flex>
    );
  }

  return (
    <DotAnimationLoadingLayout
      isLoading={
        createOrderLoading ||
        getShipmentDataLoading ||
        redirectToLogisticsSelectionLoading ||
        createPaymentLoading ||
        getPaymentNotifyLoading
      }
      loadingText='處理中...請稍後'
    >
      <Flex
        w={{ base: '100%', lg: '90%' }}
        mx='auto'
        flexDir={{ base: 'column', lg: 'row' }}
        gap='2rem'
        shadow='md'
      >
        <Stack spacing={10} w={{ base: '100%', lg: '60%' }}>
          <ReviewItems />
          <DeliveryInformation
            formData={formData}
            handleChange={handleChange}
          />
        </Stack>
        <Box w={{ base: '100%', lg: '40%' }}>
          <PaymentDetails
            total={total}
            subTotal={subTotal}
            logisticsFee={logisticsFee}
            appliedDiscount={appliedDiscount}
            handleOrderSubmit={handleOrderSubmit}
            handlePaymentSubmit={handlePaymentSubmit}
            isOrderButtonDisabled={isOrderButtonDisabled}
            uniqueId={uniqueId}
            freeShipping={freeShipping}
          />
          <DiscountsSection
            selectedDiscounts={selectedDiscounts}
            handleDiscountSelection={handleDiscountSelection}
            handleExclusiveDiscountSelection={handleExclusiveDiscountSelection}
            uniqueId={uniqueId}
            checkoutProducts={checkoutProductIds}
          />
        </Box>
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>選擇物流</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>請點擊以下按鈕選擇物流：</Box>
              <Button
                mt='1rem'
                colorScheme='teal'
                onClick={handleLogisticsSelection}
              >
                前往選擇物流
              </Button>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                關閉
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </DotAnimationLoadingLayout>
  );
};

export default CheckoutPage;
