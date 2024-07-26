import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { PurchaseOrder } from '@models/responses/purchaseOrder.res';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiDeletePurchaseOrder,
  apiGetPurchaseOrderById,
  apiGetPurchaseOrders,
  apiUpdatePurchaseOrder,
} from '@services/admin/admin-erp/purchaseOrder';

export enum adminERPPurchaseOrderAction {
  getPurchaseOrders = 'getPurchaseOrders',
  createPurchaseOrder = 'createPurchaseOrder',
  getPurchaseOrderById = 'getPurchaseOrderById',
  updatePurchaseOrder = 'updatePurchaseOrder',
  deletePurchaseOrder = 'deletePurchaseOrder',
}

export const getPurchaseOrdersAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_PURCHASEORDER}/${adminERPPurchaseOrderAction.getPurchaseOrders}`,
  async (query: PagingQuery) => {
    const response = await apiGetPurchaseOrders(query);
    return response.result;
  },
);

export const createPurchaseOrderAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_PURCHASEORDER}/${adminERPPurchaseOrderAction.createPurchaseOrder}`,
  async (query: PagingQuery) => {
    const response = await apiGetPurchaseOrders(query);
    return response.result;
  },
);

export const getPurchaseOrderByIdAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_PURCHASEORDER}/${adminERPPurchaseOrderAction.getPurchaseOrderById}`,
  async (orderId: string) => {
    const response = await apiGetPurchaseOrderById(orderId);
    return response.result.data;
  },
);

export const updatePurchaseOrderAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_PURCHASEORDER}/${adminERPPurchaseOrderAction.updatePurchaseOrder}`,
  async ({ orderId, data }: { orderId: string; data: PurchaseOrder }) => {
    const response = await apiUpdatePurchaseOrder(orderId, data);
    return response.result;
  },
);

export const deletePurchaseOrderAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_PURCHASEORDER}/${adminERPPurchaseOrderAction.deletePurchaseOrder}`,
  async (orderId: string) => {
    const response = await apiDeletePurchaseOrder(orderId);
    return response.result;
  },
);
