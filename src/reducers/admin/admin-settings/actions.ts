import { ReducerName } from '@enums/reducer-name';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiSetInvoiceIssuingMode,
  apiSetShoppingMode,
} from '@services/admin/admin-setting/admin-setting';

export enum AdminSettingAction {
  setInvoiceIssuingMode = 'setInvoiceIssuingMode',
  setShoppingMode = 'setShoppingMode',
}

export const setInvoiceIssuingModeAsync = createAsyncThunk(
  `${ReducerName.ADMIN_SETTING}/${AdminSettingAction.setInvoiceIssuingMode}`,
  async (mode: any) => {
    const response = await apiSetInvoiceIssuingMode(mode);
    return response.result.data;
  },
);

export const setShoppingModeAsync = createAsyncThunk(
  `${ReducerName.ADMIN_SETTING}/${AdminSettingAction.setShoppingMode}`,
  async (mode: any) => {
    const response = await apiSetShoppingMode(mode);
    return response.result.data;
  },
);
