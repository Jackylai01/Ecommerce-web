import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { AdminUser } from '@models/entities/admin-user';
import { createSlice } from '@reduxjs/toolkit';
import { ApiPaginationResult } from '@services/shared/api';
import { AdminAdminUserAction, adminAdminUserListAsync } from './actions';

type AdminAdminUserState = ApiState<AdminAdminUserAction> & {
  list: ApiPaginationResult<AdminUser> | null;
  sameDepartmentList: ApiPaginationResult<AdminUser> | null;
  canAddToDepartmentList: ApiPaginationResult<AdminUser> | null;
};

const initialState: AdminAdminUserState = {
  list: null,
  sameDepartmentList: null,
  canAddToDepartmentList: null,
  ...newApiState<AdminAdminUserState>(AdminAdminUserAction),
};

const adminAdminUserSlice = createSlice({
  name: ReducerName.ADMIN_ADMIN_USER,
  initialState,
  reducers: {
    resetAdminAdminUserStatus: (state) => {
      state.status = initialState.status;
    },
    resetAdminAdminUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(adminAdminUserListAsync.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    asyncMatcher(builder, ReducerName.ADMIN_ADMIN_USER);
  },
});

export const { resetAdminAdminUserStatus, resetAdminAdminUser } =
  adminAdminUserSlice.actions;
export default adminAdminUserSlice.reducer;
