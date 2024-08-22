import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { createSlice } from '@reduxjs/toolkit';
import {
  PaymentAsyncAction,
  createOrderAsync,
  createPaymentAsync,
  getLinePayStatusAsync,
  getPaymentStatusAsync,
  getShipmentDataAsync,
  handleClientReplyAsync,
  linePayConfirmAsync,
  linePayRequestAsync,
  redirectToLogisticsSelectionAsync,
} from './actions';

type PaymentState = ApiState<PaymentAsyncAction> & {
  order: any;
  logisticsSelection: any;
  clientReply: any;
  payment: any;
  shipmentData: any;
  paymentStatus: any;
  linePayRequest: any;
  linePayConfirm: any;
  linePayStatus: any;
};

const initialState: PaymentState = {
  order: null,
  logisticsSelection: null,
  clientReply: null,
  payment: null,
  shipmentData: null,
  paymentStatus: null,
  linePayRequest: null,
  linePayConfirm: null,
  linePayStatus: null,
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
    builder.addCase(getShipmentDataAsync.fulfilled, (state, action) => {
      state.shipmentData = action.payload;
    });
    builder.addCase(getPaymentStatusAsync.fulfilled, (state, action) => {
      state.paymentStatus = action.payload;
    });
    builder.addCase(linePayRequestAsync.fulfilled, (state, action) => {
      state.linePayRequest = action.payload;
    });
    builder.addCase(linePayConfirmAsync.fulfilled, (state, action) => {
      state.linePayConfirm = action.payload;
    });
    builder.addCase(getLinePayStatusAsync.fulfilled, (state, action) => {
      state.linePayStatus = action.payload;
    });

    asyncMatcher(builder, ReducerName.PUBLIC_PAYMENTS);
  },
});

export const { resetPaymentState, setOrder } = paymentSlice.actions;
export default paymentSlice.reducer;
