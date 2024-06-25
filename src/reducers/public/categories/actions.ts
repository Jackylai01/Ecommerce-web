import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiGetCategories,
  apiGetPublicCategoryById,
} from '@services/public/categories/categories';

export enum CategoryAsyncAction {
  categoriesList = 'categoriesList',
  getCategoryById = 'getCategoryById',
}

export const getCategoriesListAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_CATEGORIES}/${CategoryAsyncAction.categoriesList}`,
  async ({ page, limit }: PagingQuery) => {
    const query: PagingQuery = { page, limit };
    const response = await apiGetCategories(query);
    return response.result;
  },
);

/** 前台顯示類別產品列表 */
export const getCategoryByIdAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_CATEGORIES}/${CategoryAsyncAction.getCategoryById}`,
  async ({ id, slug }: { id: string; slug: string }) => {
    const response = await apiGetPublicCategoryById(id, slug);
    return response.res.data;
  },
);
