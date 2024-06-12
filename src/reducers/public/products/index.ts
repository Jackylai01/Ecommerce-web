import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Metadata } from '@models/entities/shared/pagination';
import { ProductsResponse } from '@models/responses/products.res';
import { createSlice } from '@reduxjs/toolkit';
import {
  PublicListAsyncAction,
  publicProductsDetailAsync,
  publicProductsListAsync,
} from './actions';

type PublicProductState = ApiState<PublicListAsyncAction> & {
  list: ProductsResponse[] | null;
  metadata: Metadata | undefined;
  detail: any;
};

const initialState: PublicProductState = {
  list: null,
  metadata: undefined,
  detail: null,

  ...newApiState<PublicProductState>(PublicListAsyncAction),
};

const publicProductSlice = createSlice({
  name: ReducerName.PRODUCT,
  initialState,
  reducers: {
    resetPublicProductState: () => initialState,
    resetPublicProductDetails: (state) => {
      state.detail = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(publicProductsListAsync.fulfilled, (state, action) => {
      state.list = action.payload.data;
      state.metadata = action.payload.metadata;
    });
    builder.addCase(publicProductsDetailAsync.fulfilled, (state, action) => {
      state.detail = action.payload;
    });

    asyncMatcher(builder, ReducerName.PUBLIC_PRODUCTS);
  },
});

export const { resetPublicProductState, resetPublicProductDetails } =
  publicProductSlice.actions;
export default publicProductSlice.reducer;
