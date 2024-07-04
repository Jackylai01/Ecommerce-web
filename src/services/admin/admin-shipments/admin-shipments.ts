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
 * 獲取未出貨的訂單-資料庫獲取
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

/**
 * 查詢單一正式訂單-綠界獲取
 */

export const apiQueryLogistics = async (data: any) =>
  postRequest<ApiResult<any>>(
    '/zigong/shipment/query-logistics-trade-info',
    data,
  );

/**
 * 查全部正式訂單列表-資料庫獲取-由 LogisticsID 判定
 */

export const apiGetFormalShipments = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<ShipmentResponse>>(
    formatQueryString('/zigong/shipment/formal-shipments', query),
  );

/**
 * 列印物流託運單
 */

export const apiPrintTradeShipments = async (
  LogisticsID: string,
  LogisticsSubType: any,
) =>
  postRequest<ApiResult<ShipmentResponse>>(
    '/zigong/shipment/printTradeDocument',
    { LogisticsID, LogisticsSubType },
  );
