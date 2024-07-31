import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { Inventory } from '@models/responses/inventory.res';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiCreateInventory,
  apiCreateSystemSafetyStock,
  apiDeleteInventory,
  apiGetInventory,
  apiGetInventoryByProductId,
  apiGetInventoryStatistics,
  apiGetSystemSafetyStock,
  apiUpdateInventory,
} from '@services/admin/admin-erp/inventory';

export enum adminERPInventoryAction {
  getInventory = 'getInventory',
  createInventory = 'createInventory',
  getInventoryByProductId = 'getInventoryByProductId',
  updateInventory = 'updateInventory',
  deleteInventory = 'deleteInventory',
  getInventoryStatistics = 'getInventoryStatistics',
  createSystemSafetyStock = 'createSystemSafetyStock',
  getSystemSafetyStock = 'getSystemSafetyStock',
}

export const getInventoryAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_INVENTORY}/${adminERPInventoryAction.getInventory}`,
  async (query: PagingQuery) => {
    const response = await apiGetInventory(query);
    return response.result;
  },
);

export const createInventoryAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_INVENTORY}/${adminERPInventoryAction.createInventory}`,
  async (data: Inventory) => {
    const response = await apiCreateInventory(data);
    return response.result.data;
  },
);

export const getInventoryByProductIdAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_INVENTORY}/${adminERPInventoryAction.getInventoryByProductId}`,
  async (productId: string) => {
    const response = await apiGetInventoryByProductId(productId);
    return response.result.data;
  },
);

export const updateInventoryAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_INVENTORY}/${adminERPInventoryAction.updateInventory}`,
  async ({ productId, data }: { productId: string; data: Inventory }) => {
    const response = await apiUpdateInventory(productId, data);
    return response.result.data;
  },
);

export const deleteInventoryAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_INVENTORY}/${adminERPInventoryAction.deleteInventory}`,
  async (productId: string) => {
    const response = await apiDeleteInventory(productId);
    return response.result;
  },
);

export const getInventoryStatisticsAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_INVENTORY}/${adminERPInventoryAction.getInventoryStatistics}`,
  async () => {
    const response = await apiGetInventoryStatistics();
    return response.result.data;
  },
);

export const createSystemSafetyStockAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_INVENTORY}/${adminERPInventoryAction.createSystemSafetyStock}`,
  async (data: any) => {
    const response = await apiCreateSystemSafetyStock(data);
    return response.result.data;
  },
);

export const getSystemSafetyStockAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_INVENTORY}/${adminERPInventoryAction.getSystemSafetyStock}`,
  async () => {
    const response = await apiGetSystemSafetyStock();
    return response.result.data;
  },
);
