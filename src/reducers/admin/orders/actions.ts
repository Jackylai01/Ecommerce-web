import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { QueryParams } from '@models/entities/shared/query';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiAdminGetOrders } from '@services/admin/admin-orders/admin-orders';

export enum AdminOrdersAction {
  getOrders = 'getAllDiscounts',
}

export const getAdminAllOrdersAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ORDERS}/${AdminOrdersAction.getOrders}`,
  async ({
    page,
    limit,
    startDate,
    endDate,
    minPrice,
    maxPrice,
    status,
  }: QueryParams) => {
    const query: PagingQuery = {
      page,
      limit,
      startDate,
      endDate,
      minPrice,
      maxPrice,
      status,
    };
    const response = await apiAdminGetOrders(query);
    return response.result;
  },
);
