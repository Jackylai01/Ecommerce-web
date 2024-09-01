import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiAddFaq,
  apiDeleteFaq,
  apiGetFaqById,
  apiGetFaqs,
  apiUpdateFaq,
} from '@services/admin/admin-faq/admin-faq';

export enum FaqAction {
  getAllFaqs = 'getAllFaqs',
  getFaqById = 'getFaqById',
  addFaq = 'addFaq',
  updateFaq = 'updateFaq',
  deleteFaq = 'deleteFaq',
}

export const getAllFaqsAsync = createAsyncThunk(
  `${ReducerName.ADMIN_FAQ}/${FaqAction.getAllFaqs}`,
  async (query: PagingQuery) => {
    const response = await apiGetFaqs(query);
    return response.result;
  },
);

export const getFaqByIdAsync = createAsyncThunk(
  `${ReducerName.ADMIN_FAQ}/${FaqAction.getFaqById}`,
  async (id: string) => {
    const response = await apiGetFaqById(id);
    return response.result.data;
  },
);

export const addFaqAsync = createAsyncThunk(
  `${ReducerName.ADMIN_FAQ}/${FaqAction.addFaq}`,
  async (body: any) => {
    const response = await apiAddFaq(body);
    return response.result.data;
  },
);

export const updateFaqAsync = createAsyncThunk(
  `${ReducerName.ADMIN_FAQ}/${FaqAction.updateFaq}`,
  async ({ id, body }: { id: string; body: any }) => {
    const response = await apiUpdateFaq(id, body);
    return response.result.data;
  },
);

export const deleteFaqAsync = createAsyncThunk(
  `${ReducerName.ADMIN_FAQ}/${FaqAction.deleteFaq}`,
  async (id: string) => {
    await apiDeleteFaq(id);
    return id;
  },
);
