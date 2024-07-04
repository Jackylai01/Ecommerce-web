import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiCreateShipments,
  apiGetPendingShipments,
} from '@services/admin/admin-shipments/admin-shipments';

export enum AdminShipmentActions {
  getPendingShipments = 'getPendingShipments',
  createShipments = 'createShipments',
}

export const getPendingShipmentsAsync = createAsyncThunk(
  `${ReducerName.ADMIN_SHIPMENTS}/${AdminShipmentActions.getPendingShipments}`,
  async (query: PagingQuery) => {
    const response = await apiGetPendingShipments(query);
    return response.result;
  },
);

/**
 * 建立正式訂單
 */

export const CreateShipmentsAsync = createAsyncThunk(
  `${ReducerName.ADMIN_SHIPMENTS}/${AdminShipmentActions.createShipments}`,
  async (data: any) => {
    const response = await apiCreateShipments(data);
    return response.result.data;
  },
);
