import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { AddCommentRequest } from '@models/requests/article.req';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiAddArticle,
  apiAddCommentToArticle,
  apiDeleteArticle,
  apiEditArticle,
  apiGetAllArticles,
  apiGetArticleById,
} from '@services/admin/admin-articles/admin-articles';

export enum ArticleAction {
  getAllArticles = 'getAllArticles',
  getArticleById = 'getArticleById',
  addArticle = 'addArticle',
  editArticle = 'editArticle',
  deleteArticle = 'deleteArticle',
  addCommentToArticle = 'addCommentToArticle',
}

export const getAllArticlesAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ARTICLES}/${ArticleAction.getAllArticles}`,
  async (query: PagingQuery) => {
    const response = await apiGetAllArticles(query);
    return response.result;
  },
);

export const getArticleByIdAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ARTICLES}/${ArticleAction.getArticleById}`,
  async (articleId: string) => {
    const response = await apiGetArticleById(articleId);
    return response.result.data;
  },
);

export const addArticleAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ARTICLES}/${ArticleAction.addArticle}`,
  async (body: FormData) => {
    const response = await apiAddArticle(body);
    return response.result.data;
  },
);

export const editArticleAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ARTICLES}/${ArticleAction.editArticle}`,
  async ({ articleId, body }: { articleId: string; body: FormData }) => {
    const response = await apiEditArticle(articleId, body);
    return response.result.data;
  },
);
export const deleteArticleAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ARTICLES}/${ArticleAction.deleteArticle}`,
  async (articleId: string) => {
    await apiDeleteArticle(articleId);
    return articleId;
  },
);

export const addCommentToArticleAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ARTICLES}/${ArticleAction.addCommentToArticle}`,
  async ({
    articleId,
    body,
  }: {
    articleId: string;
    body: AddCommentRequest;
  }) => {
    const response = await apiAddCommentToArticle(articleId, body);
    return response.result.data;
  },
);
