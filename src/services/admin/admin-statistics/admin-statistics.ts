import { ApiResult, getRequest } from '../../shared/api';

/**
 * 獲取活躍用戶統計數據
 */
export const apiGetActiveUsersStatistics = async () => {
  return getRequest<ApiResult<any>>('/zigong/statistics/active-users');
};

/**
 * 獲取銷售概況數據
 */
export const apiGetSalesOverview = async () => {
  return getRequest<ApiResult<any>>('/zigong/statistics/sales-overview');
};

/**
 * 獲取特定訂單詳細信息
 */
export const apiGetOrderDetails = async (orderId: string) => {
  return getRequest<ApiResult<any>>(`/zigong/statistics/orders/${orderId}`);
};

/**
 * 獲取用戶統計數據
 */
export const apiGetUserStatistics = async (userId: string) => {
  return getRequest<ApiResult<any>>(
    `/zigong/statistics/users/${userId}/statistics`,
  );
};

/**
 * 獲取訂單概覽數據
 */
export const apiGetOrdersOverview = async () => {
  return getRequest<ApiResult<any>>('/zigong/statistics/orders-overview');
};
