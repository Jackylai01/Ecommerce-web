import { ReducerName } from '@enums/reducer-name';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiCreatePayments,
  apiGetPaymentStatus,
  apiGetShipmentData,
  apiLinePayConfirm,
  apiLinePayRequest,
  apiLinePayStatusAsync,
  apiPublicCancelPaymentOrder,
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
  linePayRequest = 'linePayRequest',
  linePayConfirm = 'linePayConfirm',
  getLinePayStatus = 'getLinePayStatus',
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
  async ({
    orderId,
    isCollection,
  }: {
    orderId: string;
    isCollection: string;
  }) => {
    const response = await apiPublicRedirectToLogisticsSelection(
      orderId,
      isCollection,
    );
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

/** 綠界金流付款 */
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

/**
 * 發起 LinePay 付款請求
 */
export const linePayRequestAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_PAYMENTS}/${PaymentAsyncAction.linePayRequest}`,

  async (body: any) => {
    const response = await apiLinePayRequest(body);
    return response.result.data;
  },
);

/**
 * 確認 LinePay 支付
 */
export const linePayConfirmAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_PAYMENTS}/${PaymentAsyncAction.linePayConfirm}`,
  async ({
    transactionId,
    orderId,
  }: {
    transactionId: string;
    orderId: string;
  }) => {
    const response = await apiLinePayConfirm(transactionId, orderId);
    return response.result;
  },
);

/**
 *  LinePay 支付失敗取消訂單
 */
export const linePayCancelPaymentOrderAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_PAYMENTS}/${PaymentAsyncAction.linePayConfirm}`,
  async (orderId: string) => {
    const response = await apiPublicCancelPaymentOrder(orderId);
    return response.result.data;
  },
);

export const getLinePayStatusAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_PAYMENTS}/${PaymentAsyncAction.getLinePayStatus}`,
  async (orderId: string) => {
    const response = await apiLinePayStatusAsync(orderId);
    return response.result.data;
  },
);
