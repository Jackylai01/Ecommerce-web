import { formatQueryString } from '@helpers/query';

import { PagingQuery } from '@models/entities/shared/pagination';
import { ordersResponse } from '@models/responses/orders.res';
import { ApiPaginationResult, getRequest } from '../../shared/api';

/**
 * 獲取全部折扣
 */
export const apiAdminGetOrders = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<ordersResponse>>(
    formatQueryString('/orders', query),
  );
