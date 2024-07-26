import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Metadata } from '@models/entities/shared/pagination';
import { SalesOrderResponse } from '@models/responses/salesOrder.res';
import { createSlice } from '@reduxjs/toolkit';
import {
  adminERPSalesOrderAction,
  getSalesOrderByIdAsync,
  getSalesOrdersAsync,
} from './actions';

type SalesOrderState = ApiState<adminERPSalesOrderAction> & {
  list: SalesOrderResponse[] | null;
  detail: SalesOrderResponse | null;
  metadata: Metadata | null;
};

const initialState: SalesOrderState = {
  list: null,
  detail: null,
  metadata: null,
  ...newApiState<SalesOrderState>(adminERPSalesOrderAction),
};

const salesOrderSlice = createSlice({
  name: ReducerName.ADMIN_ERP_SALESORDER,
  initialState,
  reducers: {
    resetSalesOrderState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getSalesOrdersAsync.fulfilled, (state, action) => {
      state.list = action.payload.data;
      state.metadata = action.payload.metadata;
    });
    builder.addCase(getSalesOrderByIdAsync.fulfilled, (state, action) => {
      state.detail = action.payload;
    });
    asyncMatcher(builder, ReducerName.ADMIN_ERP_SALESORDER);
  },
});

export const { resetSalesOrderState } = salesOrderSlice.actions;
export default salesOrderSlice.reducer;
