import { ReducerName } from '@enums/reducer-name';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiCreatePayments,
  apiGetPaymentStatus,
  apiGetShipmentData,
  apiPublicCreateOrder,
  apiPublicHandleClientReply,
  apiPublicRedirectToLogisticsSelection,
} from '@services/public/payments/public-payments';

export enum PaymentAsyncAction {
  createOrder = 'createOrder',
  redirectToLogisticsSelection = 'redirectToLogisticsSelection',
  handleClientReply = 'handleClientReply',
  createPayment = 'createPayment',
  getPaymentNotify = 'getPaymentNotify',
  getShipmentData = 'getShipmentData',
  getPaymentStatus = 'getPaymentStatus',
}

export const createOrderAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_PAYMENTS}/${PaymentAsyncAction.createOrder}`,
  async (data: any) => {
    const response = await apiPublicCreateOrder(data);
    return response.result;
  },
);

export const redirectToLogisticsSelectionAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_PAYMENTS}/${PaymentAsyncAction.redirectToLogisticsSelection}`,
  async (orderId: string) => {
    const response = await apiPublicRedirectToLogisticsSelection(orderId);
    return response.result.data;
  },
);

export const handleClientReplyAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_PAYMENTS}/${PaymentAsyncAction.handleClientReply}`,
  async ({ orderId, ResultData }: { orderId: string; ResultData: any }) => {
    const response = await apiPublicHandleClientReply(orderId, ResultData);
    return response.result.data;
  },
);

export const createPaymentAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_PAYMENTS}/${PaymentAsyncAction.createPayment}`,
  async (data: any) => {
    const response = await apiCreatePayments(data);
    return response.result.data;
  },
);

export const getShipmentDataAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_PAYMENTS}/${PaymentAsyncAction.getShipmentData}`,
  async (uniqueId: string) => {
    const response = await apiGetShipmentData(uniqueId);
    return response.result.data;
  },
);

export const getPaymentStatusAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_PAYMENTS}/${PaymentAsyncAction.getPaymentStatus}`,
  async (MerchantTradeNo: string) => {
    const response = await apiGetPaymentStatus(MerchantTradeNo);
    return response.result.data;
  },
);
