import { formatQueryString } from '@helpers/query';
import { PagingQuery } from '@models/entities/shared/pagination';
import { Category } from '@models/entities/shared/products';
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
 * 獲取全部產品類別
 */

export const apiGetCategories = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<Category>>(
    formatQueryString('/categories', query),
  );

/**
 * 根據id 取得產品類別
 */
export const apiGetCategoryById = async (id: string) => {
  return getRequest<ApiListResult<Category>>(`/categories/${id}`);
};

/**
 * 新增產品類別
 */
export const apiAddCategory = async (body: FormData) => {
  return postRequest<ApiResult<any>>('/categories', body);
};

/**
 * 更新產品類別
 */
export const apiUpdateCategory = async (id: string, body: FormData) => {
  return putRequest<ApiResult<any>>(`/categories/${id}`, body);
};

/**
 * 刪除產品類別
 */
export const apiDeleteCategory = async (id: string) => {
  return deleteRequest<ApiResult<any>>(`/categories/${id}`);
};

/**
 * 刪除類別單張相片
 */
export const apiDeleteCategoryImage = async (
  categoryId: string,
  imageId: string,
) => {
  const encodedPublicId = encodeURIComponent(imageId);
  return deleteRequest<ApiResult<any>>(
    `/categories/${categoryId}/image/${encodedPublicId}`,
  );
};
