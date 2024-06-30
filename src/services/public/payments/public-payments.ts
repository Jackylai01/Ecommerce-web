import { ordersRequest } from '@models/requests/orders.req';
import { paymentsRequest } from '@models/requests/payment.req';
import { ordersResponse } from '@models/responses/orders.res';
import { clientShipmentReply } from '@models/responses/shipment.res';
import { ApiResult, getRequest, postRequest } from '../../shared/api';

/**
 * 前台-建立訂單
 */

export const apiPublicCreateOrder = async (data: ordersRequest) =>
  postRequest<ApiResult<ordersResponse>>('/orders', data);

/**
 * 前台-選擇物流選擇頁
 */

export const apiPublicRedirectToLogisticsSelection = async (orderId: string) =>
  postRequest<ApiResult<any>>(
    `/public/shipment/redirect-to-logistics-selection`,
    { orderId },
  );

/**
 * 前台-綠界回傳物流選擇結果
 */

export const apiPublicHandleClientReply = async (
  orderId: string,
  ResultData: any,
) => {
  return postRequest<ApiResult<clientShipmentReply>>(
    `/public/shipment/client-reply?orderId=${orderId}`,
    ResultData,
  );
};

/**
 * 前台-建立全方位金流
 */

export const apiCreatePayments = async (data: paymentsRequest) =>
  postRequest<ApiResult<any>>(`/ecpay/create-payment`, data);

/**
 * 前台-根據uniqueId和orderId獲得物流的資訊
 */

export const apiGetShipmentData = async (uniqueId: string) =>
  getRequest<ApiResult<any>>(`/public/shipment/data/${uniqueId}`);
