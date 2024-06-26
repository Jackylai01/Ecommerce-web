import { ReducerName } from '@enums/reducer-name';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiCreatePayments,
  apiGetPaymentNotify,
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
  async (data: any) => {
    const response = await apiPublicHandleClientReply(data);
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

export const getPaymentNotifyAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_PAYMENTS}/${PaymentAsyncAction.getPaymentNotify}`,
  async (data: any) => {
    const response = await apiGetPaymentNotify(data);
    return response.result.data;
  },
);
