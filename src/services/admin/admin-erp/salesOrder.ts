import {
  ApiPaginationResult,
  ApiResult,
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '@services/shared/api';

import { formatQueryString } from '@helpers/query';
import { PagingQuery } from '@models/entities/shared/pagination';
import {
  SalesOrder,
  SalesOrderResponse,
} from '@models/responses/salesOrder.res';

// 獲取全部銷售訂單
export const apiGetSalesOrders = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<SalesOrderResponse>>(
    formatQueryString('/erp/sales-orders', query),
  );

// 創建銷售訂單
export const apiCreateSalesOrder = async (data: SalesOrder) =>
  postRequest<ApiResult<SalesOrder>>('/erp/sales-orders', data);

// 獲取特定銷售訂單詳情
export const apiGetSalesOrderById = async (orderId: string) =>
  getRequest<ApiResult<SalesOrderResponse>>(`/erp/sales-orders/${orderId}`);

// 更新銷售訂單
export const apiUpdateSalesOrder = async (orderId: string, data: SalesOrder) =>
  putRequest<ApiResult<SalesOrder>>(`/erp/sales-orders/${orderId}`, data);

// 刪除銷售訂單
export const apiDeleteSalesOrder = async (orderId: string) =>
  deleteRequest<ApiResult<null>>(`/erp/sales-orders/${orderId}`);
