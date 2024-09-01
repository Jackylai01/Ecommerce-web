import { formatQueryString } from '@helpers/query';
import { PagingQuery } from '@models/entities/shared/pagination';
import { FaqCategory } from '@models/responses/faq.res';
import {
  ApiPaginationResult,
  ApiResult,
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../shared/api';

/**
 * 獲取全部FAQ類別
 */
export const apiGetFaqCategories = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<FaqCategory>>(
    formatQueryString('/faq/categories', query),
  );

/**
 * 根據ID取得FAQ類別
 */
export const apiGetFaqCategoryById = async (id: string) => {
  return getRequest<ApiResult<FaqCategory>>(`/faq/categories/${id}`);
};

/**
 * 新增FAQ類別
 */
export const apiAddFaqCategory = async (body: any) => {
  return postRequest<ApiResult<FaqCategory>>('/faq/categories', body);
};

/**
 * 更新FAQ類別
 */
export const apiUpdateFaqCategory = async (id: string, body: any) => {
  return putRequest<ApiResult<FaqCategory>>(`/faq/categories/${id}`, body);
};

/**
 * 刪除FAQ類別
 */
export const apiDeleteFaqCategory = async (id: string) => {
  return deleteRequest<ApiResult<FaqCategory>>(`/faq/categories/${id}`);
};
