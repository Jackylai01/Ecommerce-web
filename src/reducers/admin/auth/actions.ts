import { ReducerName } from '@enums/reducer-name';
import {
  loadAdminToken,
  removeAdminToken,
  saveAdminToken,
} from '@helpers/token';
import { LoginRequest, SendForgotCodeRequest } from '@models/requests/user.req';
import { ProfileResponse } from '@models/responses/user.res';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiAdminCreateAccount,
  apiAdminForgotPassword,
  apiAdminResetPassword,
  apiAdminUsersLogin,
  apiAdminUsersLogout,
  apiAdminUsersModifyProfile,
  apiAdminUsersProfile,
  apiAdminUsersTokenRefresh,
} from '@services/admin/admin-auth/admin-users';

export enum AdminAuthAsyncAction {
  login = 'login',
  refreshToken = 'refreshToken',
  logout = 'logout',
  forgetPassword = 'forgetPassword',
  resetPassword = 'resetPassword',
  createAccounts = 'createAccounts',
  adminDetailUserProfile = 'adminDetailUserProfile',
  modifyProfile = 'modifyProfile',
}

export const adminLoginAsync = createAsyncThunk(
  `${ReducerName.ADMIN_AUTH}/${AdminAuthAsyncAction.login}`,
  async (data: LoginRequest) => {
    const response = await apiAdminUsersLogin(data);
    saveAdminToken(response.res.data);
    return response.res.data;
  },
);

export const adminRefreshTokenAsync = createAsyncThunk(
  `${ReducerName.ADMIN_AUTH}/${AdminAuthAsyncAction.refreshToken}`,
  async () => {
    const response = await apiAdminUsersTokenRefresh();

    const oldData = loadAdminToken();

    const newData = response.res.data;

    // 检查oldData是否存在，如果不存在，只使用newData
    const userInfo = oldData
      ? { ...oldData.userInfo, ...newData.userInfo }
      : newData.userInfo;

    const userData = {
      ...newData,
      userInfo: userInfo,
    };

    saveAdminToken(userData);
    return userData;
  },
);

export const adminLogoutAsync = createAsyncThunk(
  `${ReducerName.ADMIN_AUTH}/${AdminAuthAsyncAction.logout}`,
  async () => {
    await apiAdminUsersLogout();
    removeAdminToken();
  },
);

export const adminForgetPasswordAsync = createAsyncThunk(
  `${ReducerName.ADMIN_AUTH}/${AdminAuthAsyncAction.forgetPassword}`,
  async (data: SendForgotCodeRequest) => {
    await apiAdminForgotPassword(data);
  },
);

export const adminResetPasswordAsync = createAsyncThunk(
  `${ReducerName.ADMIN_AUTH}/${AdminAuthAsyncAction.resetPassword}`,
  async (data: any) => {
    const response = await apiAdminResetPassword(data);
    return response.result.data;
  },
);

export const adminCreateAccountsAsync = createAsyncThunk(
  `${ReducerName.ADMIN_AUTH}/${AdminAuthAsyncAction.createAccounts}`,
  async (data: any) => {
    const response = await apiAdminCreateAccount(data);
    return response.result.data;
  },
);

export const adminDetailUserProfileAsync = createAsyncThunk(
  `${ReducerName.ADMIN_AUTH}/${AdminAuthAsyncAction.adminDetailUserProfile}`,
  async () => {
    const response = await apiAdminUsersProfile();
    return response.result.data;
  },
);

export const adminModifyProfileAsync = createAsyncThunk(
  `${ReducerName.ADMIN_AUTH}/${AdminAuthAsyncAction.modifyProfile}`,
  async (data: ProfileResponse) => {
    const response = await apiAdminUsersModifyProfile(data);
    return response.res.data;
  },
);
