import { ApiState } from '@models/api/api-state';
import { Metadata } from '@models/entities/shared/pagination';
import { createSlice } from '@reduxjs/toolkit';

import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { MembershipLevelResponse } from '@models/responses/membership.res';
import {
  createMembershipLevelAsync,
  deleteMembershipLevelAsync,
  getAllMembershipLevelsAsync,
  MembershipLevelAction,
  updateMembershipLevelAsync,
} from './actions';

type MembershipLevelState = ApiState<MembershipLevelAction> & {
  membershipLevels: MembershipLevelResponse[] | null;
  metadata: Metadata | null;
};

const initialState: MembershipLevelState = {
  membershipLevels: null,
  metadata: null,
  ...newApiState<MembershipLevelState>(MembershipLevelAction),
};

const membershipLevelSlice = createSlice({
  name: ReducerName.ADMIN_MEMBERSHIP_LEVEL,
  initialState,
  reducers: {
    resetMembershipLevelState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllMembershipLevelsAsync.fulfilled, (state, action) => {
      state.membershipLevels = action.payload.data;
      state.metadata = action.payload.metadata;
    });
    builder.addCase(createMembershipLevelAsync.fulfilled, (state, action) => {
      if (state.membershipLevels) {
        state.membershipLevels.push(action.payload);
      }
    });
    builder.addCase(updateMembershipLevelAsync.fulfilled, (state, action) => {
      if (state.membershipLevels) {
        const index = state.membershipLevels.findIndex(
          (level) => level._id === action.payload._id,
        );
        if (index !== -1) {
          state.membershipLevels[index] = action.payload;
        }
      }
    });
    builder.addCase(deleteMembershipLevelAsync.fulfilled, (state, action) => {
      if (state.membershipLevels) {
        state.membershipLevels = state.membershipLevels.filter(
          (level) => level._id !== action.payload._id,
        );
      }
    });
    asyncMatcher(builder, ReducerName.ADMIN_MEMBERSHIP_LEVEL);
  },
});

export const { resetMembershipLevelState } = membershipLevelSlice.actions;
export default membershipLevelSlice.reducer;
