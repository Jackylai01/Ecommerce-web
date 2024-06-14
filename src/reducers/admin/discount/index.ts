import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Discount } from '@models/entities/shared/discount';
import { Metadata } from '@models/entities/shared/pagination';
import { createSlice } from '@reduxjs/toolkit';
import {
  DiscountAction,
  addDiscountAsync,
  deleteDiscountAsync,
  getAllDiscountsAsync,
  getDiscountByIdAsync,
  updateDiscountAsync,
} from './actions';

type DiscountState = ApiState<DiscountAction> & {
  list: Discount[] | null;
  metadata: Metadata | null;
  discountDetails: Discount | null;
};

const initialState: DiscountState = {
  list: null,
  metadata: null,
  discountDetails: null,
  ...newApiState<DiscountState>(DiscountAction),
};

const discountSlice = createSlice({
  name: ReducerName.ADMIN_DISCOUNT,
  initialState,
  reducers: {
    resetDiscountState: () => initialState,
    resetDiscountDetailState: (state) => {
      state.discountDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllDiscountsAsync.fulfilled, (state, action) => {
      state.list = action.payload.data;
      state.metadata = action.payload.metadata;
    });
    builder.addCase(getDiscountByIdAsync.fulfilled, (state, action) => {
      state.discountDetails = action.payload;
    });
    builder.addCase(addDiscountAsync.fulfilled, (state, action) => {
      if (state.list) state.list = [...state.list, action.payload];
    });
    builder.addCase(updateDiscountAsync.fulfilled, (state, action) => {
      if (state.list && action.payload) {
        state.list = state.list.map((discount) =>
          discount._id === action.payload._id ? action.payload : discount,
        );
      }
    });
    builder.addCase(deleteDiscountAsync.fulfilled, (state, action) => {
      if (state.list) {
        state.list = state.list.filter(
          (discount) => discount._id !== action.payload,
        );
      }
    });

    asyncMatcher(builder, ReducerName.ADMIN_DISCOUNT);
  },
});

export const { resetDiscountState, resetDiscountDetailState } =
  discountSlice.actions;
export default discountSlice.reducer;
