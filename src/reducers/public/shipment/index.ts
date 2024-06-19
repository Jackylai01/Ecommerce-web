import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { createSlice } from '@reduxjs/toolkit';
import {
  PublicShipmentAsyncAction,
  publicShipmentCreateByTempTradeAsync,
  publicShipmentLogisticsAsync,
  publicShipmentUpdateTempTradeAsync,
} from './actions';

type PublicShipmentState = ApiState<PublicShipmentAsyncAction> & {
  ecPayLogisticsRes: any;
  updateTempTradeRes: any;
};

const initialState: PublicShipmentState = {
  ecPayLogisticsRes: null,
  updateTempTradeRes: null,
  ...newApiState<PublicShipmentState>(PublicShipmentAsyncAction),
};

const publicShipmentSlice = createSlice({
  name: ReducerName.PUBLIC_SHIPMENT,
  initialState,
  reducers: {
    resetShipmentState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(publicShipmentLogisticsAsync.fulfilled, (state, action) => {
      state.ecPayLogisticsRes = action.payload;
    });
    builder.addCase(
      publicShipmentUpdateTempTradeAsync.fulfilled,
      (state, action) => {
        state.updateTempTradeRes = action.payload;
      },
    );
    builder.addCase(
      publicShipmentCreateByTempTradeAsync.fulfilled,
      (state, action) => {
        state.ecPayLogisticsRes = action.payload;
      },
    );

    asyncMatcher(builder, ReducerName.PUBLIC_SHIPMENT);
  },
});

export const { resetShipmentState } = publicShipmentSlice.actions;
export default publicShipmentSlice.reducer;
