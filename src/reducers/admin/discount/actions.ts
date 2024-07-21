import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { QueryParams } from '@models/entities/shared/query';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiAddDiscount,
  apiApplyDiscountToOrder,
  apiDeleteDiscount,
  apiGenerateDiscountCode,
  apiGenerateMultipleDiscountCodes,
  apiGetAllDiscountsUsage,
  apiGetDiscountById,
  apiGetDiscountUsageByCode,
  apiGetDiscounts,
  apiUpdateDiscount,
  apiUpdateDiscountStatus,
} from '@services/admin/admin-discount/admin-discount';

export enum DiscountAction {
  getAllDiscounts = 'getAllDiscounts',
  getDiscountById = 'getDiscountById',
  addDiscount = 'addDiscount',
  updateDiscount = 'updateDiscount',
  deleteDiscount = 'deleteDiscount',
  updateDiscountStatus = 'updateDiscountStatus',
  generateDiscountCode = 'generateDiscountCode',
  applyDiscountToOrder = 'applyDiscountToOrder',
  getDiscountUsageByCode = 'getDiscountUsageByCode',
  getAllDiscountsUsage = 'getAllDiscountsUsage',
  generateMultipleDiscountCodes = 'generateMultipleDiscountCodes',
  updateDiscountPriority = 'updateDiscountPriority',
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

export const updateDiscountStatusAsync = createAsyncThunk(
  `${ReducerName.ADMIN_DISCOUNT}/${DiscountAction.updateDiscountStatus}`,
  async ({ id, isActive }: { id: string; isActive: boolean }) => {
    const response = await apiUpdateDiscountStatus(id, { isActive });
    return response.result.data;
  },
);

export const generateDiscountCodeAsync = createAsyncThunk(
  `${ReducerName.ADMIN_DISCOUNT}/${DiscountAction.generateDiscountCode}`,
  async ({
    discountId,
    usageLimit,
  }: {
    discountId: string;
    usageLimit: number;
  }) => {
    const response = await apiGenerateDiscountCode({ discountId, usageLimit });
    return response.result.data;
  },
);

export const applyDiscountToOrderAsync = createAsyncThunk(
  `${ReducerName.ADMIN_DISCOUNT}/${DiscountAction.applyDiscountToOrder}`,
  async ({ orderId, discountId }: { orderId: string; discountId: string }) => {
    const response = await apiApplyDiscountToOrder({ orderId, discountId });
    return response.result.data;
  },
);

export const getDiscountUsageByCodeAsync = createAsyncThunk(
  `${ReducerName.ADMIN_DISCOUNT}/${DiscountAction.getDiscountUsageByCode}`,
  async (code: string) => {
    const response = await apiGetDiscountUsageByCode(code);
    return response.result.data;
  },
);

export const getAllDiscountsUsageAsync = createAsyncThunk(
  `${ReducerName.ADMIN_DISCOUNT}/${DiscountAction.getAllDiscountsUsage}`,
  async ({ page, limit }: QueryParams) => {
    const query: PagingQuery = { page, limit };
    const response = await apiGetAllDiscountsUsage(query);
    return response.result;
  },
);

export const generateMultipleDiscountCodesAsync = createAsyncThunk(
  `${ReducerName.ADMIN_DISCOUNT}/${DiscountAction.generateMultipleDiscountCodes}`,
  async ({ count, usageLimit }: { count: number; usageLimit: number }) => {
    const response = await apiGenerateMultipleDiscountCodes({
      count,
      usageLimit,
    });
    return response.result.data;
  },
);
