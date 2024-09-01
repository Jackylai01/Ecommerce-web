import { formatQueryString } from '@helpers/query';
import { PagingQuery } from '@models/entities/shared/pagination';

import { Faq } from '@models/responses/faq.res';
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
  getRequest<ApiPaginationResult<Faq>>(formatQueryString('/zigong/faq', query));

/**
 * 根據ID取得FAQ內容
 */
export const apiGetFaqById = async (id: string) => {
  return getRequest<ApiResult<Faq>>(`/zigong/faq/${id}`);
};

/**
 * 新增FAQ內容
 */
export const apiAddFaq = async (body: any) => {
  return postRequest<ApiResult<Faq>>('/zigong/faq', body);
};

/**
 * 更新FAQ內容
 */
export const apiUpdateFaq = async (id: string, body: any) => {
  return putRequest<ApiResult<Faq>>(`/zigong/faq/${id}`, body);
};

/**
 * 刪除FAQ內容
 */
export const apiDeleteFaq = async (id: string) => {
  return deleteRequest<ApiResult<Faq>>(`/zigong/faq/${id}`);
};
