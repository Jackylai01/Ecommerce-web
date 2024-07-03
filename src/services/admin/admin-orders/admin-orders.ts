import { formatQueryString } from '@helpers/query';

import { PagingQuery } from '@models/entities/shared/pagination';
import { OrderDetail, ordersResponse } from '@models/responses/orders.res';
import { ApiPaginationResult, ApiResult, getRequest } from '../../shared/api';

/**
 * 獲取全部訂單
 */
export const apiAdminGetOrders = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<ordersResponse>>(
    formatQueryString('/orders', query),
  );

/**
 * 獲取單一訂單詳細資訊
 */

export const apiAdminGetOrdersDetails = async (orderId: string) =>
  getRequest<ApiResult<OrderDetail>>(`/orders/details/${orderId}`);
