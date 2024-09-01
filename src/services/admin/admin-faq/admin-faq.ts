import { formatQueryString } from '@helpers/query';
import { PagingQuery } from '@models/entities/shared/pagination';

import { Faq } from '@models/responses/Faq.res';
import {
  ApiPaginationResult,
  ApiResult,
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../shared/api';

/**
 * 獲取全部FAQ內容
 */
export const apiGetFaqs = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<Faq>>(formatQueryString('/faq', query));

/**
 * 根據ID取得FAQ內容
 */
export const apiGetFaqById = async (id: string) => {
  return getRequest<ApiResult<Faq>>(`/faq/${id}`);
};

/**
 * 新增FAQ內容
 */
export const apiAddFaq = async (body: any) => {
  return postRequest<ApiResult<Faq>>('/faq', body);
};

/**
 * 更新FAQ內容
 */
export const apiUpdateFaq = async (id: string, body: any) => {
  return putRequest<ApiResult<Faq>>(`/faq/${id}`, body);
};

/**
 * 刪除FAQ內容
 */
export const apiDeleteFaq = async (id: string) => {
  return deleteRequest<ApiResult<Faq>>(`/faq/${id}`);
};
