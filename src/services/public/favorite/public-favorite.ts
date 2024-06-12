import { IFavorites } from '@models/requests/favorites.req';
import { ApiListResult, postRequest } from '../../shared/api';

/**
 * 前台-新增到我的最愛
 */
export const apiPublicAddProductsFavorites = async (data: any) =>
  postRequest<ApiListResult<IFavorites>>('/public/favorites/add', data);

/**
 * 前台-取得新增到我的最愛
 */
export const apiPublicRemoveProductsFavorites = async (data: any) =>
  postRequest<ApiListResult<IFavorites>>(`/public/favorites/remove`, data);
