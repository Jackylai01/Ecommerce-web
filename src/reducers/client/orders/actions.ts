import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiClientGetOrderHistory,
  apiClientGetOrders,
} from '@services/client/client-orders/client-orders';

export enum clientOrdersAction {
  getClientOrders = 'getClientOrders',
  getClientOrderHistory = 'getClientOrderHistory',
}

export const getClientOrdersAsync = createAsyncThunk(
  `${ReducerName.CLIENT_ORDERS}/${clientOrdersAction.getClientOrders}`,
  async ({ userId, query }: { userId: string; query: PagingQuery }) => {
    const response = await apiClientGetOrders(query, userId);
    return response.result;
  },
);

export const getClientOrderHistoryAsync = createAsyncThunk(
  `${ReducerName.CLIENT_ORDERS}/${clientOrdersAction.getClientOrderHistory}`,
  async ({ userId, query }: { userId: string; query: PagingQuery }) => {
    const response = await apiClientGetOrderHistory(query, userId);
    return response.result;
  },
);
