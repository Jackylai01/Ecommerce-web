import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { IFavorites } from '@models/requests/favorites.req';
import { createSlice } from '@reduxjs/toolkit';
import {
  PublicFavoritesAsyncAction,
  publicAddFavoritesAsync,
  publicRemoveFavoritesAsync,
} from './actions';

type PublicProductFavoriteState = ApiState<PublicFavoritesAsyncAction> & {
  favorites: IFavorites[] | null;
};

const initialState: PublicProductFavoriteState = {
  favorites: null,
  ...newApiState<PublicProductFavoriteState>(PublicFavoritesAsyncAction),
};

const publicFavoritesSlice = createSlice({
  name: ReducerName.PUBLIC_FAVORITES,
  initialState,
  reducers: {
    resetPublicFavoritesState: () => initialState,
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

export const { resetPublicFavoritesState } = publicFavoritesSlice.actions;
export default publicFavoritesSlice.reducer;
