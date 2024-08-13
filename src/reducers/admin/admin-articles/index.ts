import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { createSlice } from '@reduxjs/toolkit';
import {
  addArticleAsync,
  addCommentToArticleAsync,
  ArticleAction,
  deleteArticleAsync,
  editArticleAsync,
  getAllArticlesAsync,
  getArticleByIdAsync,
} from './actions';

type ArticleState = ApiState<ArticleAction> & {
  list: any[] | null;
  articleDetails: any | null;
  editingArticleId: string | null;
};

const initialState: ArticleState = {
  list: null,
  articleDetails: null,
  editingArticleId: null,
  ...newApiState<ArticleState>(ArticleAction),
};

export const articleSlice = createSlice({
  name: ReducerName.ADMIN_ARTICLES,
  initialState,
  reducers: {
    resetArticleState: () => initialState,
    setEditingArticleId: (state, action) => {
      state.editingArticleId = action.payload;
    },
    resetEditingArticleId: (state) => {
      state.editingArticleId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllArticlesAsync.fulfilled, (state, action) => {
      state.list = action.payload.data;
    });
    builder.addCase(getArticleByIdAsync.fulfilled, (state, action) => {
      state.articleDetails = action.payload;
    });
    builder.addCase(addArticleAsync.fulfilled, (state, action) => {
      if (state.list) state.list = [...state.list, action.payload];
    });
    builder.addCase(editArticleAsync.fulfilled, (state, action) => {
      if (state.list && action.payload) {
        state.list = state.list.map((article) =>
          article._id === action.payload._id ? action.payload : article,
        );
      }
    });
    builder.addCase(deleteArticleAsync.fulfilled, (state, action) => {
      if (state.list) {
        state.list = state.list.filter(
          (article) => article._id !== action.payload,
        );
      }
    });
    builder.addCase(addCommentToArticleAsync.fulfilled, (state, action) => {
      const { articleId, comment } = action.payload as any;
      if (state.articleDetails && state.articleDetails._id === articleId) {
        state.articleDetails.comments = [
          ...state.articleDetails.comments,
          comment,
        ];
      }
    });
    asyncMatcher(builder, ReducerName.ADMIN_ARTICLES);
  },
});

export const { resetArticleState, setEditingArticleId, resetEditingArticleId } =
  articleSlice.actions;

export default articleSlice.reducer;
