import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Metadata } from '@models/entities/shared/pagination';

import { Faq } from '@models/responses/faq.res';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addFaqAsync,
  deleteFaqAsync,
  FaqAction,
  getAllFaqsAsync,
  getFaqByIdAsync,
  updateFaqAsync,
} from './actions';

type FaqState = ApiState<FaqAction> & {
  list: Faq[] | null;
  metadata: Metadata | null;
  faqDetails: Faq | null;
  editingFaqId: string | null;
};

const initialState: FaqState = {
  list: null,
  metadata: null,
  faqDetails: null,
  editingFaqId: null,
  ...newApiState<FaqState>(FaqAction),
};

export const faqSlice = createSlice({
  name: ReducerName.ADMIN_FAQ,
  initialState,
  reducers: {
    resetFaqState: () => initialState,
    resetFaqDetailState: (state) => {
      state.faqDetails = null;
    },
    setEditingFaqId: (state, action: PayloadAction<string | null>) => {
      state.editingFaqId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllFaqsAsync.fulfilled, (state, action) => {
      state.list = action.payload.data;
      state.metadata = action.payload.metadata;
    });
    builder.addCase(getFaqByIdAsync.fulfilled, (state, action) => {
      state.faqDetails = action.payload;
    });
    builder.addCase(addFaqAsync.fulfilled, (state, action) => {
      if (state.list) state.list = [...state.list, action.payload];
    });
    builder.addCase(updateFaqAsync.fulfilled, (state, action) => {
      if (state.list && action.payload) {
        state.list = state.list.map((faq) =>
          faq._id === action.payload._id ? action.payload : faq,
        );
      }
    });
    builder.addCase(deleteFaqAsync.fulfilled, (state, action) => {
      if (state.list) {
        state.list = state.list.filter((faq) => faq._id !== action.payload);
      }
    });
    asyncMatcher(builder, ReducerName.ADMIN_FAQ);
  },
});

export const { resetFaqState, resetFaqDetailState, setEditingFaqId } =
  faqSlice.actions;

export default faqSlice.reducer;
