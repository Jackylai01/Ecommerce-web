import { ReducerName } from '@enums/reducer-name';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiGenerateInventoryLevelsReport,
  apiGeneratePurchaseOrdersReport,
  apiGenerateSalesOrdersReport,
} from '@services/admin/admin-erp/reports';

export enum adminERPReportAction {
  getInventoryLevelsReport = 'getInventoryLevelsReport',
  getPurchaseOrdersReport = 'getPurchaseOrdersReport',
  getSalesOrdersReport = 'getSalesOrdersReport',
}

export const getInventoryLevelsReportAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_REPORT}/${adminERPReportAction.getInventoryLevelsReport}`,
  async () => {
    const response = await apiGenerateInventoryLevelsReport();
    return response.result.data;
  },
);

export const getPurchaseOrdersReportAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_REPORT}/${adminERPReportAction.getPurchaseOrdersReport}`,
  async () => {
    const response = await apiGeneratePurchaseOrdersReport();
    return response.result.data;
  },
);

export const getSalesOrdersReportAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_REPORT}/${adminERPReportAction.getSalesOrdersReport}`,
  async () => {
    const response = await apiGenerateSalesOrdersReport();
    return response.result.data;
  },
);
