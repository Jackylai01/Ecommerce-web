import { ReducerName } from '@enums/reducer-name';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiGetInventoryAlertsReport,
  apiGetInventoryDetailsReport,
  apiGetInventoryForecastReport,
  apiGetInventoryMovementsReport,
  apiGetInventoryOverviewReport,
  apiGetInventoryTrends,
} from '@services/admin/admin-erp/reports';

export enum adminERPReportAction {
  getInventoryOverviewReport = 'getInventoryOverviewReport',
  getInventoryMovementsReport = 'getInventoryMovementsReport',
  getInventoryForecastReport = 'getInventoryForecastReport',
  getInventoryAlertsReport = 'getInventoryAlertsReport',
  getInventoryDetailsReport = 'getInventoryDetailsReport',
  getInventoryTrendsReport = 'getInventoryTrendsReport',
}

export const getInventoryOverviewReportAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_REPORT}/${adminERPReportAction.getInventoryOverviewReport}`,
  async () => {
    const response = await apiGetInventoryOverviewReport();
    return response.result.data;
  },
);

export const getInventoryMovementsReportAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_REPORT}/${adminERPReportAction.getInventoryMovementsReport}`,
  async () => {
    const response = await apiGetInventoryMovementsReport();
    return response.result.data;
  },
);

export const getInventoryForecastReportAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_REPORT}/${adminERPReportAction.getInventoryForecastReport}`,
  async () => {
    const response = await apiGetInventoryForecastReport();
    return response.result.data;
  },
);

export const getInventoryAlertsReportAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_REPORT}/${adminERPReportAction.getInventoryAlertsReport}`,
  async () => {
    const response = await apiGetInventoryAlertsReport();
    return response.result.data;
  },
);

export const getInventoryDetailsReportAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_REPORT}/${adminERPReportAction.getInventoryDetailsReport}`,
  async (productId: string) => {
    const response = await apiGetInventoryDetailsReport(productId);
    return response.result.data;
  },
);

export const getInventoryTrendsReportAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_REPORT}/${adminERPReportAction.getInventoryTrendsReport}`,
  async () => {
    const response = await apiGetInventoryTrends();
    return response.result.data;
  },
);
