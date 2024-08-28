import { asyncMatcher } from '@helpers/extra-reducers';
import { createSlice } from '@reduxjs/toolkit';

import { ReducerName } from '@enums/reducer-name';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';

import {
  assignRoleToUserAsync,
  createRoleAsync,
  deleteRoleAsync,
  getAllRolesAsync,
  getRoleByIdAsync,
  RoleAction,
  updateRolePermissionsAsync,
} from './actions';

type RoleState = ApiState<RoleAction> & {
  list: any | null;
  currentRole: any | null;
};

const initialState: RoleState = {
  list: null,
  currentRole: null,
  ...newApiState<RoleState>(RoleAction),
};

export const roleSlice = createSlice({
  name: ReducerName.ADMIN_ROLES,
  initialState,
  reducers: {
    resetRoleState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllRolesAsync.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(createRoleAsync.fulfilled, (state, action) => {
      if (state.list) {
        state.list = [...state.list, action.payload];
      }
    });
    builder.addCase(assignRoleToUserAsync.fulfilled, (state, action) => {
      state.currentRole = action.payload;
    });
    builder.addCase(updateRolePermissionsAsync.fulfilled, (state, action) => {
      if (state.list && action.payload?._id) {
        state.list = state.list.map((role: any) =>
          role._id === action.payload._id ? action.payload : role,
        );
      }
    });
    builder.addCase(getRoleByIdAsync.fulfilled, (state, action) => {
      state.currentRole = action.payload;
    });
    builder.addCase(deleteRoleAsync.fulfilled, (state, action) => {
      if (state.list) {
        state.list = state.list.filter(
          (role: any) => role._id !== action.payload._id,
        );
      }
    });
    asyncMatcher(builder, ReducerName.ADMIN_ROLES);
  },
});

export const { resetRoleState } = roleSlice.actions;
export default roleSlice.reducer;
