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
  deleteProductImageAsync,
  getAllProductsAsync,
  getProductByIdAsync,
  updateProductAsync,
  updateProductStatusAsync,
} from './actions';

type ProductState = ApiState<ProductAction> & {
  list: Product[] | null;
  metadata: Metadata | null;
  productDetails: Product | null;
  editingProductId: string | null;
  updateProductStatusSuccess: boolean;
};

const initialState: ProductState = {
  list: null,
  metadata: null,
  productDetails: null,
  editingProductId: null,
  updateProductStatusSuccess: false,
  ...newApiState<ProductState>(ProductAction),
};

const productSlice = createSlice({
  name: ReducerName.PRODUCT,
  initialState,
  reducers: {
    resetProductState: () => initialState,
    resetProductDetails: (state) => {
      state.productDetails = null;
    },
    setEditingProductId: (state, action) => {
      state.editingProductId = action.payload;
    },

    resetEditingProductId: (state) => {
      state.editingProductId = null;
    },
    updateProductDetailDescription: (state, action) => {
      if (state.productDetails) {
        state.productDetails.detailDescription = action.payload;
      }
    },
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
      if (state.list) {
        state.list = state.list.filter(
          (product) => product._id !== action.payload,
        );
      }
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
    builder.addCase(deleteProductImageAsync.fulfilled, (state, action) => {
      const { productId, imageId } = action.meta.arg;
      if (state.productDetails && state.productDetails._id === productId) {
        state.productDetails.images = state.productDetails.images.filter(
          (image) => image.imageId !== imageId,
        );
      }
    });
    asyncMatcher(builder, ReducerName.PRODUCT);
  },
});

export const {
  resetProductState,
  resetProductDetails,
  setEditingProductId,
  resetEditingProductId,
  updateProductDetailDescription,
} = productSlice.actions;
export default productSlice.reducer;
