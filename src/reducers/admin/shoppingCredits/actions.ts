import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { QueryParams } from '@models/entities/shared/query';
import { ShoppingCredit } from '@models/responses/shoppingCredit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiAddBirthdayShoppingCredits,
  apiAddShoppingCredit,
  apiDeleteShoppingCredit,
  apiGetAllShoppingCredits,
  apiGetUserShoppingCredits,
  apiUpdateShoppingCreditStatus,
} from '@services/admin/admin-shoppingCredits/admin-shoppingCredits';

export enum ShoppingCreditsAction {
  getAllShoppingCredits = 'getAllShoppingCredits',
  getUserShoppingCredits = 'getUserShoppingCredits',
  addShoppingCredit = 'addShoppingCredit',
  addBirthdayShoppingCredits = 'addBirthdayShoppingCredits',
  updateShoppingCreditStatus = 'updateShoppingCreditStatus',
  deleteShoppingCredit = 'deleteShoppingCredit',
}

export const getAllShoppingCreditsAsync = createAsyncThunk(
  `${ReducerName.ADMIN_SHOPPING_CREDITS}/${ShoppingCreditsAction.getAllShoppingCredits}`,
  async ({ page, limit }: QueryParams) => {
    const query: PagingQuery = { page, limit };
    const response = await apiGetAllShoppingCredits(query);
    return response.result;
  },
);

export const getUserShoppingCreditsAsync = createAsyncThunk(
  `${ReducerName.ADMIN_SHOPPING_CREDITS}/${ShoppingCreditsAction.getUserShoppingCredits}`,
  async (userId: string) => {
    const response = await apiGetUserShoppingCredits(userId);
    return response.result.data;
  },
);

export const addShoppingCreditAsync = createAsyncThunk(
  `${ReducerName.ADMIN_SHOPPING_CREDITS}/${ShoppingCreditsAction.addShoppingCredit}`,
  async (body: ShoppingCredit) => {
    const response = await apiAddShoppingCredit(body);
    return response.result.data;
  },
);

export const addBirthdayShoppingCreditsAsync = createAsyncThunk(
  `${ReducerName.ADMIN_SHOPPING_CREDITS}/${ShoppingCreditsAction.addBirthdayShoppingCredits}`,
  async ({ userIds, amount }: { userIds: string[]; amount: number }) => {
    const response = await apiAddBirthdayShoppingCredits(amount, userIds);
    return response.result;
  },
);

export const updateShoppingCreditStatusAsync = createAsyncThunk(
  `${ReducerName.ADMIN_SHOPPING_CREDITS}/${ShoppingCreditsAction.updateShoppingCreditStatus}`,
  async ({ id, status }: { id: string; status: string }) => {
    const response = await apiUpdateShoppingCreditStatus(id, status);
    return response.result.data;
  },
);

export const deleteShoppingCreditAsync = createAsyncThunk(
  `${ReducerName.ADMIN_SHOPPING_CREDITS}/${ShoppingCreditsAction.deleteShoppingCredit}`,
  async (id: string) => {
    await apiDeleteShoppingCredit(id);
    return id;
  },
);
