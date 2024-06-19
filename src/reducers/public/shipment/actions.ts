import { ReducerName } from '@enums/reducer-name';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiPostCreateByTempTrade,
  apiPostPublicShipmentLogistics,
  apiPostUpdateTempTrade,
} from '@services/public/shipment/public-shipment';

export enum PublicShipmentAsyncAction {
  ecPayLogistics = 'ecPayLogistics',
  updateTempTrade = 'updateTempTrade',
  createByTempTrade = 'createByTempTrade',
}

export const publicShipmentLogisticsAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_SHIPMENT}/${PublicShipmentAsyncAction.ecPayLogistics}`,
  async (data: any) => {
    const response = await apiPostPublicShipmentLogistics(data);
    return response.result.data;
  },
);

export const publicShipmentUpdateTempTradeAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_SHIPMENT}/${PublicShipmentAsyncAction.updateTempTrade}`,
  async (data: any) => {
    const response = await apiPostUpdateTempTrade(data);
    return response.result.data;
  },
);

export const publicShipmentCreateByTempTradeAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_SHIPMENT}/${PublicShipmentAsyncAction.createByTempTrade}`,
  async (data: any) => {
    const response = await apiPostCreateByTempTrade(data);
    return response.result.data;
  },
);
