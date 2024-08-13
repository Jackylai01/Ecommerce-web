import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { QueryParams } from '@models/entities/shared/query';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiAddArticlesCategory,
  apiDeleteArticlesCategory,
  apiGetArticlesCategories,
  apiGetArticlesCategoryById,
  apiUpdateArticlesCategory,
} from '@services/admin/admin-articles-category/articles-category';

export enum CategoryAction {
  getAllCategories = 'getAllCategories',
  getCategoryById = 'getCategoryById',
  addCategory = 'addCategory',
  updateCategory = 'updateCategory',
  deleteCategory = 'deleteCategory',
}

export const getAllCategoriesAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ARTICLES_CATEGORY}/${CategoryAction.getAllCategories}`,
  async ({ page, limit }: QueryParams) => {
    const query: PagingQuery = { page, limit };
    const response = await apiGetArticlesCategories(query);
    return response.result;
  },
);

export const getCategoryByIdAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ARTICLES_CATEGORY}/${CategoryAction.getCategoryById}`,
  async (id: string) => {
    const response = await apiGetArticlesCategoryById(id);
    return response.result.data;
  },
);

export const addCategoryAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ARTICLES_CATEGORY}/${CategoryAction.addCategory}`,
  async (body: any) => {
    const response = await apiAddArticlesCategory(body);
    return response.result.data;
  },
);

export const updateCategoryAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ARTICLES_CATEGORY}/${CategoryAction.updateCategory}`,
  async ({ id, body }: { id: string; body: any }) => {
    const response = await apiUpdateArticlesCategory(id, body);
    return response.result.data;
  },
);

export const deleteCategoryAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ARTICLES_CATEGORY}/${CategoryAction.deleteCategory}`,
  async (id: string) => {
    await apiDeleteArticlesCategory(id);
    return id;
  },
);
