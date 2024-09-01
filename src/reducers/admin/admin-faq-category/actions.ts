import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiAddFaqCategory,
  apiDeleteFaqCategory,
  apiGetFaqCategories,
  apiGetFaqCategoryById,
  apiUpdateFaqCategory,
} from '@services/admin/admin-faq-category/admin-faq-category';

export enum FaqCategoryAction {
  getAllCategories = 'getAllCategories',
  getCategoryById = 'getCategoryById',
  addCategory = 'addCategory',
  updateCategory = 'updateCategory',
  deleteCategory = 'deleteCategory',
}

export const getAllFaqCategoriesAsync = createAsyncThunk(
  `${ReducerName.ADMIN_FAQ_CATEGORY}/${FaqCategoryAction.getAllCategories}`,
  async (query: PagingQuery) => {
    const response = await apiGetFaqCategories(query);
    return response.result;
  },
);

export const getFaqCategoryByIdAsync = createAsyncThunk(
  `${ReducerName.ADMIN_FAQ_CATEGORY}/${FaqCategoryAction.getCategoryById}`,
  async (id: string) => {
    const response = await apiGetFaqCategoryById(id);
    return response.result.data;
  },
);

export const addFaqCategoryAsync = createAsyncThunk(
  `${ReducerName.ADMIN_FAQ_CATEGORY}/${FaqCategoryAction.addCategory}`,
  async (body: any) => {
    const response = await apiAddFaqCategory(body);
    return response.result.data;
  },
);

export const updateFaqCategoryAsync = createAsyncThunk(
  `${ReducerName.ADMIN_FAQ_CATEGORY}/${FaqCategoryAction.updateCategory}`,
  async ({ id, body }: { id: string; body: any }) => {
    const response = await apiUpdateFaqCategory(id, body);
    return response.result.data;
  },
);

export const deleteFaqCategoryAsync = createAsyncThunk(
  `${ReducerName.ADMIN_FAQ_CATEGORY}/${FaqCategoryAction.deleteCategory}`,
  async (id: string) => {
    await apiDeleteFaqCategory(id);
    return id;
  },
);
