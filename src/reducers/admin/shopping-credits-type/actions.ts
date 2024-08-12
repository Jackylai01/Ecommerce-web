import { ReducerName } from '@enums/reducer-name';
import { ShoppingCreditType } from '@models/responses/shoppingCreditType.res';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiAddShoppingCreditType,
  apiDeleteShoppingCreditType,
  apiGetAllShoppingCreditTypes,
  apiUpdateShoppingCreditType,
} from '@services/admin/admin-shopping-credits-type/admin-shopping-credits-type';

export enum ShoppingCreditTypesAction {
  getAllShoppingCreditTypes = 'getAllShoppingCreditTypes',
  addShoppingCreditType = 'addShoppingCreditType',
  updateShoppingCreditType = 'updateShoppingCreditType',
  deleteShoppingCreditType = 'deleteShoppingCreditType',
}

export const getAllShoppingCreditTypesAsync = createAsyncThunk(
  `${ReducerName.ADMIN_SHOPPING_CREDITS_TYPE}/${ShoppingCreditTypesAction.getAllShoppingCreditTypes}`,
  async () => {
    const response = await apiGetAllShoppingCreditTypes();
    return response.result.data;
  },
);

export const addShoppingCreditTypeAsync = createAsyncThunk(
  `${ReducerName.ADMIN_SHOPPING_CREDITS_TYPE}/${ShoppingCreditTypesAction.addShoppingCreditType}`,
  async (body: ShoppingCreditType) => {
    const response = await apiAddShoppingCreditType(body);
    return response.result.data;
  },
);

export const updateShoppingCreditTypeAsync = createAsyncThunk(
  `${ReducerName.ADMIN_SHOPPING_CREDITS_TYPE}/${ShoppingCreditTypesAction.updateShoppingCreditType}`,
  async ({ id, body }: { id: string; body: ShoppingCreditType }) => {
    const response = await apiUpdateShoppingCreditType(id, body);
    return response.result.data;
  },
);

export const deleteShoppingCreditTypeAsync = createAsyncThunk(
  `${ReducerName.ADMIN_SHOPPING_CREDITS_TYPE}/${ShoppingCreditTypesAction.deleteShoppingCreditType}`,
  async (id: string) => {
    await apiDeleteShoppingCreditType(id);
    return id;
  },
);
