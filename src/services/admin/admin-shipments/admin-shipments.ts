import { formatQueryString } from '@helpers/query';
import { PagingQuery } from '@models/entities/shared/pagination';
import { ShipmentResponse } from '@models/responses/shipments.res';
import {
  ApiPaginationResult,
  ApiResult,
  getRequest,
  postRequest,
} from '@services/shared/api';

/**
 * 獲取未出貨的訂單
 */
export const apiGetPendingShipments = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<ShipmentResponse>>(
    formatQueryString('/zigong/shipment/pending-shipments', query),
  );

/**
 * 建立正式訂單
 */

export const apiCreateShipments = async (data: any) =>
  postRequest<ApiResult<ShipmentResponse>>(
    '/zigong/shipment/create-temp-trade',
    data,
  );
