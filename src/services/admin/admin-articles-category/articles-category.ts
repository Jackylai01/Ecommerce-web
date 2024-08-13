import { formatQueryString } from '@helpers/query';

import { PagingQuery } from '@models/entities/shared/pagination';
import { ArticlesCategory } from '@models/responses/articleCategory.res';
import {
  ApiPaginationResult,
  ApiResult,
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../shared/api';

/**
 * 獲取全部文章類別
 */
export const apiGetArticlesCategories = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<ArticlesCategory>>(
    formatQueryString('/zigong/articles-category', query),
  );

/**
 * 根據ID取得文章類別
 */
export const apiGetArticlesCategoryById = async (id: string) => {
  return getRequest<ApiResult<ArticlesCategory>>(
    `/zigong/articles-category/${id}`,
  );
};

/**
 * 新增文章類別
 */
export const apiAddArticlesCategory = async (body: any) => {
  return postRequest<ApiResult<ArticlesCategory>>(
    '/zigong/articles-category',
    body,
  );
};

/**
 * 更新文章類別
 */
export const apiUpdateArticlesCategory = async (id: string, body: any) => {
  return putRequest<ApiResult<ArticlesCategory>>(
    `/zigong/articles-category/${id}`,
    body,
  );
};

/**
 * 刪除文章類別
 */
export const apiDeleteArticlesCategory = async (id: string) => {
  return deleteRequest<ApiResult<ArticlesCategory>>(
    `/zigong/articles-category/${id}`,
  );
};
