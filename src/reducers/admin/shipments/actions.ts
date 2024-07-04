import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiCreateShipments,
  apiGetFormalShipments,
  apiGetPendingShipments,
  apiPrintTradeShipments,
  apiQueryLogistics,
} from '@services/admin/admin-shipments/admin-shipments';

export enum AdminShipmentActions {
  getPendingShipments = 'getPendingShipments',
  createShipments = 'createShipments',
  queryLogistics = 'queryLogistics',
  getFormalShipments = 'getFormalShipments',
  printTrade = 'printTrade',
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

export const createShipmentsAsync = createAsyncThunk(
  `${ReducerName.ADMIN_SHIPMENTS}/${AdminShipmentActions.createShipments}`,
  async (data: any) => {
    const response = await apiCreateShipments(data);
    return response.result.data;
  },
);

/**
 * 查詢正式訂單-綠界獲取
 */

export const queryLogisticsAsync = createAsyncThunk(
  `${ReducerName.ADMIN_SHIPMENTS}/${AdminShipmentActions.queryLogistics}`,
  async (data: any) => {
    const response = await apiQueryLogistics(data);
    return response.result.data;
  },
);

/**
 * 查詢正式訂單列表-資料庫獲取
 */

export const getFormalShipmentsAsync = createAsyncThunk(
  `${ReducerName.ADMIN_SHIPMENTS}/${AdminShipmentActions.getFormalShipments}`,
  async (query: PagingQuery) => {
    const response = await apiGetFormalShipments(query);
    return response.result;
  },
);

/**
 * 列印物流託運單
 */

export const printTradeShipmentsAsync = createAsyncThunk(
  `${ReducerName.ADMIN_SHIPMENTS}/${AdminShipmentActions.printTrade}`,
  async ({
    LogisticsID,
    LogisticsSubType,
  }: {
    LogisticsID: string;
    LogisticsSubType: any;
  }) => {
    const response = await apiPrintTradeShipments(
      LogisticsID,
      LogisticsSubType,
    );

    return response.result;
  },
);
