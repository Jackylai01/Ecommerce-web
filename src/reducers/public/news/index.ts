import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Metadata } from '@models/entities/shared/pagination';
import { NewsItem } from '@models/responses/news';
import { createSlice } from '@reduxjs/toolkit';
import {
  getAllPublicNewsAsync,
  getAllPublicNewsCategoriesAsync,
  getNewsByCategoryAsync,
  getPublicNewsItemByIdAsync,
  PublicNewsAction,
} from './actions';

type PublicNewsState = ApiState<PublicNewsAction> & {
  newsList: NewsItem[] | null;
  categories: any[] | null;
  newsItemDetails: NewsItem | null;
  metadata: Metadata | null;
};

const initialState: PublicNewsState = {
  newsList: null,
  categories: null,
  newsItemDetails: null,
  metadata: null,
  ...newApiState<PublicNewsState>(PublicNewsAction),
};

export const publicNewsSlice = createSlice({
  name: ReducerName.PUBLIC_NEWS,
  initialState,
  reducers: {
    resetNewsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPublicNewsAsync.fulfilled, (state, actions) => {
      state.newsList = actions.payload.data;
      state.metadata = actions.payload.metadata;
    });
    builder.addCase(
      getAllPublicNewsCategoriesAsync.fulfilled,
      (state, actions) => {
        state.categories = actions.payload;
      },
    );
    builder.addCase(getNewsByCategoryAsync.fulfilled, (state, actions) => {
      state.newsList = actions.payload;
    });
    builder.addCase(getPublicNewsItemByIdAsync.fulfilled, (state, actions) => {
      state.newsItemDetails = actions.payload;
    });
    asyncMatcher(builder, ReducerName.PUBLIC_NEWS);
  },
});

export const { resetNewsState } = publicNewsSlice.actions;

export default publicNewsSlice.reducer;
