import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Metadata } from '@models/entities/shared/pagination';
import { InventoryResponse } from '@models/responses/inventory.res';
import { createSlice } from '@reduxjs/toolkit';
import {
  adminERPInventoryAction,
  getInventoryAsync,
  getInventoryByProductIdAsync,
} from './actions';

type InventoryState = ApiState<adminERPInventoryAction> & {
  list: InventoryResponse[] | null;
  detail: InventoryResponse | null;
  metadata: Metadata | null;
};

const initialState: InventoryState = {
  list: null,
  detail: null,
  metadata: null,
  ...newApiState<InventoryState>(adminERPInventoryAction),
};

const inventorySlice = createSlice({
  name: ReducerName.ADMIN_ERP_INVENTORY,
  initialState,
  reducers: {
    resetInventoryState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getInventoryAsync.fulfilled, (state, action) => {
      state.list = action.payload.data;
      state.metadata = action.payload.metadata;
    });
    builder.addCase(getInventoryByProductIdAsync.fulfilled, (state, action) => {
      state.detail = action.payload;
    });
    asyncMatcher(builder, ReducerName.ADMIN_ERP_INVENTORY);
  },
});

export const { resetInventoryState } = inventorySlice.actions;
export default inventorySlice.reducer;
