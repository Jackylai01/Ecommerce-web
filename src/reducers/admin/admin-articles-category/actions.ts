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

export enum ArticleCategoryAction {
  getAllCategories = 'getAllCategories',
  getCategoryById = 'getCategoryById',
  addCategory = 'addCategory',
  updateCategory = 'updateCategory',
  deleteCategory = 'deleteCategory',
}

export const getAllArticleCategoriesAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ARTICLES_CATEGORY}/${ArticleCategoryAction.getAllCategories}`,
  async ({ page, limit }: QueryParams) => {
    const query: PagingQuery = { page, limit };
    const response = await apiGetArticlesCategories(query);
    return response.result;
  },
);

export const getArticleCategoryByIdAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ARTICLES_CATEGORY}/${ArticleCategoryAction.getCategoryById}`,
  async (id: string) => {
    const response = await apiGetArticlesCategoryById(id);
    return response.result.data;
  },
);

export const addArticleCategoryAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ARTICLES_CATEGORY}/${ArticleCategoryAction.addCategory}`,
  async (body: any) => {
    const response = await apiAddArticlesCategory(body);
    return response.result.data;
  },
);

export const updateArticleCategoryAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ARTICLES_CATEGORY}/${ArticleCategoryAction.updateCategory}`,
  async ({ id, body }: { id: string; body: any }) => {
    const response = await apiUpdateArticlesCategory(id, body);
    return response.result.data;
  },
);

export const deleteArticleCategoryAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ARTICLES_CATEGORY}/${ArticleCategoryAction.deleteCategory}`,
  async (id: string) => {
    await apiDeleteArticlesCategory(id);
    return id;
  },
);
