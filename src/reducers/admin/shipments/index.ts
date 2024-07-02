import { ReducerName } from '@enums/reducer-name';
import { Metadata } from '@models/entities/shared/pagination';
import { ShipmentResponse } from '@models/responses/shipments.res';
import { createSlice } from '@reduxjs/toolkit';
import { getPendingShipmentsAsync } from './actions';

type AdminShipmentState = {
  pendingList: ShipmentResponse[] | null;
  metadata: Metadata | null;
};

const initialState: AdminShipmentState = {
  pendingList: null,
  metadata: null,
};

export const adminShipmentSlice = createSlice({
  name: ReducerName.ADMIN_SHIPMENTS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPendingShipmentsAsync.fulfilled, (state, action) => {
      state.pendingList = action.payload.data;
      state.metadata = action.payload.metadata;
    });
  },
});

export default adminShipmentSlice.reducer;
