import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Metadata } from '@models/entities/shared/pagination';
import { Product } from '@models/entities/shared/products';
import { createSlice } from '@reduxjs/toolkit';
import {
  ProductAction,
  addProductAsync,
  deleteAllProductsAsync,
  deleteProductAsync,
  getAllProductsAsync,
  getProductByIdAsync,
  updateProductAsync,
  updateProductStatusAsync,
} from './actions';

type ProductState = ApiState<ProductAction> & {
  list: Product[] | null;
  metadata: Metadata | null;
  productDetails: Product | null;
};

const initialState: ProductState = {
  list: null,
  metadata: null,
  productDetails: null,
  ...newApiState<ProductState>(ProductAction),
};

const productSlice = createSlice({
  name: ReducerName.PRODUCT,
  initialState,
  reducers: {
    resetProductState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProductsAsync.fulfilled, (state, action) => {
      state.list = action.payload.data;
      state.metadata = action.payload.metadata;
    });
    builder.addCase(getProductByIdAsync.fulfilled, (state, action) => {
      state.productDetails = action.payload;
    });
    builder.addCase(addProductAsync.fulfilled, (state, action) => {
      state.list = state.list
        ? [...state.list, action.payload]
        : [action.payload];
    });
    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      if (state.list) {
        state.list = state.list.map((product) =>
          product._id === action.payload._id ? action.payload : product,
        );
      }
    });
    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      state.productDetails = null;
    });
    builder.addCase(deleteAllProductsAsync.fulfilled, (state) => {
      state.list = null;
    });
    builder.addCase(updateProductStatusAsync.fulfilled, (state, action) => {
      const { id, status } = action.payload;
      if (state.list) {
        const index = state.list.findIndex((product) => product._id === id);
        if (index !== -1) {
          state.list[index].status = [status];
        }
      }
    });
    asyncMatcher(builder, ReducerName.PRODUCT);
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
