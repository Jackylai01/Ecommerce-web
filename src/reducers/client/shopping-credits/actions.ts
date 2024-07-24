import { ReducerName } from '@enums/reducer-name';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClientUserShoppingCredits } from '@services/client/client-shopping-credits/client-shopping-credits';

export enum clientUserShoppingCreditsAction {
  userShoppingCredits = 'userShoppingCredits',
}

export const clientUserShoppingCreditsAsync = createAsyncThunk(
  `${ReducerName.CLIENT_SHOPPING_CREDITS}/${clientUserShoppingCreditsAction.userShoppingCredits}`,
  async (userId: string) => {
    const response = await apiClientUserShoppingCredits(userId);
    return response.result;
  },
);
