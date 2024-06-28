import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { createSlice } from '@reduxjs/toolkit';
import {
  PaymentAsyncAction,
  createOrderAsync,
  createPaymentAsync,
  getPaymentNotifyAsync,
  getPaymentResultAsync,
  getShipmentDataAsync,
  handleClientReplyAsync,
  redirectToLogisticsSelectionAsync,
} from './actions';

type PaymentState = ApiState<PaymentAsyncAction> & {
  order: any;
  logisticsSelection: any;
  clientReply: any;
  payment: any;
  paymentNotify: any;
  shipmentData: any;
  MerchantTradeNo: any;
};

const initialState: PaymentState = {
  order: null,
  logisticsSelection: null,
  clientReply: null,
  payment: null,
  paymentNotify: null,
  shipmentData: null,
  MerchantTradeNo: null,
  ...newApiState<PaymentState>(PaymentAsyncAction),
};

const paymentSlice = createSlice({
  name: ReducerName.PUBLIC_PAYMENTS,
  initialState,
  reducers: {
    resetPaymentState: () => initialState,
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrderAsync.fulfilled, (state, action) => {
      state.order = action.payload;
    });
    builder.addCase(
      redirectToLogisticsSelectionAsync.fulfilled,
      (state, action) => {
        state.logisticsSelection = action.payload;
      },
    );
    builder.addCase(handleClientReplyAsync.fulfilled, (state, action) => {
      state.clientReply = action.payload;
    });
    builder.addCase(createPaymentAsync.fulfilled, (state, action) => {
      state.payment = action.payload;
    });
    builder.addCase(getPaymentNotifyAsync.fulfilled, (state, action) => {
      state.paymentNotify = action.payload;
    });
    builder.addCase(getPaymentResultAsync.fulfilled, (state, action) => {
      state.MerchantTradeNo = action.payload;
    });
    builder.addCase(getShipmentDataAsync.fulfilled, (state, action) => {
      state.shipmentData = action.payload;
    });

    asyncMatcher(builder, ReducerName.PUBLIC_PAYMENTS);
  },
});

export const { resetPaymentState, setOrder } = paymentSlice.actions;
export default paymentSlice.reducer;
