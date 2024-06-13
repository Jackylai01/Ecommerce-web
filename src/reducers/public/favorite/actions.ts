import { ReducerName } from '@enums/reducer-name';
import { IFavorites } from '@models/requests/favorites.req';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiPublicAddProductsFavorites,
  apiPublicGetProductsFavorites,
  apiPublicRemoveProductsFavorites,
} from '@services/public/favorite/public-favorite';

export enum PublicFavoritesAsyncAction {
  addFavorites = 'addFavorites',
  removeFavorites = 'removeFavorites',
  getFavorites = 'getFavorites',
}

export const publicAddFavoritesAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_FAVORITES}/${PublicFavoritesAsyncAction.addFavorites}`,
  async (data: IFavorites) => {
    const response = await apiPublicAddProductsFavorites(data);
    return response.res.data;
  },
);

export const publicRemoveFavoritesAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_FAVORITES}/${PublicFavoritesAsyncAction.removeFavorites}`,
  async (data: IFavorites) => {
    const response = await apiPublicRemoveProductsFavorites(data);
    return response.res.data;
  },
);

export const publicGetFavoritesAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_FAVORITES}/${PublicFavoritesAsyncAction.getFavorites}`,
  async (userId: string) => {
    const response = await apiPublicGetProductsFavorites(userId);

    return response.res.data;
  },
);
