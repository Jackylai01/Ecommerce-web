import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Metadata } from '@models/entities/shared/pagination';
import { ShipmentResponse } from '@models/responses/shipments.res';
import { createSlice } from '@reduxjs/toolkit';
import {
  AdminShipmentActions,
  CreateShipmentsAsync,
  getPendingShipmentsAsync,
} from './actions';

type AdminShipmentState = ApiState<AdminShipmentActions> & {
  pendingList: ShipmentResponse[] | null;
  metadata: Metadata | null;
  shipments: any;
};

const initialState: AdminShipmentState = {
  pendingList: null,
  shipments: null,
  metadata: null,
  ...newApiState<AdminShipmentState>(AdminShipmentActions),
};

export const adminShipmentSlice = createSlice({
  name: ReducerName.ADMIN_SHIPMENTS,
  initialState,
  reducers: {
    resetShipmentState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getPendingShipmentsAsync.fulfilled, (state, action) => {
      state.pendingList = action.payload.data;
      state.metadata = action.payload.metadata;
    });
    builder.addCase(CreateShipmentsAsync.fulfilled, (state, action) => {
      state.shipments = action.payload;
    });
    asyncMatcher(builder, ReducerName.ADMIN_SHIPMENTS);
  },
});

export const { resetShipmentState } = adminShipmentSlice.actions;
export default adminShipmentSlice.reducer;
