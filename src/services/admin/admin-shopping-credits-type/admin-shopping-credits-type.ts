import { ShoppingCreditType } from '@models/responses/shoppingCreditType.res';
import {
  ApiResult,
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../shared/api';

/**
 * 獲取所有購物金類別
 */
export const apiGetAllShoppingCreditTypes = async () => {
  return getRequest<ApiResult<ShoppingCreditType[]>>(
    '/zigong/shopping-credit-types',
  );
};

/**
 * 新增購物金類別
 */
export const apiAddShoppingCreditType = async (body: ShoppingCreditType) => {
  return postRequest<ApiResult<ShoppingCreditType>>(
    '/zigong/shopping-credit-types',
    body,
  );
};

/**
 * 更新購物金類別
 */
export const apiUpdateShoppingCreditType = async (
  id: string,
  body: ShoppingCreditType,
) => {
  return putRequest<ApiResult<ShoppingCreditType>>(
    `/zigong/shopping-credit-types/${id}`,
    body,
  );
};

/**
 * 刪除購物金類別
 */
export const apiDeleteShoppingCreditType = async (id: string) => {
  return deleteRequest<ApiResult<ShoppingCreditType>>(
    `/zigong/shopping-credit-types/${id}`,
  );
};
