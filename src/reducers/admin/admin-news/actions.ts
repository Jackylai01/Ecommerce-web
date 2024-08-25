import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiAddNewsItem,
  apiDeleteNewsItem,
  apiEditNewsItem,
  apiGetAllNewsItems,
  apiGetNewsItemById,
} from '@services/admin/admin-news/admin-news';

export enum NewsItemAction {
  addNewsItem = 'addNewsItem',
  getAllNewsItems = 'getAllNewsItems',
  getNewsItemById = 'getNewsItemById',
  editNewsItem = 'editNewsItem',
  deleteNewsItem = 'deleteNewsItem',
}

export const addNewsItemAsync = createAsyncThunk(
  `${ReducerName.ADMIN_NEWS_ITEMS}/${NewsItemAction.addNewsItem}`,
  async (body: FormData) => {
    const response = await apiAddNewsItem(body);
    return response.result.data;
  },
);

export const getAllNewsItemsAsync = createAsyncThunk(
  `${ReducerName.ADMIN_NEWS_ITEMS}/${NewsItemAction.getAllNewsItems}`,
  async (query: PagingQuery) => {
    const response = await apiGetAllNewsItems(query);
    return response.result;
  },
);

export const getNewsItemByIdAsync = createAsyncThunk(
  `${ReducerName.ADMIN_NEWS_ITEMS}/${NewsItemAction.getNewsItemById}`,
  async (newsItemId: string) => {
    const response = await apiGetNewsItemById(newsItemId);
    return response.result.data;
  },
);

export const editNewsItemAsync = createAsyncThunk(
  `${ReducerName.ADMIN_NEWS_ITEMS}/${NewsItemAction.editNewsItem}`,
  async ({ newsItemId, body }: { newsItemId: string; body: FormData }) => {
    const response = await apiEditNewsItem(newsItemId, body);
    return response.result.data;
  },
);

export const deleteNewsItemAsync = createAsyncThunk(
  `${ReducerName.ADMIN_NEWS_ITEMS}/${NewsItemAction.deleteNewsItem}`,
  async (newsItemId: string) => {
    await apiDeleteNewsItem(newsItemId);
    return newsItemId;
  },
);
