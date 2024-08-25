import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiAddNewsCategory,
  apiDeleteNewsCategory,
  apiEditNewsCategory,
  apiGetAllNewsCategories,
  apiGetNewsCategoryById,
} from '@services/admin/admin-news-categorys/news-categorys';

export enum NewsCategoryAction {
  addNewsCategory = 'addNewsCategory',
  getAllNewsCategories = 'getAllNewsCategories',
  getNewsCategoryById = 'getNewsCategoryById',
  editNewsCategory = 'editNewsCategory',
  deleteNewsCategory = 'deleteNewsCategory',
}

export const addNewsCategoryAsync = createAsyncThunk(
  `${ReducerName.ADMIN_NEWS_CATEGORY}/${NewsCategoryAction.addNewsCategory}`,
  async (body: { name: string; description: string }) => {
    const response = await apiAddNewsCategory(body);
    return response.result.data;
  },
);

export const getAllNewsCategoriesAsync = createAsyncThunk(
  `${ReducerName.ADMIN_NEWS_CATEGORY}/${NewsCategoryAction.getAllNewsCategories}`,
  async (query: PagingQuery) => {
    const response = await apiGetAllNewsCategories(query);
    return response.result;
  },
);

export const getNewsCategoryByIdAsync = createAsyncThunk(
  `${ReducerName.ADMIN_NEWS_CATEGORY}/${NewsCategoryAction.getNewsCategoryById}`,
  async (categoryId: string) => {
    const response = await apiGetNewsCategoryById(categoryId);
    return response.result.data;
  },
);

export const editNewsCategoryAsync = createAsyncThunk(
  `${ReducerName.ADMIN_NEWS_CATEGORY}/${NewsCategoryAction.editNewsCategory}`,
  async ({
    categoryId,
    body,
  }: {
    categoryId: string;
    body: { name: string; description: string };
  }) => {
    const response = await apiEditNewsCategory(categoryId, body);
    return response.result.data;
  },
);

export const deleteNewsCategoryAsync = createAsyncThunk(
  `${ReducerName.ADMIN_NEWS_CATEGORY}/${NewsCategoryAction.deleteNewsCategory}`,
  async (categoryId: string) => {
    await apiDeleteNewsCategory(categoryId);
    return categoryId;
  },
);
