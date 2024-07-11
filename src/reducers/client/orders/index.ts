import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Metadata } from '@models/entities/shared/pagination';
import { ordersResponse } from '@models/responses/orders.res';
import { createSlice } from '@reduxjs/toolkit';
import {
  cancelClientOrderAsync,
  clientOrdersAction,
  getClientOrderHistoryAsync,
  getClientOrdersAsync,
  getOrderByOrderIdAsync,
} from './actions';

type clientOrdersState = ApiState<clientOrdersAction> & {
  list: ordersResponse[] | null;
  metadata: Metadata | null;
  historyList: ordersResponse[] | null;
  historyMetadata: Metadata | null;
  cancelOrder: any;
  getClientOrder: any;
};

const initialState: clientOrdersState = {
  list: null,
  metadata: null,
  historyList: null,
  historyMetadata: null,
  cancelOrder: null,
  getClientOrder: null,
  ...newApiState<clientOrdersState>(clientOrdersAction),
};

export const clientOrdersSlice = createSlice({
  name: ReducerName.CLIENT_ORDERS,
  initialState,
  reducers: {
    resetClientOrdersState: () => initialState,
    resetCancelOrderState: (state) => {
      state.status.cancelOrderSuccess = false;
      state.status.cancelOrderFailed = false;
      state.status.cancelOrderFailed = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getClientOrdersAsync.fulfilled, (state, action) => {
      state.list = action.payload.data;
      state.metadata = action.payload.metadata;
    });
    builder.addCase(getClientOrderHistoryAsync.fulfilled, (state, action) => {
      state.historyList = action.payload.data;
      state.historyMetadata = action.payload.metadata;
    });
    builder.addCase(cancelClientOrderAsync.fulfilled, (state, action) => {
      state.cancelOrder = action.payload;
    });
    builder.addCase(getOrderByOrderIdAsync.fulfilled, (state, action) => {
      state.getClientOrder = action.payload;
    });
    asyncMatcher(builder, ReducerName.CLIENT_ORDERS);
  },
});

export const { resetClientOrdersState, resetCancelOrderState } =
  clientOrdersSlice.actions;
export default clientOrdersSlice.reducer;
