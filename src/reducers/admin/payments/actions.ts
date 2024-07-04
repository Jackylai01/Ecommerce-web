import { ReducerName } from '@enums/reducer-name';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetQueryECPayOrder } from '@services/admin/admin-payments/admin-payments';

export enum AdminEcPayOrdersAction {
  getEcPayOrders = 'getEcPayOrders',
}

export const getAdminEcPayQueryAsync = createAsyncThunk(
  `${ReducerName.ADMIN_PAYMENTS}/${AdminEcPayOrdersAction.getEcPayOrders}`,
  async (MerchantTradeNo: string) => {
    const response = await apiGetQueryECPayOrder(MerchantTradeNo);
    return response.result.data;
  },
);
