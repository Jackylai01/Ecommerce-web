import { formatQueryString } from '@helpers/query';
import { PagingQuery } from '@models/entities/shared/pagination';
import {
  ApiPaginationResult,
  ApiResult,
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../shared/api';

export const apiAddNewsCategory = async (body: {
  name: string;
  description: string;
}) => {
  return postRequest<ApiResult<any>>('/zigong/news-category', body);
};

export const apiGetAllNewsCategories = async (query: PagingQuery) => {
  return getRequest<ApiPaginationResult<any>>(
    formatQueryString('/zigong/news-category', query),
  );
};

export const apiGetNewsCategoryById = async (categoryId: string) => {
  return getRequest<ApiResult<any>>(`/zigong/news-category/${categoryId}`);
};

export const apiEditNewsCategory = async (
  categoryId: string,
  body: { name: string; description: string },
) => {
  return putRequest<ApiResult<any>>(
    `/zigong/news-category/${categoryId}`,
    body,
  );
};

export const apiDeleteNewsCategory = async (categoryId: string) => {
  return deleteRequest<ApiResult<any>>(`/zigong/news-category/${categoryId}`);
};
