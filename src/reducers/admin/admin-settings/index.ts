import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AdminSettingAction,
  setInvoiceIssuingModeAsync,
  setShoppingModeAsync,
} from './actions';

type AdminSettingState = ApiState<AdminSettingAction> & {
  invoiceIssuingMode: 'immediate' | 'delayed' | null;
  shoppingMode: 'memberOnly' | 'guestAllowed' | null;
};

const initialState: AdminSettingState = {
  invoiceIssuingMode: null,
  shoppingMode: null,
  ...newApiState<AdminSettingState>(AdminSettingAction),
};

export const adminSettingSlice = createSlice({
  name: ReducerName.ADMIN_SETTING,
  initialState,
  reducers: {
    resetSettingStatus: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(
      setInvoiceIssuingModeAsync.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.invoiceIssuingMode = action.payload as 'immediate' | 'delayed';
      },
    );
    builder.addCase(
      setShoppingModeAsync.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.shoppingMode = action.payload as 'memberOnly' | 'guestAllowed';
      },
    );
    asyncMatcher(builder, ReducerName.ADMIN_SETTING);
  },
});

export const { resetSettingStatus } = adminSettingSlice.actions;

export default adminSettingSlice.reducer;
