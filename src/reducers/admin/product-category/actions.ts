import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { ProductQueryParams } from '@models/entities/shared/query';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiAddCategory,
  apiDeleteCategory,
  apiGetCategories,
  apiGetCategoryById,
  apiUpdateCategory,
} from '@services/admin/products/category';

export enum ProductCategoryAction {
  getAllProductsCategory = 'getAllProductsCategory',
  getProductsCategoryById = 'getProductsCategoryById',
  addProductsCategory = ' addProductsCategory ',
  updateProductsCategory = 'updateProductsCategory',
  deleteProductsCategory = 'deleteProductsCategory',
}

export const getAllProductsCategoryAsync = createAsyncThunk(
  `${ReducerName.PRODUCT_CATEGORY}/${ProductCategoryAction.getAllProductsCategory}`,
  async ({ page, limit }: ProductQueryParams) => {
    const query: PagingQuery = { page, limit };
    const response = await apiGetCategories(query);
    return response.result;
  },
);

export const getProductCategoryByIdAsync = createAsyncThunk(
  `${ReducerName.PRODUCT_CATEGORY}/${ProductCategoryAction.getProductsCategoryById}`,
  async (id: string) => {
    const response = await apiGetCategoryById(id);
    return response.result.data;
  },
);

export const addProductCategoryAsync = createAsyncThunk(
  `${ReducerName.PRODUCT_CATEGORY}/${ProductCategoryAction.addProductsCategory}`,
  async (body: any) => {
    const response = await apiAddCategory(body);
    return response.result.data;
  },
);

export const updateProductCategoryAsync = createAsyncThunk(
  `${ReducerName.PRODUCT_CATEGORY}/${ProductCategoryAction.updateProductsCategory}`,
  async ({ id, body }: { id: string; body: any }) => {
    const response = await apiUpdateCategory(id, body);
    return response.result.data;
  },
);

export const deleteProductCategoryAsync = createAsyncThunk(
  `${ReducerName.PRODUCT_CATEGORY}/${ProductCategoryAction.deleteProductsCategory}`,
  async (id: string) => {
    await apiDeleteCategory(id);
    return id;
  },
);
