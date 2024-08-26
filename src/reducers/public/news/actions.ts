import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiGetAllPublicNews,
  apiGetAllPublicNewsCategories,
  apiGetNewsByCategory,
  apiGetPublicNewsItemById,
} from '@services/public/news/news';

export enum PublicNewsAction {
  getAllPublicNews = 'getAllPublicNews',
  getAllPublicNewsCategories = 'getAllPublicNewsCategories',
  getPublicNewsItemById = 'getPublicNewsItemById',
  getNewsByCategory = 'getNewsByCategory',
}

/**
 * 獲取所有最新消息
 */
export const getAllPublicNewsAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_NEWS}/${PublicNewsAction.getAllPublicNews}`,
  async (query: PagingQuery) => {
    const response = await apiGetAllPublicNews(query);
    return response.result;
  },
);

/**
 * 獲取所有最新消息類別
 */
export const getAllPublicNewsCategoriesAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_NEWS}/${PublicNewsAction.getAllPublicNewsCategories}`,
  async () => {
    const response = await apiGetAllPublicNewsCategories();
    return response.result.data;
  },
);

/**
 * 根據類別獲取最新消息
 */
export const getNewsByCategoryAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_NEWS}/${PublicNewsAction.getPublicNewsItemById}`,
  async ({ categoryId, query }: { categoryId: string; query: PagingQuery }) => {
    const response = await apiGetNewsByCategory(categoryId, query);
    return response.result.data;
  },
);

/**
 * 獲取單一最新消息詳情
 */
export const getPublicNewsItemByIdAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_NEWS}/${PublicNewsAction.getNewsByCategory}`,
  async (newsItemId: string) => {
    const response = await apiGetPublicNewsItemById(newsItemId);
    return response.result.data;
  },
);
