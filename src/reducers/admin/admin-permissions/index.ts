import { asyncMatcher } from '@helpers/extra-reducers';
import { createSlice } from '@reduxjs/toolkit';

import { ReducerName } from '@enums/reducer-name';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Permission } from '@models/responses/permission.res';
import { ArticleAction } from '../admin-articles/actions';
import {
  createPermissionAsync,
  deletePermissionAsync,
  getPermissionByIdAsync,
  getPermissionsAsync,
  PermissionAction,
  updatePermissionAsync,
} from './actions';

type PermissionsState = ApiState<ArticleAction> & {
  list: Permission[] | null;
  currentPermission: Permission | null;
};

const initialState: PermissionsState = {
  list: null,
  currentPermission: null,
  ...newApiState<PermissionsState>(PermissionAction),
};

export const permissionsSlice = createSlice({
  name: ReducerName.ADMIN_PERMISSION,
  initialState,
  reducers: {
    resetPermissionsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getPermissionsAsync.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(getPermissionByIdAsync.fulfilled, (state, action) => {
      state.currentPermission = action.payload;
    });
    builder.addCase(createPermissionAsync.fulfilled, (state, action) => {
      if (state.list) {
        state.list = [...state.list, action.payload];
      }
    });
    builder.addCase(updatePermissionAsync.fulfilled, (state, action) => {
      if (state.list) {
        state.list = state.list.map((permission) =>
          permission._id === action.payload._id ? action.payload : permission,
        );
      }
    });
    builder.addCase(deletePermissionAsync.fulfilled, (state, action) => {
      if (state.list) {
        state.list = state.list.filter(
          (permission) => permission._id !== action.payload,
        );
      }
    });
    asyncMatcher(builder, ReducerName.ADMIN_PERMISSION);
  },
});

export const { resetPermissionsState } = permissionsSlice.actions;
export default permissionsSlice.reducer;
