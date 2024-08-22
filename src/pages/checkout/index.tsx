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
import { clientUserShoppingCreditsAsync } from '@reducers/client/shopping-credits/actions';

import { getPublicDiscountsListAsync } from '@reducers/public/discounts/actions';
import { setOrder } from '@reducers/public/payments';
import {
  createOrderAsync,
  createPaymentAsync,
  getShipmentDataAsync,
  linePayRequestAsync,
  redirectToLogisticsSelectionAsync,
} from '@reducers/public/payments/actions';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

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
  const [discountCode, setDiscountCode] = useState<string>('');
  const [discount, setDiscount] = useState<IDiscount | null>(null);
  const [useShoppingCredit, setUseShoppingCredit] = useState<boolean>(false); // 新增購物金勾選狀態
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
    paymentMethod: 'EcPay', // 新增付款方式
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
    linePayRequest,
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
      linePayRequestFailed,
      linePayRequestLoading,
      linePayRequestSuccess,
    },
    error: { createOrderError },
  } = useAppSelector((state) => state.publicPayments);

  const { userInfo } = useAppSelector((state) => state.clientAuth);
  const { getClientOrder } = useAppSelector((state) => state.clientOrders);

  const {
    list: shoppingCredits,
    status: { userShoppingCreditsLoading },
  } = useAppSelector((state) => state.clientShoppingCredits);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData({ ...formData, paymentMethod: value });
  };

  const handleDiscountCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountCode(e.target.value);
  };

  const handleApplyDiscountCode = () => {
    const appliedDiscount = publicDiscountList.find(
      (discount: any) =>
        discount.discountCodes &&
        discount.discountCodes.some((dc: any) => dc.code === discountCode),
    );

    if (!appliedDiscount) {
      toast({
        title: '無效的折扣碼',
        description: '找不到該折扣碼，請確認後再試。',
        status: 'error',
        isClosable: true,
      });
      return;
    }

    const discountCodeObject = appliedDiscount.discountCodes.find(
      (dc: any) => dc.code === discountCode,
    );

    if (!discountCodeObject) {
      toast({
        title: '無效的折扣碼',
        description: '找不到該折扣碼，請確認後再試。',
        status: 'error',
        isClosable: true,
      });
      return;
    }

    if (
      discountCodeObject.usageLimit !== -1 &&
      discountCodeObject.usageLimit <= discountCodeObject.usedCount
    ) {
      toast({
        title: '折扣碼已達使用次數上限',
        description: '該折扣碼已達使用次數上限，無法再使用。',
        status: 'error',
        isClosable: true,
      });
      return;
    }

    if (
      appliedDiscount.minimumAmount !== undefined &&
      subTotal < appliedDiscount.minimumAmount
    ) {
      toast({
        title: '未達最低消費金額',
        description: `該折扣碼的最低消費金額為 ${appliedDiscount.minimumAmount} 元，請增加購買金額後再試。`,
        status: 'error',
        isClosable: true,
      });
      return;
    }

    if (appliedDiscount.productId && appliedDiscount.productId.length > 0) {
      const eligibleProductIds = new Set(
        appliedDiscount.productId.map((id: any) => id.toString()),
      );
      const hasEligibleProduct = checkout.some((item) =>
        eligibleProductIds.has(item._id.toString()),
      );

      if (!hasEligibleProduct) {
        toast({
          title: '折扣碼不適用',
          description: '該折扣碼不適用於您購物車中的商品。',
          status: 'error',
          isClosable: true,
        });
        return;
      }
    }

    setDiscount(appliedDiscount);
    let discountAmount = 0;
    if (appliedDiscount.calculationMethod === 'percentage') {
      discountAmount = (subTotal * appliedDiscount.value) / 100;
    } else {
      discountAmount = appliedDiscount.value;
    }
    setAppliedDiscount(discountAmount);
    setTotal(subTotal - discountAmount + (freeShipping ? 0 : logisticsFee));
    localStorage.setItem('discountCode', discountCode);
    localStorage.setItem('appliedDiscount', discountAmount.toString());
    toast({
      title: '折扣碼已應用',
      description: `折扣名稱: ${appliedDiscount.name}, 折扣金額: ${discountAmount}`,
      status: 'success',
      isClosable: true,
    });
  };

  const handleDiscountSelection = (
    e: React.ChangeEvent<HTMLInputElement>,
    discount: IDiscount,
  ) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedDiscounts((prev) => [...prev, discount._id.toString()]);
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
    const savedDiscountCode = localStorage.getItem('discountCode') || '';

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

    // 合併 savedDiscountCode 和 selectedDiscounts
    const discountCodes = [...selectedDiscounts];
    if (savedDiscountCode) {
      discountCodes.push(savedDiscountCode);
    }

    const availableCredit =
      useShoppingCredit && shoppingCredits
        ? shoppingCredits.reduce((acc, credit) => acc + credit.amount, 0)
        : 0;

    const orderData = {
      userId: userInfo._id,
      products: checkout.map((item) => ({
        product: item._id,
        quantity: item.count,
        priceAtPurchase: item.price,
        name: item.name,
      })),
      totalPrice:
        subTotal -
        appliedDiscount +
        (freeShipping ? 0 : logisticsFee) -
        availableCredit, // 扣除購物金
      discountsFee: appliedDiscount,
      shippingAddress: { ...formData },
      discountCodes,
      paymentMethod: formData.paymentMethod, // 添加付款方式
      usedShoppingCredit: availableCredit, // 添加購物金
    };

    await dispatch(createOrderAsync(orderData));
  };

  const handlePaymentSubmit = async () => {
    if (order) {
      try {
        const discountCode =
          order.discountCodes && order.discountCodes.length > 0
            ? order.discountCodes[0]
            : '';

        const freeShipping = order.freeShipping || false;
        // 根據選擇的支付方式，處理相應的金流
        if (order.paymentMethod === 'LinePay') {
          const linePayData = {
            orderId: order._id,
            freeShipping: freeShipping,
          };

          // 發起 LinePay 付款請求
          dispatch(linePayRequestAsync(linePayData));
          if (linePayRequestSuccess && linePayRequest) {
            window.location.href = linePayRequest;
          }
        } else if (formData.paymentMethod === 'EcPay') {
          const paymentData = {
            orderId: order._id,
            TradeDesc: `購買於 我的商店 - 訂單編號 ${order._id}`,
            ItemName: order.products.map((item: any) => item.name).join('#'),
            ChoosePayment: 'ALL',
            TotalAmount: total, // 計算過折扣和免運費後的最終金額
            discountCodes: discountCode,
            freeShipping: freeShipping,
          };

          dispatch(createPaymentAsync(paymentData));
        }
      } catch (error) {
        console.error('Payment request error:', error);
        toast({
          title: '付款請求失敗',
          description: '請重試',
          status: 'error',
          isClosable: true,
        });
      }
    }
  };

  const handleCreditChange = () => {
    setUseShoppingCredit(!useShoppingCredit);
  };

  const clearLocalStorageDiscounts = useCallback(() => {
    localStorage.removeItem('discountCode');
    localStorage.removeItem('appliedDiscount');
  }, []);

  useEffect(() => {
    clearLocalStorageDiscounts();
    return () => {
      clearLocalStorageDiscounts();
    };
  }, [clearLocalStorageDiscounts]);

  useEffect(() => {
    if (createPaymentSuccess && payment) {
      localStorage.setItem('paymentForm', payment);
      clearLocalStorageDiscounts();
      router.push('/payment');
    } else if (createPaymentFailed) {
      clearLocalStorageDiscounts();
      toast({
        title: '建立付款失敗',
        description: '請重試',
        status: 'error',
        isClosable: true,
      });
    }
  }, [
    createPaymentSuccess,
    createPaymentFailed,
    payment,
    router,
    toast,
    clearLocalStorageDiscounts,
  ]);

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
    const savedDiscountCode = localStorage.getItem('discountCode');
    const savedAppliedDiscount = localStorage.getItem('appliedDiscount');
    if (savedDiscountCode) {
      setDiscountCode(savedDiscountCode);
    }
    if (savedAppliedDiscount) {
      const discountAmount = parseFloat(savedAppliedDiscount);
      setAppliedDiscount(discountAmount);
      setTotal(subTotal - discountAmount + (freeShipping ? 0 : logisticsFee));
    }
  }, [subTotal, freeShipping, logisticsFee]);

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
    if (userInfo) {
      dispatch(clientUserShoppingCreditsAsync(userInfo._id)); // 獲取用戶購物金狀態
    }
  }, [dispatch, userInfo]);

  const updateDiscountsAndShipping = useCallback(() => {
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
  }, [publicDiscountList, selectedDiscounts, subTotal]);

  useEffect(() => {
    updateDiscountsAndShipping();
  }, [
    selectedDiscounts,
    publicDiscountList,
    subTotal,
    updateDiscountsAndShipping,
  ]);

  useEffect(() => {
    const availableCredit =
      useShoppingCredit && shoppingCredits
        ? shoppingCredits.reduce((acc, credit) => acc + credit.amount, 0)
        : 0;
    const newTotal =
      subTotal -
      appliedDiscount +
      (freeShipping ? 0 : logisticsFee) -
      availableCredit;

    setTotal(newTotal);
  }, [
    subTotal,
    appliedDiscount,
    logisticsFee,
    freeShipping,
    useShoppingCredit,
    shoppingCredits,
  ]);

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
      const isCollection = formData.paymentMethod === 'COD' ? 'Y' : 'N';
      const response = await dispatch(
        redirectToLogisticsSelectionAsync({ orderId: order._id, isCollection }),
      );
      if (response?.payload?.data) {
        window.location.href = response.payload.data;
      }
    }
  };

  useEffect(() => {
    if (createOrderSuccess) {
      onOpen();
    }
    if (createOrderFailed) {
      toast({
        title: '建立訂單失敗',
        description: createOrderError,
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
        getPaymentNotifyLoading ||
        userShoppingCreditsLoading ||
        linePayRequestLoading
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
            handlePaymentMethodChange={handlePaymentMethodChange}
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
            discountCode={discountCode}
            handleDiscountCodeChange={handleDiscountCodeChange}
            handleApplyDiscountCode={handleApplyDiscountCode}
            discount={discount}
            paymentMethod={getClientOrder?.paymentMethod}
            shoppingCredits={shoppingCredits || []}
            useShoppingCredit={useShoppingCredit}
            handleCreditChange={handleCreditChange}
          />
          <DiscountsSection
            selectedDiscounts={selectedDiscounts}
            handleDiscountSelection={handleDiscountSelection}
            handleExclusiveDiscountSelection={handleExclusiveDiscountSelection}
            uniqueId={uniqueId}
            checkoutProducts={checkoutProductIds}
            subTotal={subTotal}
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
