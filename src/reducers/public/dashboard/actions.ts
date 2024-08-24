import { ReducerName } from '@enums/reducer-name';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiGetTodayEarnings,
  apiGetTodayLogins,
  apiGetTodayRegistrations,
  apiGetTotalSales,
} from '@services/public/dashboard/dashboard';

export enum DashboardAsyncAction {
  getTodayEarnings = 'getTodayEarnings',
  getTodayRegistrations = 'getTodayRegistrations',
  getTotalSales = 'getTotalSales',
  getTodayLogins = 'getTodayLogins',
}

/**
 * 取得今天商城賺的錢
 */
export const getTodayEarningsAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_DASHBOARD}/${DashboardAsyncAction.getTodayEarnings}`,
  async () => {
    const response = await apiGetTodayEarnings();
    return response.result.data;
  },
);

/**
 * 取得今天的會員註冊人數
 */
export const getTodayRegistrationsAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_DASHBOARD}/${DashboardAsyncAction.getTodayRegistrations}`,
  async () => {
    const response = await apiGetTodayRegistrations();
    return response.result.data;
  },
);

/**
 * 取得系統總銷售的金額
 */
export const getTotalSalesAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_DASHBOARD}${DashboardAsyncAction.getTotalSales}`,
  async () => {
    const response = await apiGetTotalSales();
    return response.result.data;
  },
);

/**
 * 取得今天的用戶登入數量
 */
export const getTodayLoginsAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_DASHBOARD}/${DashboardAsyncAction.getTodayLogins}`,
  async () => {
    const response = await apiGetTodayLogins();
    return response.result.data;
  },
);
