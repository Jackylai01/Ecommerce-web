import { Metadata } from '@models/entities/shared/pagination';
import { ArticlesCategory } from '@models/responses/articleCategory.res';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addCategoryAsync,
  deleteCategoryAsync,
  getAllCategoriesAsync,
  getCategoryByIdAsync,
  updateCategoryAsync,
} from './actions';

type CategoryState = {
  list: ArticlesCategory[] | null;
  metadata: Metadata | null;
  categoryDetails: ArticlesCategory | null;
  editingCategoryId: string | null;
};

const initialState: CategoryState = {
  list: null,
  metadata: null,
  categoryDetails: null,
  editingCategoryId: null,
};

export const categorySlice = createSlice({
  name: 'adminCategory',
  initialState,
  reducers: {
    resetCategoryState: () => initialState,
    resetCategoryDetailState: (state) => {
      state.categoryDetails = null;
    },
    setEditingCategoryId: (state, action: PayloadAction<string | null>) => {
      state.editingCategoryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCategoriesAsync.fulfilled, (state, action) => {
      state.list = action.payload.data;
      state.metadata = action.payload.metadata;
    });
    builder.addCase(getCategoryByIdAsync.fulfilled, (state, action) => {
      state.categoryDetails = action.payload;
    });
    builder.addCase(addCategoryAsync.fulfilled, (state, action) => {
      if (state.list) state.list = [...state.list, action.payload];
    });
    builder.addCase(updateCategoryAsync.fulfilled, (state, action) => {
      if (state.list && action.payload) {
        state.list = state.list.map((category) =>
          category._id === action.payload._id ? action.payload : category,
        );
      }
    });
    builder.addCase(deleteCategoryAsync.fulfilled, (state, action) => {
      if (state.list) {
        state.list = state.list.filter(
          (category) => category._id !== action.payload,
        );
      }
    });
  },
});

export const {
  resetCategoryState,
  resetCategoryDetailState,
  setEditingCategoryId,
} = categorySlice.actions;

export default categorySlice.reducer;
