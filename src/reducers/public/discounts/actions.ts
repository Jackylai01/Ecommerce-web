import { ReducerName } from '@enums/reducer-name';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetPublicDiscounts } from '@services/public/discounts';

export enum publicDiscountsAsyncAction {
  publicDiscounts = 'publicDiscounts',
}

export const getPublicDiscountsListAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_DISCOUNTS}/${publicDiscountsAsyncAction.publicDiscounts}`,
  async () => {
    const response = await apiGetPublicDiscounts();
    return response.result;
  },
);
