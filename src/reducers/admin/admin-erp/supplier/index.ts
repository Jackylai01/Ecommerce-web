import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Metadata } from '@models/entities/shared/pagination';
import { SupplierResponse } from '@models/responses/supplier';
import { createSlice } from '@reduxjs/toolkit';
import {
  adminERPSupplierAction,
  createSuppliersAsync,
  getSuppliersAsync,
} from './actions';

type SupplierState = ApiState<adminERPSupplierAction> & {
  list: SupplierResponse[] | null;
  detail: SupplierResponse | null;
  metadata: Metadata | null;
};

const initialState: SupplierState = {
  list: null,
  detail: null,
  metadata: null,
  ...newApiState<SupplierState>(adminERPSupplierAction),
};

const suppliersSlice = createSlice({
  name: ReducerName.ADMIN_ERP_SUPPLIER,
  initialState,
  reducers: {
    resetSuppliers: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getSuppliersAsync.fulfilled, (state, action) => {
      state.list = action.payload.data;
      state.metadata = action.payload.metadata;
    });
    builder.addCase(createSuppliersAsync.fulfilled, (state, action) => {
      state.detail = action.payload;
    });
    asyncMatcher(builder, ReducerName.ADMIN_ERP_SUPPLIER);
  },
});

export const { resetSuppliers } = suppliersSlice.actions;
export default suppliersSlice.reducer;
