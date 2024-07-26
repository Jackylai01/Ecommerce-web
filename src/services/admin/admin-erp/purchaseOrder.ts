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
  PurchaseOrder,
  PurchaseOrderResponse,
} from '@models/responses/purchaseOrder.res';

// 獲取全部進貨訂單
export const apiGetPurchaseOrders = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<PurchaseOrderResponse>>(
    formatQueryString('/erp/purchase-orders', query),
  );

// 創建進貨訂單
export const apiCreatePurchaseOrder = async (data: PurchaseOrder) =>
  postRequest<ApiResult<PurchaseOrder>>('/erp/purchase-orders', data);

// 獲取特定進貨訂單詳情
export const apiGetPurchaseOrderById = async (orderId: string) =>
  getRequest<ApiResult<PurchaseOrderResponse>>(
    `/erp/purchase-orders/${orderId}`,
  );

// 更新進貨訂單
export const apiUpdatePurchaseOrder = async (
  orderId: string,
  data: PurchaseOrder,
) =>
  putRequest<ApiResult<PurchaseOrder>>(`/erp/purchase-orders/${orderId}`, data);

// 刪除進貨訂單
export const apiDeletePurchaseOrder = async (orderId: string) =>
  deleteRequest<ApiResult<null>>(`/erp/purchase-orders/${orderId}`);
