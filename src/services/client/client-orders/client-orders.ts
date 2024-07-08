import { formatQueryString } from '@helpers/query';
import { PagingQuery } from '@models/entities/shared/pagination';
import { ordersResponse } from '@models/responses/orders.res';
import { ApiPaginationResult, getRequest } from '../../shared/api';

/**
 * 獲取全部訂單
 */
export const apiClientGetOrders = async (query: PagingQuery, orderId: string) =>
  getRequest<ApiPaginationResult<ordersResponse>>(
    formatQueryString(`/orders/client/detail/${orderId}`, query),
  );
