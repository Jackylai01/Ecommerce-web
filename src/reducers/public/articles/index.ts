import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { createSlice } from '@reduxjs/toolkit';
import {
  ArticleAsyncAction,
  getArticleByIdAsync,
  getArticleCategoriesAsync,
  getArticlesListAsync,
  getArticlesListByCategoryAsync,
  getTrendingArticlesAsync,
} from './actions';

import { Metadata } from '@models/entities/shared/pagination';
import {
  ArticleCategoryPublicResponse,
  ArticlePublicResponse,
} from '@models/responses/article.res';

type ArticleState = ApiState<ArticleAsyncAction> & {
  list: ArticlePublicResponse[] | null;
  articlesCategory: any;
  metadata: Metadata | undefined;
  articlesCategoryMetadata: Metadata | undefined;
  article: ArticlePublicResponse | null;
  trendingArticles: ArticlePublicResponse[] | null;
  categories: ArticleCategoryPublicResponse[] | null;
};

const initialState: ArticleState = {
  list: null,
  metadata: undefined,
  articlesCategory: null,
  articlesCategoryMetadata: undefined,
  article: null,
  trendingArticles: null,
  categories: null,
  ...newApiState<ArticleState>(ArticleAsyncAction),
};

const publicArticleSlice = createSlice({
  name: ReducerName.PUBLIC_ARTICLES,
  initialState,
  reducers: {
    resetArticleState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getArticlesListAsync.fulfilled, (state, action) => {
      state.list = action.payload.data;
      state.metadata = action.payload.metadata;
    });
    builder.addCase(getArticleByIdAsync.fulfilled, (state, action) => {
      state.article = action.payload;
    });
    builder.addCase(getTrendingArticlesAsync.fulfilled, (state, action) => {
      state.trendingArticles = action.payload;
    });
    builder.addCase(getArticleCategoriesAsync.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(
      getArticlesListByCategoryAsync.fulfilled,
      (state, action) => {
        state.articlesCategory = action.payload.data;
        state.articlesCategoryMetadata = action.payload.metadata;
      },
    );

    asyncMatcher(builder, ReducerName.PUBLIC_ARTICLES);
  },
});

export const { resetArticleState } = publicArticleSlice.actions;
export default publicArticleSlice.reducer;
