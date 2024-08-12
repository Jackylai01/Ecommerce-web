import { createSlice } from '@reduxjs/toolkit';

import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Metadata } from '@models/entities/shared/pagination';
import { ShoppingCreditType } from '@models/responses/shoppingCreditType.res';
import {
  addShoppingCreditTypeAsync,
  deleteShoppingCreditTypeAsync,
  getAllShoppingCreditTypesAsync,
  ShoppingCreditTypesAction,
  updateShoppingCreditTypeAsync,
} from './actions';

type ShoppingCreditTypesState = ApiState<ShoppingCreditTypesAction> & {
  list: ShoppingCreditType[] | null;
  details: ShoppingCreditType | null;
  metadata: Metadata | null;
};

const initialState: ShoppingCreditTypesState = {
  list: null,
  metadata: null,
  details: null,
  ...newApiState<ShoppingCreditTypesState>(ShoppingCreditTypesAction),
};

const shoppingCreditTypesSlice = createSlice({
  name: ReducerName.ADMIN_SHOPPING_CREDITS_TYPE,
  initialState,
  reducers: {
    resetShoppingCreditTypesState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAllShoppingCreditTypesAsync.fulfilled,
      (state, action) => {
        state.list = action.payload;
      },
    );
    builder.addCase(addShoppingCreditTypeAsync.fulfilled, (state, action) => {
      if (state.list) state.list = [...state.list, action.payload];
    });
    builder.addCase(
      updateShoppingCreditTypeAsync.fulfilled,
      (state, action) => {
        if (state.list && action.payload) {
          state.list = state.list.map((type) =>
            type._id === action.payload._id ? action.payload : type,
          );
        }
      },
    );
    builder.addCase(
      deleteShoppingCreditTypeAsync.fulfilled,
      (state, action) => {
        if (state.list) {
          state.list = state.list.filter((type) => type._id !== action.payload);
        }
      },
    );

    asyncMatcher(builder, ReducerName.ADMIN_SHOPPING_CREDITS_TYPE);
  },
});

export const { resetShoppingCreditTypesState } =
  shoppingCreditTypesSlice.actions;
export default shoppingCreditTypesSlice.reducer;
