import { IFavorites } from '@models/requests/favorites.req';
import { ApiListResult, getRequest, postRequest } from '../../shared/api';

/**
 * 前台-新增到我的最愛
 */
export const apiPublicAddProductsFavorites = async (data: any) =>
  postRequest<ApiListResult<IFavorites>>('/public/favorites/add', data);

/**
 * 前台-刪除我的最愛
 */
export const apiPublicRemoveProductsFavorites = async (data: any) =>
  postRequest<ApiListResult<IFavorites>>(`/public/favorites/remove`, data);

/**
 * 前台-取得單個我的最愛產品
 */

export const apiPublicGetProductsFavorites = async (userId: string) =>
  getRequest<ApiListResult<IFavorites>>(`/public/favorites/${userId}`);

/**
 * 前台-刪除全部的我的最愛
 */
export const apiPublicClearFavorites = async (userId: string) =>
  postRequest<ApiListResult<IFavorites>>(`/public/favorites/clear-favorites`, {
    userId,
  });
