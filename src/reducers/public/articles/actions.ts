import { PagingQuery } from '@models/entities/shared/pagination';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ReducerName } from '@enums/reducer-name';
import {
  apiGetArticleById,
  apiGetArticleCategories,
  apiGetArticles,
  apiGetArticlesByCategory,
  apiGetTrendingArticles,
} from '@services/public/articles/public-articles';

export enum ArticleAsyncAction {
  articlesList = 'articlesList',
  articleDetail = 'articleDetail',
  trendingArticles = 'trendingArticles',
  categoriesList = 'categoriesList',
  articlesByCategory = 'articlesByCategory',
}

/**
 * 前台顯示文章列表
 */
export const getArticlesListAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_ARTICLES}/${ArticleAsyncAction.articlesList}`,
  async (query: PagingQuery) => {
    const response = await apiGetArticles(query);
    return response.result;
  },
);

/**
 * 前台顯示單篇文章詳情
 */
export const getArticleByIdAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_ARTICLES}/${ArticleAsyncAction.articleDetail}`,
  async (idSlug: string) => {
    const response = await apiGetArticleById(idSlug);
    return response.result.data;
  },
);

/**
 * 前台顯示熱門文章
 */
export const getTrendingArticlesAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_ARTICLES}/${ArticleAsyncAction.trendingArticles}`,
  async () => {
    const response = await apiGetTrendingArticles();
    return response.result.data;
  },
);

/**
 * 前台顯示文章分類列表
 */
export const getArticleCategoriesAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_ARTICLES}/${ArticleAsyncAction.categoriesList}`,
  async () => {
    const response = await apiGetArticleCategories();

    return response.result.data;
  },
);

export const getArticlesListByCategoryAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_ARTICLES}/${ArticleAsyncAction.articlesByCategory}`,
  async ({ name, query }: { name: string; query: PagingQuery }) => {
    const response = await apiGetArticlesByCategory(name, query);
    return response.result;
  },
);
