import { ReducerName } from '@enums/reducer-name';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiPublicGetFaqs } from '@services/public/faq/faq';

export enum FaqAsyncAction {
  faqsList = 'faqsList',
}

/**
 * 前台顯示常見問題列表
 */
export const getFaqsListAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_FAQS}/${FaqAsyncAction.faqsList}`,
  async () => {
    const response = await apiPublicGetFaqs();
    return response.result.data;
  },
);
