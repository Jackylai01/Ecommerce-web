import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Metadata } from '@models/entities/shared/pagination';
import { InventoryResponse } from '@models/responses/inventory.res';
import { createSlice } from '@reduxjs/toolkit';
import {
  adminERPInventoryAction,
  createInventoryAsync,
  getInventoryAsync,
  getInventoryByProductIdAsync,
  getInventoryStatisticsAsync,
  updateInventoryAsync,
} from './actions';

type InventoryState = ApiState<adminERPInventoryAction> & {
  list: InventoryResponse[] | null;
  detail: InventoryResponse | null;
  inventory: InventoryResponse | null;
  updateInventory: InventoryResponse | null;
  metadata: Metadata | null;
  inventoryTurnoverRate: number | null;
  safetyStock: number | null;
  reorderPoints:
    | { productId: string; reorderPoint: number; productName: string }[]
    | null;
};

const initialState: InventoryState = {
  list: null,
  detail: null,
  inventory: null,
  updateInventory: null,
  metadata: null,
  inventoryTurnoverRate: null,
  safetyStock: null,
  reorderPoints: null,
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
    builder.addCase(createInventoryAsync.fulfilled, (state, action) => {
      state.inventory = action.payload;
    });
    builder.addCase(updateInventoryAsync.fulfilled, (state, action) => {
      state.updateInventory = action.payload;
    });
    builder.addCase(getInventoryStatisticsAsync.fulfilled, (state, action) => {
      state.inventoryTurnoverRate = action.payload.inventoryTurnoverRate;
      state.safetyStock = action.payload.safetyStock;
      state.reorderPoints = action.payload.reorderPoints;
    });
    asyncMatcher(builder, ReducerName.ADMIN_ERP_INVENTORY);
  },
});

export const { resetInventoryState } = inventorySlice.actions;
export default inventorySlice.reducer;
