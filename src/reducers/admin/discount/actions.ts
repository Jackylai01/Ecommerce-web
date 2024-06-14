import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { QueryParams } from '@models/entities/shared/query';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiAddDiscount,
  apiDeleteDiscount,
  apiGetDiscountById,
  apiGetDiscounts,
  apiUpdateDiscount,
} from '@services/admin/admin-discount/admin-discount';

export enum DiscountAction {
  getAllDiscounts = 'getAllDiscounts',
  getDiscountById = 'getDiscountById',
  addDiscount = 'addDiscount',
  updateDiscount = 'updateDiscount',
  deleteDiscount = 'deleteDiscount',
}

export const getAllDiscountsAsync = createAsyncThunk(
  `${ReducerName.ADMIN_DISCOUNT}/${DiscountAction.getAllDiscounts}`,
  async ({ page, limit }: QueryParams) => {
    const query: PagingQuery = { page, limit };
    const response = await apiGetDiscounts(query);
    return response.result;
  },
);

export const getDiscountByIdAsync = createAsyncThunk(
  `${ReducerName.ADMIN_DISCOUNT}/${DiscountAction.getDiscountById}`,
  async (id: any) => {
    const response = await apiGetDiscountById(id);
    return response.result.data;
  },
);

export const addDiscountAsync = createAsyncThunk(
  `${ReducerName.ADMIN_DISCOUNT}/${DiscountAction.addDiscount}`,
  async (body: any) => {
    const response = await apiAddDiscount(body);
    return response.result.data;
  },
);

export const updateDiscountAsync = createAsyncThunk(
  `${ReducerName.ADMIN_DISCOUNT}/${DiscountAction.updateDiscount}`,
  async ({ id, body }: { id: string; body: any }) => {
    const response = await apiUpdateDiscount(id, body);
    return response.result.data;
  },
);

export const deleteDiscountAsync = createAsyncThunk(
  `${ReducerName.ADMIN_DISCOUNT}/${DiscountAction.deleteDiscount}`,
  async (id: string) => {
    await apiDeleteDiscount(id);
    return id;
  },
);
