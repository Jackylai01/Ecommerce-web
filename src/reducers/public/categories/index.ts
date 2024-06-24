import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Metadata } from '@models/entities/shared/pagination';
import { CategoryResponse } from '@models/responses/category.res';
import { createSlice } from '@reduxjs/toolkit';
import { CategoryAsyncAction, getCategoriesListAsync } from './actions';

type CategoryState = ApiState<CategoryAsyncAction> & {
  list: CategoryResponse[] | null;
  metadata: Metadata | undefined;
};

const initialState: CategoryState = {
  list: null,
  metadata: undefined,
  ...newApiState<CategoryState>(CategoryAsyncAction),
};

const publicCategorySlice = createSlice({
  name: ReducerName.PUBLIC_CATEGORIES,
  initialState,
  reducers: {
    resetCategoryState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getCategoriesListAsync.fulfilled, (state, action) => {
      state.list = action.payload.data;
      state.metadata = action.payload.metadata;
    });

    asyncMatcher(builder, ReducerName.PUBLIC_CATEGORIES);
  },
});

export const { resetCategoryState } = publicCategorySlice.actions;
export default publicCategorySlice.reducer;
