import { ReducerName } from '@enums/reducer-name';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetQueryECPayOrder } from '@services/admin/admin-payments/admin-payments';

export enum AdminEcPayOrdersAction {
  getEcPayOrders = 'getEcPayOrders',
}

/** 向綠界獲取金流訂單狀態進行對帳-並且不用串接，整合物流列表 */
export const getAdminEcPayQueryAsync = createAsyncThunk(
  `${ReducerName.ADMIN_PAYMENTS}/${AdminEcPayOrdersAction.getEcPayOrders}`,
  async (MerchantTradeNo: string) => {
    const response = await apiGetQueryECPayOrder(MerchantTradeNo);
    return response.result.data;
  },
);
