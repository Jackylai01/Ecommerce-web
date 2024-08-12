import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { ShoppingCredit } from '@models/responses/shoppingCredit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiAddBirthdayShoppingCredits,
  apiAddShoppingCredit,
  apiAddShoppingCreditsForMembershipLevel,
  apiDeleteExpiredShoppingCredits,
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
  deleteExpiredShoppingCredits = 'deleteExpiredShoppingCredits',
  addShoppingCreditsForMembershipLevel = 'addShoppingCreditsForMembershipLevel',
}

export const getAllShoppingCreditsAsync = createAsyncThunk(
  `${ReducerName.ADMIN_SHOPPING_CREDITS}/${ShoppingCreditsAction.getAllShoppingCredits}`,
  async ({
    page,
    limit,
    search,
    status,
  }: {
    page: number;
    limit: number;
    search?: string;
    status?: string;
  }) => {
    const query: PagingQuery = { page, limit, search, status };
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
  async ({
    userIds,
    amount,
    expiryDate,
  }: {
    userIds: string[];
    amount: number;
    expiryDate: Date;
  }) => {
    const response = await apiAddBirthdayShoppingCredits(
      amount,
      userIds,
      expiryDate,
    );
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

export const deleteExpiredShoppingCreditsAsync = createAsyncThunk(
  `${ReducerName.ADMIN_SHOPPING_CREDITS}/${ShoppingCreditsAction.deleteExpiredShoppingCredits}`,
  async () => {
    const response = await apiDeleteExpiredShoppingCredits();
    return response.result;
  },
);

export const addShoppingCreditsForMembershipLevelAsync = createAsyncThunk(
  `${ReducerName.ADMIN_SHOPPING_CREDITS}/${ShoppingCreditsAction.addShoppingCreditsForMembershipLevel}`,
  async (body: ShoppingCredit) => {
    const response = await apiAddShoppingCreditsForMembershipLevel(body);
    return response.result;
  },
);
