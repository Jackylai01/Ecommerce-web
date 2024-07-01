import { CartResponse } from '@models/responses/cart.tes';
import {
  ApiResult,
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../shared/api';

/**
 * 前台-新增商品到購物車
 */
export const apiAddToCart = async (data: any) =>
  postRequest<ApiResult<CartResponse>>('/carts/add', data);

/**
 * 前台-取得使用者的購物車
 */
export const apiGetUserCart = async (_id: string) =>
  getRequest<ApiResult<CartResponse>>(`/carts/${_id}`);

/**
 * 前台-更新購物車中的商品
 */
export const apiUpdateCartItem = async (data: any) =>
  putRequest<ApiResult<CartResponse>>('/carts/update', data);

/**
 * 前台-從購物車中移除商品
 */
export const apiRemoveCartItem = async (data: any) =>
  deleteRequest<ApiResult<CartResponse>>('/carts/remove', data);

/**
 * 前台-清空購物車
 */
export const apiClearCart = async (_id: string) =>
  deleteRequest<ApiResult<void>>(`/carts/clear/${_id}`);
