import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { QueryParams } from '@models/entities/shared/query';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiPublicProductsDetail,
  apiPublicProductsList,
} from '@services/public/products/public-products';

export enum PublicListAsyncAction {
  productsList = 'productsList',
  productsDetail = 'productsDetail',
}

export const publicProductsListAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_PRODUCTS}/${PublicListAsyncAction.productsList}`,
  async ({ page, limit }: QueryParams) => {
    const query: PagingQuery = { page, limit };
    const response = await apiPublicProductsList(query);

    return response.res.data;
  },
);

export const publicProductsDetailAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_PRODUCTS}/${PublicListAsyncAction.productsDetail}`,
  async (id: string) => {
    const response = await apiPublicProductsDetail(id);
    return response.res.data;
  },
);
