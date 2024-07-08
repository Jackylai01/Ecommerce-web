import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { QueryParams } from '@models/entities/shared/query';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiAdminGetOrders,
  apiAdminGetOrdersDetails,
  apiAdminUpdateOrderStatus,
} from '@services/admin/admin-orders/admin-orders';

export enum AdminOrdersAction {
  getOrders = 'getAllDiscounts',
  getOrdersDetails = 'getOrdersDetails',
  changeOrderStatus = 'changeOrderStatus',
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

export const getAdminOrdersDetailAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ORDERS}/${AdminOrdersAction.getOrdersDetails}`,
  async (orderId: string) => {
    const response = await apiAdminGetOrdersDetails(orderId);
    return response.result.data;
  },
);

export const updateOrderStatusAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ORDERS}/${AdminOrdersAction.changeOrderStatus}`,
  async ({ orderId, status }: { orderId: string; status: string }) => {
    const response = await apiAdminUpdateOrderStatus(orderId, status);
    return response.result.data;
  },
);
