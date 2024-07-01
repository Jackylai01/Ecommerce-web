import { ReducerName } from '@enums/reducer-name';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiAddToCart,
  apiClearCart,
  apiGetUserCart,
  apiRemoveCartItem,
  apiUpdateCartItem,
} from '@services/client/cart';

export enum CartAsyncAction {
  addToCart = 'addToCart',
  getUserCart = 'getUserCart',
  updateCartItem = 'updateCartItem',
  removeCartItem = 'removeCartItem',
  clearCart = 'clearCart',
}

export const addToCartAsync = createAsyncThunk(
  `${ReducerName.CLIENT_CART}/${CartAsyncAction.addToCart}`,
  async (data: any) => {
    const response = await apiAddToCart(data);
    return response.result.data;
  },
);

export const getUserCartAsync = createAsyncThunk(
  `${ReducerName.CLIENT_CART}/${CartAsyncAction.getUserCart}`,
  async (_id: string) => {
    const response = await apiGetUserCart(_id);
    return response.result;
  },
);

export const updateCartItemAsync = createAsyncThunk(
  `${ReducerName.CLIENT_CART}/${CartAsyncAction.updateCartItem}`,
  async (data: any) => {
    const response = await apiUpdateCartItem(data);
    return response.result;
  },
);

export const removeCartItemAsync = createAsyncThunk(
  `${ReducerName.CLIENT_CART}/${CartAsyncAction.removeCartItem}`,
  async (data: any) => {
    const response = await apiRemoveCartItem(data);
    return response.result;
  },
);

export const clearCartAsync = createAsyncThunk(
  `${ReducerName.CLIENT_CART}/${CartAsyncAction.clearCart}`,
  async (_id: string) => {
    await apiClearCart(_id);
  },
);
