import { formatQueryString } from '@helpers/query';

import { PagingQuery } from '@models/entities/shared/pagination';
import { OrderDetail, ordersResponse } from '@models/responses/orders.res';
import {
  ApiPaginationResult,
  ApiResult,
  getRequest,
  postRequest,
} from '../../shared/api';

/**
 * 獲取全部訂單
 */
export const apiAdminGetOrders = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<ordersResponse>>(
    formatQueryString('/zigong/orders', query),
  );

/**
 * 獲取單一訂單詳細資訊
 */

export const apiAdminGetOrdersDetails = async (orderId: string) =>
  getRequest<ApiResult<OrderDetail>>(`/zigong/orders/details/${orderId}`);

/**
 * 更新訂單的狀態
 */

export const apiAdminUpdateOrderStatus = async (
  orderId: string,
  status: string,
) =>
  postRequest<ApiResult<any>>(`/zigong/orders/updateStatus/${orderId}`, {
    status,
  });
