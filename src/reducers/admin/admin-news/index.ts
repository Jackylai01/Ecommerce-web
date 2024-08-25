import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { NewsItem } from '@models/responses/news';
import { createSlice } from '@reduxjs/toolkit';
import {
  addNewsItemAsync,
  deleteNewsItemAsync,
  editNewsItemAsync,
  getAllNewsItemsAsync,
  getNewsItemByIdAsync,
  NewsItemAction,
} from './actions';

type NewsItemState = ApiState<NewsItemAction> & {
  list: NewsItem[] | null;
  itemDetails: NewsItem | null;
};

const initialState: NewsItemState = {
  list: null,
  itemDetails: null,
  ...newApiState<NewsItemState>(NewsItemAction),
};

export const newsItemSlice = createSlice({
  name: ReducerName.ADMIN_NEWS_ITEMS,
  initialState,
  reducers: {
    resetNewsItemState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllNewsItemsAsync.fulfilled, (state, action) => {
      state.list = action.payload.data;
    });
    builder.addCase(getNewsItemByIdAsync.fulfilled, (state, action) => {
      state.itemDetails = action.payload;
    });
    builder.addCase(addNewsItemAsync.fulfilled, (state, action) => {
      if (state.list) state.list = [...state.list, action.payload];
    });
    builder.addCase(editNewsItemAsync.fulfilled, (state, action) => {
      if (state.list && action.payload) {
        state.list = state.list.map((item) =>
          item._id === action.payload._id ? action.payload : item,
        );
      }
    });
    builder.addCase(deleteNewsItemAsync.fulfilled, (state, action) => {
      if (state.list) {
        state.list = state.list.filter((item) => item._id !== action.payload);
      }
    });
    asyncMatcher(builder, ReducerName.ADMIN_NEWS_ITEMS);
  },
});

export const { resetNewsItemState } = newsItemSlice.actions;
export default newsItemSlice.reducer;
