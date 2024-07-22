import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Discount } from '@models/entities/shared/discount';
import { Metadata } from '@models/entities/shared/pagination';
import { DiscountUsage } from '@models/responses/discounts';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  DiscountAction,
  addDiscountAsync,
  deleteDiscountAsync,
  generateDiscountCodeAsync,
  generateMultipleDiscountCodesAsync,
  getAllDiscountsAsync,
  getAllDiscountsUsageAsync,
  getDiscountByIdAsync,
  getDiscountUsageByCodeAsync,
  updateDiscountAsync,
  updateDiscountStatusAsync,
} from './actions';

type DiscountState = ApiState<DiscountAction> & {
  list: Discount[] | null;
  metadata: Metadata | null;
  discountDetails: Discount | null;
  editingDiscountId: string | null;
  discountUsage: DiscountUsage | null;
  discounts: any;
};

const initialState: DiscountState = {
  list: null,
  metadata: null,
  discountDetails: null,
  editingDiscountId: null,
  discountUsage: null,
  discounts: null,
  ...newApiState<DiscountState>(DiscountAction),
};

export const discountSlice = createSlice({
  name: ReducerName.ADMIN_DISCOUNT,
  initialState,
  reducers: {
    resetDiscountState: () => initialState,
    resetDiscountDetailState: (state) => {
      state.discountDetails = null;
    },
    setEditingDiscountId: (state, action) => {
      state.editingDiscountId = action.payload;
    },
    resetDiscountId: (state) => {
      state.editingDiscountId = null;
    },
    setDiscountList: (state, action: PayloadAction<Discount[]>) => {
      state.list = action.payload;
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
    builder.addCase(updateDiscountStatusAsync.fulfilled, (state, action) => {
      if (state.list) {
        state.list = state.list.map((discount) =>
          discount._id === action.payload._id
            ? { ...discount, isActive: action.payload.isActive }
            : discount,
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
    builder.addCase(generateDiscountCodeAsync.fulfilled, (state, action) => {
      if (state.discountDetails) {
        state.discountDetails.discountCode = action.payload.discountCode;
        state.discountDetails.usageLimit = action.payload.usageLimit;
      }
    });
    builder.addCase(getDiscountUsageByCodeAsync.fulfilled, (state, action) => {
      state.discountUsage = action.payload;
    });
    builder.addCase(getAllDiscountsUsageAsync.fulfilled, (state, action) => {
      state.list = action.payload.data;
      state.metadata = action.payload.metadata;
    });
    builder.addCase(
      generateMultipleDiscountCodesAsync.fulfilled,
      (state, action) => {
        state.discounts = action.payload;
      },
    );

    asyncMatcher(builder, ReducerName.ADMIN_DISCOUNT);
  },
});

export const {
  resetDiscountState,
  resetDiscountDetailState,
  setEditingDiscountId,
  resetDiscountId,
  setDiscountList,
} = discountSlice.actions;
export default discountSlice.reducer;
