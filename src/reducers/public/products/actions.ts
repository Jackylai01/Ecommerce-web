import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { QueryParams } from '@models/entities/shared/query';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiGetProductsByCategory,
  apiPublicProductsDetail,
  apiPublicProductsList,
} from '@services/public/products/public-products';

export enum PublicListAsyncAction {
  productsList = 'productsList',
  productsDetail = 'productsDetail',
  getProductsByCategory = 'getProductsByCategory',
}

export const publicProductsListAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_PRODUCTS}/${PublicListAsyncAction.productsList}`,
  async ({ page, limit }: QueryParams) => {
    const query: PagingQuery = { page, limit };
    const response = await apiPublicProductsList(query);
    return response.result;
  },
);

export const publicProductsDetailAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_PRODUCTS}/${PublicListAsyncAction.productsDetail}`,
  async (idSlug: string) => {
    const response = await apiPublicProductsDetail(idSlug);
    return response.res.data;
  },
);

export const getProductsByCategoryAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_PRODUCTS}/${PublicListAsyncAction.getProductsByCategory}`,
  async (categoryId: string) => {
    const response = await apiGetProductsByCategory(categoryId);
    return response.result;
  },
);
