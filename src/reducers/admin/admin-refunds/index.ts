import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Metadata } from '@models/entities/shared/pagination';
import { refundsResponse } from '@models/responses/refunds';
import { createSlice } from '@reduxjs/toolkit';
import {
  adminRefundAction,
  approveReturnRequestAsync,
  getPendingRefundRequestsAsync,
  rejectReturnRequestAsync,
} from './actions';

type adminQuestReturnState = ApiState<adminRefundAction> & {
  reviewData: refundsResponse[] | null;
  refunds: refundsResponse | null;
  metadata: Metadata | null;
};

const initialState: adminQuestReturnState = {
  reviewData: null,
  refunds: null,
  metadata: null,
  ...newApiState<adminQuestReturnState>(adminRefundAction),
};

const adminQuestReturnStateSlice = createSlice({
  name: ReducerName.ADMIN_REQUESTRETURN,
  initialState,
  reducers: {
    resetAdminQuestReturnState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(
      getPendingRefundRequestsAsync.fulfilled,
      (state, action) => {
        state.reviewData = action.payload.data;
        state.metadata = action.payload.metadata;
      },
    );
    builder.addCase(approveReturnRequestAsync.fulfilled, (state, action) => {
      state.refunds = action.payload;
    });
    builder.addCase(rejectReturnRequestAsync.fulfilled, (state, action) => {
      state.refunds = action.payload;
    });
    asyncMatcher(builder, ReducerName.ADMIN_REQUESTRETURN);
  },
});

export const { resetAdminQuestReturnState } =
  adminQuestReturnStateSlice.actions;
export default adminQuestReturnStateSlice.reducer;
