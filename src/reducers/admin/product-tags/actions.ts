import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { QueryParams } from '@models/entities/shared/query';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiAddTags,
  apiDeleteTags,
  apiGetTags,
  apiGetTagsById,
  apiUpdateTags,
} from '@services/admin/products/tags';

export enum ProductTagsAction {
  getAllProductsTags = 'getAllProductsTags',
  getProductsTagsById = 'getProductsTagsById',
  addProductsTags = 'addProductsTags',
  updateProductsTags = 'updateProductsTags',
  deleteProductsTags = 'deleteProductsTags',
}

export const getAllProductsTagsAsync = createAsyncThunk(
  `${ReducerName.PRODUCT_TAGS}/${ProductTagsAction.getAllProductsTags}`,
  async ({ page, limit }: QueryParams) => {
    const query: PagingQuery = { page, limit };
    const response = await apiGetTags(query);
    return response.result;
  },
);

export const getProductTagsByIdAsync = createAsyncThunk(
  `${ReducerName.PRODUCT_TAGS}/${ProductTagsAction.getProductsTagsById}`,
  async (id: string) => {
    const response = await apiGetTagsById(id);
    return response.result;
  },
);

export const addProductTagsAsync = createAsyncThunk(
  `${ReducerName.PRODUCT_TAGS}/${ProductTagsAction.addProductsTags}`,
  async (body: any) => {
    const response = await apiAddTags(body);
    return response.result.data;
  },
);

export const updateProductTagsAsync = createAsyncThunk(
  `${ReducerName.PRODUCT_TAGS}/${ProductTagsAction.updateProductsTags}`,
  async ({ id, body }: { id: string; body: any }) => {
    const response = await apiUpdateTags(id, body);
    return response.result.data;
  },
);

export const deleteProductTagsAsync = createAsyncThunk(
  `${ReducerName.PRODUCT_TAGS}/${ProductTagsAction.deleteProductsTags}`,
  async (id: string) => {
    await apiDeleteTags(id);
    return id;
  },
);
