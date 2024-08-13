import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Metadata } from '@models/entities/shared/pagination';
import { ArticlesCategory } from '@models/responses/articleCategory.res';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addArticleCategoryAsync,
  ArticleCategoryAction,
  deleteArticleCategoryAsync,
  getAllArticleCategoriesAsync,
  getArticleCategoryByIdAsync,
  updateArticleCategoryAsync,
} from './actions';

type ArticleCategoryState = ApiState<ArticleCategoryAction> & {
  list: ArticlesCategory[] | null;
  metadata: Metadata | null;
  categoryDetails: ArticlesCategory | null;
  editingCategoryId: string | null;
};

const initialState: ArticleCategoryState = {
  list: null,
  metadata: null,
  categoryDetails: null,
  editingCategoryId: null,
  ...newApiState<ArticleCategoryState>(ArticleCategoryAction),
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
    builder.addCase(getAllArticleCategoriesAsync.fulfilled, (state, action) => {
      state.list = action.payload.data;
      state.metadata = action.payload.metadata;
    });
    builder.addCase(getArticleCategoryByIdAsync.fulfilled, (state, action) => {
      state.categoryDetails = action.payload;
    });
    builder.addCase(addArticleCategoryAsync.fulfilled, (state, action) => {
      if (state.list) state.list = [...state.list, action.payload];
    });
    builder.addCase(updateArticleCategoryAsync.fulfilled, (state, action) => {
      if (state.list && action.payload) {
        state.list = state.list.map((category) =>
          category._id === action.payload._id ? action.payload : category,
        );
      }
    });
    builder.addCase(deleteArticleCategoryAsync.fulfilled, (state, action) => {
      if (state.list) {
        state.list = state.list.filter(
          (category) => category._id !== action.payload,
        );
      }
    });
    asyncMatcher(builder, ReducerName.ADMIN_ARTICLES_CATEGORY);
  },
});

export const {
  resetCategoryState,
  resetCategoryDetailState,
  setEditingCategoryId,
} = categorySlice.actions;

export default categorySlice.reducer;
