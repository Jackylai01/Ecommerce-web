import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { ProductsResponse } from '@models/responses/products.res';
import { createSlice } from '@reduxjs/toolkit';
import {
  PublicListAsyncAction,
  publicProductsDetailAsync,
  publicProductsListAsync,
} from './actions';

type PublicProductState = ApiState<PublicListAsyncAction> & {
  list: ProductsResponse[] | null;
  detail: any;
};

const initialState: PublicProductState = {
  list: null,
  detail: null,
  ...newApiState<PublicProductState>(PublicListAsyncAction),
};

const productSlice = createSlice({
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
    });
    builder.addCase(publicProductsDetailAsync.fulfilled, (state, action) => {
      state.detail = action.payload;
    });

    asyncMatcher(builder, ReducerName.PUBLIC_PRODUCTS_LIST);
  },
});

export const { resetPublicProductState, resetPublicProductDetails } =
  productSlice.actions;
export default productSlice.reducer;
