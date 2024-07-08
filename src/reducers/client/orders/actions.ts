import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClientGetOrders } from '@services/client/client-orders/client-orders';

export enum clientOrdersAction {
  getClientOrders = 'getClientOrders',
}

export const getClientOrdersAsync = createAsyncThunk(
  `${ReducerName.CLIENT_ORDERS}/${clientOrdersAction.getClientOrders}`,
  async ({ userId, query }: { userId: string; query: PagingQuery }) => {
    const response = await apiClientGetOrders(query, userId);
    return response.result;
  },
);
