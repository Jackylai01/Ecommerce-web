import {
  InventoryAlert,
  InventoryForecast,
  InventoryReport,
  InventoryTrends,
  IStockMovement,
  SalesOrderReport,
} from '@models/responses/report.res';
import { ApiResult, getRequest } from '@services/shared/api';

//  庫存概覽
export const apiGetInventoryOverviewReport = async () =>
  getRequest<ApiResult<InventoryReport>>('/erp/overview');

// 庫存歷史變動
export const apiGetInventoryMovementsReport = async () =>
  getRequest<ApiResult<IStockMovement[]>>('/erp/movements');

// 庫存預測
export const apiGetInventoryForecastReport = async () =>
  getRequest<ApiResult<InventoryForecast[]>>('/erp/forecast');

// 庫存警報
export const apiGetInventoryAlertsReport = async () =>
  getRequest<ApiResult<InventoryAlert[]>>('/erp/alerts');

// 庫存詳情
export const apiGetInventoryDetailsReport = async (productId: string) =>
  getRequest<ApiResult<SalesOrderReport[]>>(`/erp/details/${productId}`);

// 庫存趨勢分析
export const apiGetInventoryTrends = async () =>
  getRequest<ApiResult<InventoryTrends[]>>(`/erp/trends`);
