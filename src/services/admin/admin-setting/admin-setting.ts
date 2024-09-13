import { ApiResult, postRequest } from '../../shared/api';

/**
 * 設定發票模式
 */
export const apiSetInvoiceIssuingMode = async (mode: any) => {
  return postRequest<ApiResult<string>>('/zigong/set-invoice-issuing-mode', {
    mode,
  });
};

/**
 * 設定購物模式
 */
export const apiSetShoppingMode = async (mode: any) => {
  return postRequest<ApiResult<string>>('/zigong/set-shopping-mode', { mode });
};
