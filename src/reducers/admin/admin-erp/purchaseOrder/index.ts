import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { Metadata } from '@models/entities/shared/pagination';
import { PurchaseOrderResponse } from '@models/responses/purchaseOrder.res';
import { createSlice } from '@reduxjs/toolkit';

import { ReducerName } from '@enums/reducer-name';
import { ApiState } from '@models/api/api-state';
import {
  adminERPPurchaseOrderAction,
  getPurchaseOrderByIdAsync,
  getPurchaseOrdersAsync,
} from './actions';

type PurchaseOrderState = ApiState<adminERPPurchaseOrderAction> & {
  list: PurchaseOrderResponse[] | null;
  detail: PurchaseOrderResponse | null;
  metadata: Metadata | null;
};

const initialState: PurchaseOrderState = {
  list: null,
  detail: null,
  metadata: null,
  ...newApiState<PurchaseOrderState>(adminERPPurchaseOrderAction),
};

const purchaseOrderSlice = createSlice({
  name: ReducerName.ADMIN_ERP_PURCHASEORDER,
  initialState,
  reducers: {
    resetPurchaseOrderState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getPurchaseOrdersAsync.fulfilled, (state, action) => {
      state.list = action.payload.data;
      state.metadata = action.payload.metadata;
    });
    builder.addCase(getPurchaseOrderByIdAsync.fulfilled, (state, action) => {
      state.detail = action.payload;
    });
    asyncMatcher(builder, ReducerName.ADMIN_ERP_PURCHASEORDER);
  },
});

export const { resetPurchaseOrderState } = purchaseOrderSlice.actions;
export default purchaseOrderSlice.reducer;
