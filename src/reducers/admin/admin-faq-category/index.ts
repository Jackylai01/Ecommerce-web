import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Metadata } from '@models/entities/shared/pagination';

import { FaqCategory } from '@models/responses/faq.res';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addFaqCategoryAsync,
  deleteFaqCategoryAsync,
  FaqCategoryAction,
  getAllFaqCategoriesAsync,
  getFaqCategoryByIdAsync,
  updateFaqCategoryAsync,
} from './actions';

type FaqCategoryState = ApiState<FaqCategoryAction> & {
  list: FaqCategory[] | null;
  metadata: Metadata | null;
  categoryDetails: FaqCategory | null;
  editingCategoryId: string | null;
};

const initialState: FaqCategoryState = {
  list: null,
  metadata: null,
  categoryDetails: null,
  editingCategoryId: null,
  ...newApiState<FaqCategoryState>(FaqCategoryAction),
};

export const faqCategorySlice = createSlice({
  name: ReducerName.ADMIN_FAQ_CATEGORY,
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
    builder.addCase(getAllFaqCategoriesAsync.fulfilled, (state, action) => {
      state.list = action.payload.data;
      state.metadata = action.payload.metadata;
    });
    builder.addCase(getFaqCategoryByIdAsync.fulfilled, (state, action) => {
      state.categoryDetails = action.payload;
    });
    builder.addCase(addFaqCategoryAsync.fulfilled, (state, action) => {
      if (state.list) state.list = [...state.list, action.payload];
    });
    builder.addCase(updateFaqCategoryAsync.fulfilled, (state, action) => {
      if (state.list && action.payload) {
        state.list = state.list.map((category) =>
          category._id === action.payload._id ? action.payload : category,
        );
      }
    });
    builder.addCase(deleteFaqCategoryAsync.fulfilled, (state, action) => {
      if (state.list) {
        state.list = state.list.filter(
          (category) => category._id !== action.payload,
        );
      }
    });
    asyncMatcher(builder, ReducerName.ADMIN_FAQ_CATEGORY);
  },
});

export const {
  resetCategoryState,
  resetCategoryDetailState,
  setEditingCategoryId,
} = faqCategorySlice.actions;

export default faqCategorySlice.reducer;
