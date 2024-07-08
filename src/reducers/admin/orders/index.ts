import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Metadata } from '@models/entities/shared/pagination';
import { OrderDetail, ordersResponse } from '@models/responses/orders.res';
import { createSlice } from '@reduxjs/toolkit';
import {
  AdminOrdersAction,
  getAdminAllOrdersAsync,
  getAdminOrdersDetailAsync,
  updateOrderStatusAsync,
} from './actions';

type adminOrdersState = ApiState<AdminOrdersAction> & {
  list: ordersResponse[] | null;
  detail: OrderDetail | null;
  metadata: Metadata | null;
  updatedOrder: any;
};

const initialState: adminOrdersState = {
  list: null,
  detail: null,
  metadata: null,
  updatedOrder: null,
  ...newApiState<adminOrdersState>(AdminOrdersAction),
};

export const adminOrdersSlice = createSlice({
  name: ReducerName.ADMIN_ORDERS,
  initialState,
  reducers: {
    resetAdminOrdersState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getAdminAllOrdersAsync.fulfilled, (state, action) => {
      state.list = action.payload.data;
      state.metadata = action.payload.metadata;
    });
    builder.addCase(getAdminOrdersDetailAsync.fulfilled, (state, action) => {
      state.detail = action.payload;
    });
    builder.addCase(updateOrderStatusAsync.fulfilled, (state, action) => {
      state.updatedOrder = action.payload;
    });
    asyncMatcher(builder, ReducerName.ADMIN_ORDERS);
  },
});

export const { resetAdminOrdersState } = adminOrdersSlice.actions;
export default adminOrdersSlice.reducer;
