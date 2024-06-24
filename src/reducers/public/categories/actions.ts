import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetCategories } from '@services/public/categories/categories';

export enum CategoryAsyncAction {
  categoriesList = 'categoriesList',
}

export const getCategoriesListAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_CATEGORIES}/${CategoryAsyncAction.categoriesList}`,
  async ({ page, limit }: PagingQuery) => {
    const query: PagingQuery = { page, limit };
    const response = await apiGetCategories(query);

    return response.result;
  },
);
