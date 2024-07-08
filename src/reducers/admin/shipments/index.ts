import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Metadata } from '@models/entities/shared/pagination';
import { ShipmentResponse } from '@models/responses/shipments.res';
import { createSlice } from '@reduxjs/toolkit';
import {
  AdminShipmentActions,
  createShipmentsAsync,
  getFormalShipmentsAsync,
  getPendingShipmentsAsync,
  printTradeShipmentsAsync,
  queryLogisticsAsync,
  updateShipmentStatusAsync,
  updateTempTradeAsync,
} from './actions';

type AdminShipmentState = ApiState<AdminShipmentActions> & {
  pendingList: ShipmentResponse[] | null;
  formalList: ShipmentResponse[] | null;
  FormalMetadata: Metadata | null;
  metadata: Metadata | null;
  shipments: any;
  printTradeShipments: any;
  queryLogistics: any;
  updateTempTrade: any;
};

const initialState: AdminShipmentState = {
  pendingList: null,
  formalList: null,
  shipments: null,
  queryLogistics: null,
  FormalMetadata: null,
  metadata: null,
  printTradeShipments: null,
  updateTempTrade: null,
  ...newApiState<AdminShipmentState>(AdminShipmentActions),
};

export const adminShipmentSlice = createSlice({
  name: ReducerName.ADMIN_SHIPMENTS,
  initialState,
  reducers: {
    resetShipmentState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(updateTempTradeAsync.fulfilled, (state, action) => {
      state.updateTempTrade = action.payload;
    });
    builder.addCase(getPendingShipmentsAsync.fulfilled, (state, action) => {
      state.pendingList = action.payload.data;
      state.metadata = action.payload.metadata;
    });
    builder.addCase(createShipmentsAsync.fulfilled, (state, action) => {
      state.shipments = action.payload;
    });
    builder.addCase(queryLogisticsAsync.fulfilled, (state, action) => {
      state.queryLogistics = action.payload;
    });
    builder.addCase(getFormalShipmentsAsync.fulfilled, (state, action) => {
      state.formalList = action.payload.data;
      state.FormalMetadata = action.payload.metadata;
    });
    builder.addCase(printTradeShipmentsAsync.fulfilled, (state, action) => {
      state.printTradeShipments = action.payload;
    });
    builder.addCase(updateShipmentStatusAsync.fulfilled, (state, action) => {
      const updatedShipment = action.payload;
      // 查找并更新formalList中的项目
      const index = state.formalList?.findIndex(
        (shipment) => shipment._id === updatedShipment._id,
      );
      if (index !== undefined && index >= 0 && state.formalList) {
        state.formalList[index] = updatedShipment;
      } else {
        state.formalList?.push(updatedShipment);
      }
      // 更新成功后重新获取formalList
      state.formalList = [...(state.formalList || [])];
    });
    asyncMatcher(builder, ReducerName.ADMIN_SHIPMENTS);
  },
});

export const { resetShipmentState } = adminShipmentSlice.actions;
export default adminShipmentSlice.reducer;
