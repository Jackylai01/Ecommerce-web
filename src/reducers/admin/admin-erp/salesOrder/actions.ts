import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiCreateSalesOrder,
  apiDeleteSalesOrder,
  apiGetSalesOrderById,
  apiGetSalesOrders,
  apiUpdateSalesOrder,
} from '@services/admin/admin-erp/salesOrder';

export enum adminERPSalesOrderAction {
  getSalesOrders = 'getSalesOrders',
  createSalesOrder = 'createSalesOrder',
  getSalesOrderById = 'getSalesOrderById',
  updateSalesOrder = 'updateSalesOrder',
  deleteSalesOrder = 'deleteSalesOrder',
}

export const getSalesOrdersAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_SALESORDER}/${adminERPSalesOrderAction.getSalesOrders}`,
  async (query: PagingQuery) => {
    const response = await apiGetSalesOrders(query);
    return response.res.data;
  },
);

export const createSalesOrderAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_SALESORDER}/${adminERPSalesOrderAction.createSalesOrder}`,
  async (data: any) => {
    const response = await apiCreateSalesOrder(data);
    return response.result;
  },
);

export const getSalesOrderByIdAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_SALESORDER}/${adminERPSalesOrderAction.getSalesOrderById}`,
  async (orderId: string) => {
    const response = await apiGetSalesOrderById(orderId);
    return response.result.data;
  },
);

export const updateSalesOrderAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_SALESORDER}/${adminERPSalesOrderAction.updateSalesOrder}`,
  async ({ orderId, data }: { orderId: string; data: any }) => {
    const response = await apiUpdateSalesOrder(orderId, data);
    return response.result;
  },
);

export const deleteSalesOrderAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_SALESORDER}/${adminERPSalesOrderAction.deleteSalesOrder}`,
  async (orderId: string) => {
    const response = await apiDeleteSalesOrder(orderId);
    return response.result;
  },
);
