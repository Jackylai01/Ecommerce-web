import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { createSlice } from '@reduxjs/toolkit';
import { AdminEcPayOrdersAction, getAdminEcPayQueryAsync } from './actions';

type adminPaymentsState = ApiState<AdminEcPayOrdersAction> & {
  ecPayOrders: ecPayOrdersResponse | null;
};

const initialState: adminPaymentsState = {
  ecPayOrders: null,

  ...newApiState<adminPaymentsState>(AdminEcPayOrdersAction),
};

const adminPaymentSlice = createSlice({
  name: ReducerName.ADMIN_PAYMENTS,
  initialState,
  reducers: {
    resetAdminPaymentState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getAdminEcPayQueryAsync.fulfilled, (state, action) => {
      state.ecPayOrders = action.payload;
    });
    asyncMatcher(builder, ReducerName.ADMIN_PAYMENTS);
  },
});

export const { resetAdminPaymentState } = adminPaymentSlice.actions;
export default adminPaymentSlice.reducer;
