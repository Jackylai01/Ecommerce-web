import { ordersRequest } from '@models/requests/orders.req';
import { paymentsRequest } from '@models/requests/payment.req';
import { logistics } from '@models/requests/shipment';
import { ordersResponse } from '@models/responses/orders.res';
import { clientShipmentReply } from '@models/responses/shipment.res';
import { ApiResult, postRequest } from '../../shared/api';

/**
 * 前台-建立訂單
 */

export const apiPublicCreateOrder = async (data: ordersRequest) =>
  postRequest<ApiResult<ordersResponse>>('/orders', data);

/**
 * 前台-選擇物流選擇頁
 */

export const apiPublicRedirectToLogisticsSelection = async (
  orderId: logistics,
) =>
  postRequest<ApiResult<any>>(
    `/public/shipment/redirect-to-logistics-selection`,
    orderId,
  );

/**
 * 前台-綠界回傳物流選擇結果
 */

export const apiPublicHandleClientReply = async (ResultDate: any) => {
  return postRequest<ApiResult<clientShipmentReply>>(
    `/public/shipment/client-reply`,
    ResultDate,
  );
};

/**
 * 前台-建立全方位金流
 */

export const apiCreatePayments = async (data: paymentsRequest) =>
  postRequest<ApiResult<any>>(`/ecpay/create-payment`, data);

/**
 * 前台-全方位金流回傳結果
 */
export const apiGetPaymentNotify = async (data: any) =>
  postRequest<ApiResult<any>>(`/ecpay/notify`, data);
