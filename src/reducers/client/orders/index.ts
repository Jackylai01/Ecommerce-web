import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Metadata } from '@models/entities/shared/pagination';
import { ordersResponse } from '@models/responses/orders.res';
import { createSlice } from '@reduxjs/toolkit';
import { clientOrdersAction, getClientOrdersAsync } from './actions';

type clientOrdersState = ApiState<clientOrdersAction> & {
  list: ordersResponse[] | null;
  metadata: Metadata | null;
};

const initialState: clientOrdersState = {
  list: null,
  metadata: null,
  ...newApiState<clientOrdersState>(clientOrdersAction),
};

export const clientOrdersSlice = createSlice({
  name: ReducerName.CLIENT_ORDERS,
  initialState,
  reducers: {
    resetClientOrdersState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getClientOrdersAsync.fulfilled, (state, action) => {
      state.list = action.payload.data;
      state.metadata = action.payload.metadata;
    });
    asyncMatcher(builder, ReducerName.CLIENT_ORDERS);
  },
});

export const { resetClientOrdersState } = clientOrdersSlice.actions;
export default clientOrdersSlice.reducer;
