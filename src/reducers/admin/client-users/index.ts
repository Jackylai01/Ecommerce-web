import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { ClientUser } from '@models/entities/client-user';
import { Metadata } from '@models/entities/shared/pagination';
import { createSlice } from '@reduxjs/toolkit';
import {
  AdminClientUsersAsyncAction,
  adminDeleteClientUserAsync,
  adminGetAllClientUsersAsync,
  adminGetBlocksClientUsersAsync,
  adminGetClientUserAsync,
  adminUpdateBlacklistStatusAsync,
} from './actions';

type AdminClientUsersState = ApiState<AdminClientUsersAsyncAction> & {
  list: ClientUser[] | null;
  detail: ClientUser | null;
  blocksUsers: ClientUser[] | null;
  metadata: Metadata | null;
};

const initialState: AdminClientUsersState = {
  list: null,
  detail: null,
  blocksUsers: null,
  metadata: null,
  ...newApiState<AdminClientUsersState>(AdminClientUsersAsyncAction),
};

const adminClientUsersSlice = createSlice({
  name: ReducerName.ADMIN_CLIENT_USERS,
  initialState,
  reducers: {
    resetAdminClientUsers: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(adminGetClientUserAsync.fulfilled, (state, action) => {
      state.detail = action.payload;
    });

    builder.addCase(adminGetAllClientUsersAsync.fulfilled, (state, action) => {
      state.list = action.payload.data;
      state.metadata = action.payload.metadata;
    });
    builder.addCase(adminDeleteClientUserAsync.fulfilled, (state) => {
      state.detail = null;
    });

    builder.addCase(
      adminUpdateBlacklistStatusAsync.fulfilled,
      (state, action) => {
        if (state.detail && state.detail._id === action.meta.arg.id) {
          state.detail.isBlacklisted = action.meta.arg.isBlacklisted;
        }
        if (state.list) {
          const userIndex = state.list.findIndex(
            (user) => user._id === action.meta.arg.id,
          );
          if (userIndex !== -1) {
            state.list[userIndex].isBlacklisted = action.meta.arg.isBlacklisted;
          }
        }
      },
    );
    builder.addCase(
      adminGetBlocksClientUsersAsync.fulfilled,
      (state, action) => {
        state.blocksUsers = action.payload.data;
      },
    );

    asyncMatcher(builder, ReducerName.ADMIN_CLIENT_USERS);
  },
});

export const { resetAdminClientUsers } = adminClientUsersSlice.actions;
export default adminClientUsersSlice.reducer;
