import { PagingQuery } from '@models/entities/shared/pagination';
import {
  AddArticleRequest,
  AddCommentRequest,
  EditArticleRequest,
} from '@models/requests/article.req';
import { Article, Comment } from '@models/responses/article.res';
import {
  ApiPaginationResult,
  ApiResult,
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../shared/api';

/**
 * 新增文章
 */
export const apiAddArticle = async (body: AddArticleRequest) => {
  return postRequest<ApiResult<Article>>('/articles', body);
};

/**
 * 編輯文章
 */
export const apiEditArticle = async (
  articleId: string,
  body: EditArticleRequest,
) => {
  return putRequest<ApiResult<Article>>(`/articles/${articleId}`, body);
};

/**
 * 刪除文章
 */
export const apiDeleteArticle = async (articleId: string) => {
  return deleteRequest<ApiResult<Article>>(`/articles/${articleId}`);
};

/**
 * 查詢全部文章
 */
export const apiGetAllArticles = async (query: PagingQuery) => {
  return getRequest<ApiPaginationResult<any>>('/articles', query);
};

/**
 * 新增留言至文章
 */
export const apiAddCommentToArticle = async (
  articleId: string,
  body: AddCommentRequest,
) => {
  return postRequest<ApiResult<Comment>>(
    `/articles/${articleId}/comments`,
    body,
  );
};

/**
 * 查詢單一文章
 */
export const apiGetArticleById = async (articleId: string) => {
  return getRequest<ApiResult<Article>>(`/articles/${articleId}`);
};
