import {
  InventoryReport,
  PurchaseOrderReport,
  SalesOrderReport,
} from '@models/responses/report.res';
import { ApiResult, getRequest } from '@services/shared/api';

// 生成庫存水平報告
export const apiGenerateInventoryLevelsReport = async () =>
  getRequest<ApiResult<InventoryReport[]>>('/erp/reports/inventory-levels');

// 生成進貨報告
export const apiGeneratePurchaseOrdersReport = async () =>
  getRequest<ApiResult<PurchaseOrderReport[]>>('/erp/reports/purchase-orders');

// 生成銷售報告
export const apiGenerateSalesOrdersReport = async () =>
  getRequest<ApiResult<SalesOrderReport[]>>('/erp/reports/sales-orders');
