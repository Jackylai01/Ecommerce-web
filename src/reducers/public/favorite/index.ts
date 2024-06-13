import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  clearFavoritesAsync,
  publicAddFavoritesAsync,
  PublicFavoritesAsyncAction,
  publicGetFavoritesAsync,
  publicRemoveFavoritesAsync,
} from './actions';

interface FavoritesState extends ApiState<PublicFavoritesAsyncAction> {
  favorites: string[];
}

const initialState: FavoritesState = {
  favorites: [],
  ...newApiState<FavoritesState>(PublicFavoritesAsyncAction),
};

const favoritesSlice = createSlice({
  name: ReducerName.PUBLIC_FAVORITES,
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (productId) => productId !== action.payload,
      );
    },
    resetFavoritesState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(publicAddFavoritesAsync.fulfilled, (state, action) => {
      if (!state.favorites.includes(action.payload.productId)) {
        state.favorites.push(action.payload.productId);
      }
    });
    builder.addCase(publicRemoveFavoritesAsync.fulfilled, (state, action) => {
      state.favorites = state.favorites.filter(
        (fav) => fav !== action.payload.productId,
      );
    });
    builder.addCase(publicGetFavoritesAsync.fulfilled, (state, action) => {
      state.favorites = action.payload.favorites;
    });
    builder.addCase(clearFavoritesAsync.fulfilled, (state) => {
      state.favorites = [];
    });
    asyncMatcher(builder, ReducerName.PUBLIC_FAVORITES);
  },
});

export const { addFavorite, removeFavorite, resetFavoritesState } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
