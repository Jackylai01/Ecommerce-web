import { formatQueryString } from '@helpers/query';
import { PagingQuery } from '@models/entities/shared/pagination';
import { NewsItem } from '@models/responses/news';
import {
  ApiPaginationResult,
  ApiResult,
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../shared/api';

export const apiAddNewsItem = async (body: FormData) => {
  return postRequest<ApiResult<NewsItem>>('/zigong/news-items', body, {
    'Content-Type': 'multipart/form-data',
  });
};

export const apiGetAllNewsItems = async (query: PagingQuery) => {
  return getRequest<ApiPaginationResult<any>>(
    formatQueryString('/zigong/news-items', query),
  );
};

export const apiGetNewsItemById = async (newsItemId: string) => {
  return getRequest<ApiResult<NewsItem>>(`/zigong/news-items/${newsItemId}`);
};

export const apiEditNewsItem = async (newsItemId: string, body: FormData) => {
  return putRequest<ApiResult<NewsItem>>(
    `/zigong/news-items/${newsItemId}`,
    body,
    {
      'Content-Type': 'multipart/form-data',
    },
  );
};

export const apiDeleteNewsItem = async (newsItemId: string) => {
  return deleteRequest<ApiResult<NewsItem>>(`/zigong/news-items/${newsItemId}`);
};
