import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Metadata } from '@models/entities/shared/pagination';
import { Category } from '@models/entities/shared/products';
import { createSlice } from '@reduxjs/toolkit';
import {
  ProductCategoryAction,
  addProductCategoryAsync,
  deleteProductCategoryAsync,
  getAllProductsCategoryAsync,
  getProductCategoryByIdAsync,
  updateProductCategoryAsync,
} from './actions';

type ProductCategoryState = ApiState<ProductCategoryAction> & {
  list: Category[] | null;
  metadata: Metadata | null;
  categoryDetails: Category | null;
};

const initialState: ProductCategoryState = {
  list: null,
  metadata: null,
  categoryDetails: null,
  ...newApiState<ProductCategoryState>(ProductCategoryAction),
};

const productCategorySlice = createSlice({
  name: ReducerName.PRODUCT_CATEGORY,
  initialState,
  reducers: {
    resetCategoryState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProductsCategoryAsync.fulfilled, (state, action) => {
      state.list = action.payload.data;
      state.metadata = action.payload.metadata;
    });
    builder.addCase(getProductCategoryByIdAsync.fulfilled, (state, action) => {
      state.categoryDetails = action.payload;
    });
    builder.addCase(addProductCategoryAsync.fulfilled, (state, action) => {
      if (state.list) state.list = [...state.list, action.payload];
    });
    builder.addCase(updateProductCategoryAsync.fulfilled, (state, action) => {
      if (state.list) {
        state.list = state.list.map((category) =>
          category._id === action.payload._id ? action.payload : category,
        );
      }
    });
    builder.addCase(deleteProductCategoryAsync.fulfilled, (state, action) => {
      if (state.list) {
        state.list = state.list.filter(
          (category) => category._id !== action.payload,
        );
      }
    });

    asyncMatcher(builder, ReducerName.PRODUCT_CATEGORY);
  },
});

export const { resetCategoryState } = productCategorySlice.actions;
export default productCategorySlice.reducer;
