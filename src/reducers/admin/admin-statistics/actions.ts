import { ReducerName } from '@enums/reducer-name';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiGetActiveUsersStatistics,
  apiGetOrderDetails,
  apiGetOrdersOverview,
  apiGetSalesOverview,
  apiGetUserStatistics,
} from '@services/admin/admin-statistics/admin-statistics';

export enum AdminStatisticsAction {
  getActiveUsersStatistics = 'getActiveUsersStatistics',
  getSalesOverview = 'getSalesOverview',
  getOrderDetails = 'getOrderDetails',
  getUserStatistics = 'getUserStatistics',
  getOrdersOverview = 'getOrdersOverview',
}

export const getActiveUsersStatisticsAsync = createAsyncThunk(
  `${ReducerName.ADMIN_STATISTICS}/${AdminStatisticsAction.getActiveUsersStatistics}`,
  async () => {
    const response = await apiGetActiveUsersStatistics();
    return response.result.data;
  },
);

export const getSalesOverviewAsync = createAsyncThunk(
  `${ReducerName.ADMIN_STATISTICS}/${AdminStatisticsAction.getSalesOverview}`,
  async () => {
    const response = await apiGetSalesOverview();
    return response.result.data;
  },
);

export const getOrderDetailsAsync = createAsyncThunk(
  `${ReducerName.ADMIN_STATISTICS}/${AdminStatisticsAction.getOrderDetails}`,
  async (orderId: string) => {
    const response = await apiGetOrderDetails(orderId);
    return response.result.data;
  },
);

export const getUserStatisticsAsync = createAsyncThunk(
  `${ReducerName.ADMIN_STATISTICS}/${AdminStatisticsAction.getUserStatistics}`,
  async (userId: string) => {
    const response = await apiGetUserStatistics(userId);
    return response.result.data;
  },
);

export const getOrdersOverviewAsync = createAsyncThunk(
  `${ReducerName.ADMIN_STATISTICS}/${AdminStatisticsAction.getOrdersOverview}`,
  async () => {
    const response = await apiGetOrdersOverview();
    return response.result.data;
  },
);
