import { formatQueryString } from '@helpers/query';
import { PagingQuery } from '@models/entities/shared/pagination';
import { Inventory, InventoryResponse } from '@models/responses/inventory.res';
import {
  ApiPaginationResult,
  ApiResult,
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '@services/shared/api';

// 獲取全部庫存記錄
export const apiGetInventory = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<InventoryResponse>>(
    formatQueryString('/erp/inventory', query),
  );

// 創建庫存記錄
export const apiCreateInventory = async (data: Inventory) =>
  postRequest<ApiResult<InventoryResponse>>('/erp/inventory', data);

// 獲取特定產品的庫存詳情
export const apiGetInventoryByProductId = async (productId: string) =>
  getRequest<ApiResult<InventoryResponse>>(`/erp/inventory/${productId}`);

// 更新庫存信息
export const apiUpdateInventory = async (productId: string, data: Inventory) =>
  putRequest<ApiResult<InventoryResponse>>(`/erp/inventory/${productId}`, data);

// 刪除庫存記錄
export const apiDeleteInventory = async (productId: string) =>
  deleteRequest<ApiResult<null>>(`/erp/inventory/${productId}`);
