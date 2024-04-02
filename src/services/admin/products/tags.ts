import { formatQueryString } from '@helpers/query';
import { PagingQuery } from '@models/entities/shared/pagination';
import { Tags } from '@models/entities/shared/products';
import {
  ApiListResult,
  ApiPaginationResult,
  ApiResult,
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../shared/api';

/**
 * 獲取全部產品標籤
 */

export const apiGetTags = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<Tags>>(formatQueryString('/tags', query));

/**
 * 根據id 取得產品標籤
 */
export const apiGetTagsById = async (id: string) => {
  return getRequest<ApiListResult<Tags>>(`/tags/${id}`);
};

/**
 * 新增產品標籤
 */
export const apiAddTags = async (body: FormData) => {
  return postRequest<ApiResult<Tags>>('/tags', body);
};

/**
 * 更新產品標籤
 */
export const apiUpdateTags = async (id: string, body: FormData) => {
  return putRequest<ApiResult<Tags>>(`/tags/${id}`, body);
};

/**
 * 刪除產品標籤
 */
export const apiDeleteTags = async (id: string) => {
  return deleteRequest<ApiResult<Tags>>(`/tags/${id}`);
};
