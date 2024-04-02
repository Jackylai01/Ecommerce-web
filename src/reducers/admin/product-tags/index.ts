import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Metadata } from '@models/entities/shared/pagination';
import { Tags } from '@models/entities/shared/products';
import { createSlice } from '@reduxjs/toolkit';
import {
  ProductTagsAction,
  addProductTagsAsync,
  deleteProductTagsAsync,
  getAllProductsTagsAsync,
  getProductTagsByIdAsync,
  updateProductTagsAsync,
} from './actions';

type ProductTagsState = ApiState<ProductTagsAction> & {
  list: Tags[] | null;
  metadata: Metadata | null;
  tagsDetails: any;
};

const initialState: ProductTagsState = {
  list: null,
  metadata: null,
  tagsDetails: null,
  ...newApiState<ProductTagsState>(ProductTagsAction),
};

const productTagsSlice = createSlice({
  name: ReducerName.PRODUCT_TAGS,
  initialState,
  reducers: {
    resetTagsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProductsTagsAsync.fulfilled, (state, action) => {
      state.list = action.payload.data;
      state.metadata = action.payload.metadata;
    });
    builder.addCase(getProductTagsByIdAsync.fulfilled, (state, action) => {
      state.tagsDetails = action.payload;
    });
    builder.addCase(addProductTagsAsync.fulfilled, (state, action) => {
      if (state.list) state.list = [...state.list, action.payload];
    });
    builder.addCase(updateProductTagsAsync.fulfilled, (state, action) => {
      if (state.list && action.payload) {
        state.list = state.list.map((tag) =>
          tag._id === action.payload._id ? action.payload : tag,
        );
      }
    });
    builder.addCase(deleteProductTagsAsync.fulfilled, (state, action) => {
      if (state.list) {
        state.list = state.list.filter((tag) => tag._id !== action.payload);
      }
    });

    asyncMatcher(builder, ReducerName.PRODUCT_TAGS);
  },
});

export const { resetTagsState } = productTagsSlice.actions;
export default productTagsSlice.reducer;
