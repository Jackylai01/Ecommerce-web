import { formatQueryString } from '@helpers/query';
import { PagingQuery } from '@models/entities/shared/pagination';

import {
  ArticleCategoryPublicResponse,
  ArticlePublicResponse,
} from '@models/responses/article.res';
import { ApiPaginationResult, ApiResult, getRequest } from '../../shared/api';

/**
 * 前台-取得文章列表
 */
export const apiGetArticles = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<ArticlePublicResponse>>(
    formatQueryString('/public/articles', query),
  );

/**
 * 前台-取得單篇文章詳情
 */
export const apiGetArticleById = async (idSlug: string) =>
  getRequest<ApiResult<ArticlePublicResponse>>(
    `/public/articles/${encodeURIComponent(idSlug)}`,
  );

/**
 * 前台-取得熱門文章
 */
export const apiGetTrendingArticles = async () =>
  getRequest<ApiResult<ArticlePublicResponse[]>>('/public/articles/trending');

/**
 * 前台-取得文章分類列表
 */
export const apiGetArticleCategories = async () =>
  getRequest<ApiResult<ArticleCategoryPublicResponse[]>>(
    '/public/articles/categories',
  );

/**
 * 前台-根據類別取得文章分類列表
 */
export const apiGetArticlesByCategory = async (
  name: string,
  query: PagingQuery,
) =>
  getRequest<ApiPaginationResult<ArticlePublicResponse[]>>(
    formatQueryString(`/public/articles/category/${name}`, query),
  );
