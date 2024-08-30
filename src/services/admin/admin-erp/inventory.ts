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
    formatQueryString('/zigong/erp/inventory', query),
  );

// 創建庫存記錄
export const apiCreateInventory = async (data: Inventory) =>
  postRequest<ApiResult<InventoryResponse>>('/zigong/erp/inventory', data);

// 獲取特定產品的庫存詳情
export const apiGetInventoryByProductId = async (productId: string) =>
  getRequest<ApiResult<InventoryResponse>>(
    `/zigong/erp/inventory/${productId}`,
  );

// 更新庫存信息
export const apiUpdateInventory = async (productId: string, data: Inventory) =>
  putRequest<ApiResult<InventoryResponse>>(
    `/zigong/erp/inventory/${productId}`,
    data,
  );

// 刪除庫存記錄
export const apiDeleteInventory = async (productId: string) =>
  deleteRequest<ApiResult<null>>(`/zigong/erp/inventory/${productId}`);

// 獲取庫存統計數據
export const apiGetInventoryStatistics = async () =>
  getRequest<ApiResult<any>>('/zigong/erp/inventory/statistics');

// 設置安全庫存相關設置
export const apiCreateSystemSafetyStock = async (data: any) =>
  postRequest<ApiResult<any>>('/zigong/erp/system-settings', data);

// 獲取設置
export const apiGetSystemSafetyStock = async () =>
  getRequest<ApiResult<any>>('/zigong/erp/system-settings');
