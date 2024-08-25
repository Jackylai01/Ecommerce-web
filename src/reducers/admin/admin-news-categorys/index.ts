import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { createSlice } from '@reduxjs/toolkit';
import {
  addNewsCategoryAsync,
  deleteNewsCategoryAsync,
  editNewsCategoryAsync,
  getAllNewsCategoriesAsync,
  getNewsCategoryByIdAsync,
  NewsCategoryAction,
} from './actions';

type NewsCategoryState = ApiState<NewsCategoryAction> & {
  list: any[] | null;
  categoryDetails: any | null;
};

const initialState: NewsCategoryState = {
  list: null,
  categoryDetails: null,
  ...newApiState<NewsCategoryState>(NewsCategoryAction),
};

export const newsCategorySlice = createSlice({
  name: ReducerName.ADMIN_NEWS_CATEGORY,
  initialState,
  reducers: {
    resetNewsCategoryState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllNewsCategoriesAsync.fulfilled, (state, action) => {
      state.list = action.payload.data;
    });
    builder.addCase(getNewsCategoryByIdAsync.fulfilled, (state, action) => {
      state.categoryDetails = action.payload;
    });
    builder.addCase(addNewsCategoryAsync.fulfilled, (state, action) => {
      if (state.list) state.list = [...state.list, action.payload];
    });
    builder.addCase(editNewsCategoryAsync.fulfilled, (state, action) => {
      if (state.list && action.payload) {
        state.list = state.list.map((category) =>
          category._id === action.payload._id ? action.payload : category,
        );
      }
    });
    builder.addCase(deleteNewsCategoryAsync.fulfilled, (state, action) => {
      if (state.list) {
        state.list = state.list.filter(
          (category) => category._id !== action.payload,
        );
      }
    });
    asyncMatcher(builder, ReducerName.ADMIN_NEWS_CATEGORY);
  },
});

export const { resetNewsCategoryState } = newsCategorySlice.actions;
export default newsCategorySlice.reducer;
