import { ApiResult, getRequest } from '../../shared/api';

/**
 * 取得今天商城賺的錢
 */
export const apiGetTodayEarnings = async () =>
  getRequest<ApiResult<number>>('/api/zigong/dashboard/today-earnings');

/**
 * 取得今天的會員註冊人數
 */
export const apiGetTodayRegistrations = async () =>
  getRequest<ApiResult<number>>('/api/zigong/dashboard/today-registrations');

/**
 * 取得系統總銷售的金額
 */
export const apiGetTotalSales = async () =>
  getRequest<ApiResult<number>>('/api/zigong/dashboard/total-sales');

/**
 * 取得今天的用戶登入數量
 */
export const apiGetTodayLogins = async () =>
  getRequest<ApiResult<number>>('/api/zigong/dashboard/today-logins');
