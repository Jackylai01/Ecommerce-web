import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Metadata } from '@models/entities/shared/pagination';
import { ShoppingCredit } from '@models/responses/shoppingCredit';
import { createSlice } from '@reduxjs/toolkit';
import {
  ShoppingCreditsAction,
  addShoppingCreditAsync,
  deleteExpiredShoppingCreditsAsync,
  deleteShoppingCreditAsync,
  getAllShoppingCreditsAsync,
  getUserShoppingCreditsAsync,
  updateShoppingCreditStatusAsync,
} from './actions';

export interface ShoppingCreditsState extends ApiState<ShoppingCreditsAction> {
  allCredits: ShoppingCredit[] | null;
  allCreditsMetadata: Metadata | null;
  userCredits: ShoppingCredit[] | null;
}

const initialState: ShoppingCreditsState = {
  allCredits: null,
  allCreditsMetadata: null,
  userCredits: null,
  ...newApiState<ShoppingCreditsState>(ShoppingCreditsAction),
};

const shoppingCreditsSlice = createSlice({
  name: ReducerName.ADMIN_SHOPPING_CREDITS,
  initialState,
  reducers: {
    resetShoppingCreditsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllShoppingCreditsAsync.fulfilled, (state, action) => {
      state.allCredits = action.payload.data;
      state.allCreditsMetadata = action.payload.metadata;
    });
    builder.addCase(getUserShoppingCreditsAsync.fulfilled, (state, action) => {
      state.userCredits = action.payload;
    });
    builder.addCase(addShoppingCreditAsync.fulfilled, (state, action) => {
      if (state.allCredits)
        state.allCredits = [...state.allCredits, action.payload];
    });
    builder.addCase(
      updateShoppingCreditStatusAsync.fulfilled,
      (state, action) => {
        if (state.allCredits && action.payload) {
          state.allCredits = state.allCredits.map((credit) =>
            credit._id === action.payload._id ? action.payload : credit,
          );
        }
        if (state.userCredits && action.payload) {
          state.userCredits = state.userCredits.map((credit) =>
            credit._id === action.payload._id ? action.payload : credit,
          );
        }
      },
    );
    builder.addCase(deleteShoppingCreditAsync.fulfilled, (state, action) => {
      if (state.allCredits) {
        state.allCredits = state.allCredits.filter(
          (credit) => credit._id !== action.payload,
        );
      }
      if (state.userCredits) {
        state.userCredits = state.userCredits.filter(
          (credit) => credit._id !== action.payload,
        );
      }
    });
    builder.addCase(deleteExpiredShoppingCreditsAsync.fulfilled, (state) => {
      if (state.allCredits) {
        state.allCredits = state.allCredits.filter(
          (credit) =>
            !credit.expiryDate || new Date(credit.expiryDate) >= new Date(),
        );
      }
    });

    asyncMatcher(builder, ReducerName.ADMIN_SHOPPING_CREDITS);
  },
});

export const { resetShoppingCreditsState } = shoppingCreditsSlice.actions;
export default shoppingCreditsSlice.reducer;
