import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetPendingShipments } from '@services/admin/admin-shipments/admin-shipments';

export enum AdminShipmentActions {
  getPendingShipments = 'getPendingShipments',
}

export const getPendingShipmentsAsync = createAsyncThunk(
  `${ReducerName.ADMIN_SHIPMENTS}/${AdminShipmentActions.getPendingShipments}`,
  async (query: PagingQuery) => {
    const response = await apiGetPendingShipments(query);
    return response.result;
  },
);
