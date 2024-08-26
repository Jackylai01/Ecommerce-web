import { formatQueryString } from '@helpers/query';
import { PagingQuery } from '@models/entities/shared/pagination';
import { NewsItem } from '@models/responses/news';
import { ApiPaginationResult, ApiResult, getRequest } from '../../shared/api';

/**
 * 獲取所有最新消息
 */
export const apiGetAllPublicNews = async (query: PagingQuery) => {
  return getRequest<ApiPaginationResult<NewsItem>>(
    formatQueryString('/public/news', query),
  );
};

/**
 * 獲取所有最新消息類別
 */
export const apiGetAllPublicNewsCategories = async () => {
  return getRequest<ApiResult<any[]>>('/public/news-category');
};

/**
 * 根據類別獲取最新消息
 */
export const apiGetNewsByCategory = async (
  categoryId: string,
  query: PagingQuery,
) => {
  return getRequest<ApiPaginationResult<NewsItem>>(
    formatQueryString(`/public/news-category/${categoryId}/news`, query),
  );
};

/**
 * 獲取單一最新消息詳情
 */
export const apiGetPublicNewsItemById = async (newsItemId: string) => {
  return getRequest<ApiResult<NewsItem>>(`/public/news/${newsItemId}`);
};
