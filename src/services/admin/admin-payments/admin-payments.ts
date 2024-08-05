import { ecPayOrdersResponse } from '@models/responses/ecpayOrders';
import { ApiResult, postFormRequest } from '@services/shared/api';

/**
 * 獲取綠界金流狀態(對帳)
 */

export const apiGetQueryECPayOrder = async (MerchantTradeNo: string) =>
  postFormRequest<ApiResult<ecPayOrdersResponse>>('/ecpay/query-order', {
    MerchantTradeNo,
  });
