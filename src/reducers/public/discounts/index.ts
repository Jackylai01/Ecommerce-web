import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { createSlice } from '@reduxjs/toolkit';
import {
  getPublicDiscountsListAsync,
  publicDiscountsAsyncAction,
} from './actions';

type PublicDiscountsState = ApiState<publicDiscountsAsyncAction> & {
  list: any;
};

const initialState: PublicDiscountsState = {
  list: null,
  ...newApiState<PublicDiscountsState>(publicDiscountsAsyncAction),
};

const publicDiscountsSlice = createSlice({
  name: ReducerName.PUBLIC_DISCOUNTS,
  initialState,
  reducers: {
    resetPublicDiscountsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getPublicDiscountsListAsync.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    asyncMatcher(builder, ReducerName.PUBLIC_DISCOUNTS);
  },
});

export const { resetPublicDiscountsState } = publicDiscountsSlice.actions;
export default publicDiscountsSlice.reducer;
