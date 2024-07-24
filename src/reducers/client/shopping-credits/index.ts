import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { ShoppingCredit } from '@models/responses/shoppingCredit';
import { createSlice } from '@reduxjs/toolkit';
import {
  clientUserShoppingCreditsAction,
  clientUserShoppingCreditsAsync,
} from './actions';

type UserShoppingCreditsState = ApiState<clientUserShoppingCreditsAction> & {
  list: ShoppingCredit[] | null;
};

const initialState: UserShoppingCreditsState = {
  list: null,
  ...newApiState<UserShoppingCreditsState>(clientUserShoppingCreditsAction),
};

const clientUserShoppingCreditsSlice = createSlice({
  name: ReducerName.CLIENT_SHOPPING_CREDITS,
  initialState,
  reducers: {
    resetUserShoppingCredits: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(
      clientUserShoppingCreditsAsync.fulfilled,
      (state, action) => {
        state.list = action.payload.data;
      },
    );
    asyncMatcher(builder, ReducerName.CLIENT_SHOPPING_CREDITS);
  },
});

export const { resetUserShoppingCredits } =
  clientUserShoppingCreditsSlice.actions;
export default clientUserShoppingCreditsSlice.reducer;
