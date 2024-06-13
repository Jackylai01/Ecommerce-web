import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { ProductsResponse } from '@models/responses/products.res';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  publicAddFavoritesAsync,
  PublicFavoritesAsyncAction,
  publicRemoveFavoritesAsync,
} from './actions';

interface IFavorites {
  userId: string;
  productId: string;
}

interface FavoritesState extends ApiState<PublicFavoritesAsyncAction> {
  favorites: ProductsResponse[];
}

const initialState: FavoritesState = {
  favorites: [],
  ...newApiState<FavoritesState>(PublicFavoritesAsyncAction),
};

const favoritesSlice = createSlice({
  name: ReducerName.PUBLIC_FAVORITES,
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<ProductsResponse>) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (product) => product._id !== action.payload,
      );
    },
    resetFavoritesState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(publicAddFavoritesAsync.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });
    builder.addCase(publicRemoveFavoritesAsync.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });
    asyncMatcher(builder, ReducerName.PUBLIC_FAVORITES);
  },
});

export const { addFavorite, removeFavorite, resetFavoritesState } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
