import { formatQueryString } from '@helpers/query';

import { Discount } from '@models/entities/shared/discount';
import { PagingQuery } from '@models/entities/shared/pagination';
import {
  ApiPaginationResult,
  ApiResult,
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../shared/api';

/**
 * 獲取全部折扣
 */
export const apiGetDiscounts = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<Discount>>(
    formatQueryString('/zigong/discounts', query),
  );

/**
 * 根據ID取得折扣
 */
export const apiGetDiscountById = async (id: string) => {
  return getRequest<ApiResult<Discount>>(`/zigong/discounts/${id}`);
};

/**
 * 新增折扣
 */
export const apiAddDiscount = async (body: FormData) => {
  return postRequest<ApiResult<Discount>>('/zigong/discounts', body);
};

/**
 * 更新折扣
 */
export const apiUpdateDiscount = async (id: string, body: FormData) => {
  return putRequest<ApiResult<Discount>>(`/zigong/discounts/${id}`, body);
};

/**更新折扣狀態 */

export const apiUpdateDiscountStatus = async (
  id: string,
  body: { isActive: boolean },
) => {
  return putRequest<ApiResult<Discount>>(
    `/zigong/discounts/status/${id}`,
    body,
  );
};

/**
 * 刪除折扣
 */
export const apiDeleteDiscount = async (id: string) => {
  return deleteRequest<ApiResult<Discount>>(`/zigong/discounts/${id}`);
};
