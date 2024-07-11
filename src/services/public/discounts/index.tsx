import { ApiResult, getRequest } from '@services/shared/api';

/**
 * 獲得個人資料
 */
export const apiGetPublicDiscounts = async () => {
  return getRequest<ApiResult<any>>('/public/discounts/client');
};
