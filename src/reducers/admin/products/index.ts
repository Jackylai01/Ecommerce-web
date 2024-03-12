import { ReducerName } from '@enums/reducer-name';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
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
} from './actions';

type ProductState = ApiState & {
  list: Product[] | null;
  productDetails: Product | null;
};

const initialState: ProductState = {
  list: null,
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
    builder
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(getProductByIdAsync.fulfilled, (state, action) => {
        state.productDetails = action.payload;
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        // 假設list已存在，將新產品添加到列表中
        state.list = state.list
          ? [...state.list, action.payload]
          : [action.payload];
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        // 更新產品列表中的對應產品
        if (state.list) {
          state.list = state.list.map((product) =>
            product._id === action.payload._id ? action.payload : product,
          );
        }
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        if (state.list) {
          state.list = state.list.filter(
            (product) => product._id !== action.payload,
          );
        }
      })
      .addCase(deleteAllProductsAsync.fulfilled, (state) => {
        state.list = null;
      });
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
