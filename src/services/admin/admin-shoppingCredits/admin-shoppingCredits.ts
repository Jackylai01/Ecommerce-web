import { formatQueryString } from '@helpers/query';
import { PagingQuery } from '@models/entities/shared/pagination';
import { ShoppingCredit } from '@models/responses/shoppingCredit';
import {
  ApiPaginationResult,
  ApiResult,
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../shared/api';

/**
 * 獲取全部購物金
 */
export const apiGetAllShoppingCredits = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<ShoppingCredit>>(
    formatQueryString('/zigong/shoppingCredits', query),
  );

/**
 * 根據userId 取得購物金
 */
export const apiGetUserShoppingCredits = async (userId: string) => {
  return getRequest<ApiResult<ShoppingCredit[]>>(
    `/zigong/shoppingCredits/${userId}`,
  );
};

/**
 * 新增購物金
 */
export const apiAddShoppingCredit = async (body: ShoppingCredit) => {
  return postRequest<ApiResult<ShoppingCredit>>(
    '/zigong/shoppingCredits',
    body,
  );
};

/**
 * 批量新增生日購物金
 */
export const apiAddBirthdayShoppingCredits = async (
  amount: number,
  userIds: string[],
  expiryDate: Date,
) => {
  return postRequest<ApiResult<any>>('/zigong/shoppingCredits/batch/birthday', {
    amount,
    userIds,
    expiryDate,
  });
};

/**
 * 更新購物金狀態
 */
export const apiUpdateShoppingCreditStatus = async (
  id: string,
  status: string,
) => {
  return putRequest<ApiResult<ShoppingCredit>>('/zigong/shoppingCredits', {
    id,
    status,
  });
};

/**
 * 刪除購物金
 */
export const apiDeleteShoppingCredit = async (id: string) => {
  return deleteRequest<ApiResult<ShoppingCredit>>(
    `/zigong/shoppingCredits/${id}`,
  );
};

/**
 * 刪除過期的購物金
 */
export const apiDeleteExpiredShoppingCredits = async () => {
  return deleteRequest<ApiResult<ShoppingCredit>>('/zigong/shoppingCredits');
};
