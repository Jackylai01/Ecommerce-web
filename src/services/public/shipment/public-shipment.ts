import { ApiResult, postRequest } from '../../shared/api';

/**
 * 前台-前往物流設定
 */
export const apiPostPublicShipmentLogistics = async (data: any) =>
  postRequest<ApiResult<any>>(
    `/public/shipment/redirect-to-logistics-selection`,
    data,
  );

/**
 * 前台-更新暫存物流訂單
 */
export const apiPostUpdateTempTrade = async (data: any) =>
  postRequest<ApiResult<any>>(`/public/shipment/update-temp-trade`, data);

/**
 * 前台-建立正式訂單
 */
export const apiPostCreateByTempTrade = async (data: any) => {
  return postRequest<ApiResult<any>>(
    '/public/shipment/create-temp-trade',
    data,
  );
};
