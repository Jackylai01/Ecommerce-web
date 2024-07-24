import { ShoppingCredit } from '@models/responses/shoppingCredit';
import { ApiListResult, getRequest } from '../../shared/api';

/**
 * 獲取全部訂單
 */
export const apiClientUserShoppingCredits = async (userId: string) =>
  getRequest<ApiListResult<ShoppingCredit>>(
    `/client/shoppingCredits/${userId}`,
  );
