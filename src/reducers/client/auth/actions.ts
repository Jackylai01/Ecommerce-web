import { ReducerName } from '@enums/reducer-name';
import {
  loadAdminToken,
  removeClientToken,
  saveAdminToken,
  saveClientToken,
} from '@helpers/token';
import { LoginRequest, SendForgotCodeRequest } from '@models/requests/user.req';
import { ProfileResponse } from '@models/responses/user.res';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  apiClientForgotPassword,
  apiClientGetProfile,
  apiClientModifyProfile,
  apiClientResetPassword,
  apiClientUsersLogin,
  apiClientUsersLogout,
  apiClientUsersTokenRefresh,
} from '@services/client/client-auth/client-users';

export enum ClientAuthAsyncAction {
  login = 'login',
  refreshToken = 'refreshToken',
  logout = 'logout',
  forgetPassword = 'forgetPassword',
  resetPassword = 'resetPassword',
  clientDetailUserProfile = 'clientDetailUserProfile',
  modifyProfile = 'modifyProfile',
}

export const clientLoginAsync = createAsyncThunk(
  `${ReducerName.CLIENT_AUTH}}/${ClientAuthAsyncAction.login}`,
  async (data: LoginRequest) => {
    const response = await apiClientUsersLogin(data);

    saveClientToken(response.result.data);
    return response.result.data;
  },
);

export const clientRefreshTokenAsync = createAsyncThunk(
  `${ReducerName.CLIENT_AUTH}}/${ClientAuthAsyncAction.refreshToken}`,
  async () => {
    const response = await apiClientUsersTokenRefresh();

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

export const clientLogoutAsync = createAsyncThunk(
  `${ReducerName.CLIENT_AUTH}/${ClientAuthAsyncAction.logout}`,
  async () => {
    await apiClientUsersLogout();
    removeClientToken();
  },
);

export const clientForgetPasswordAsync = createAsyncThunk(
  `${ReducerName.CLIENT_AUTH}}/${ClientAuthAsyncAction.forgetPassword}`,
  async (data: SendForgotCodeRequest) => {
    await apiClientForgotPassword(data);
  },
);

export const clientResetPasswordAsync = createAsyncThunk(
  `${ReducerName.CLIENT_AUTH}}/${ClientAuthAsyncAction.resetPassword}`,
  async (data: any) => {
    await apiClientResetPassword(data);
  },
);

export const clientDetailUserProfileAsync = createAsyncThunk(
  `${ReducerName.CLIENT_AUTH}}/${ClientAuthAsyncAction.clientDetailUserProfile}`,
  async () => {
    const response = await apiClientGetProfile();
    return response.res.data;
  },
);

export const clientModifyProfileAsync = createAsyncThunk(
  `${ReducerName.CLIENT_AUTH}}/${ClientAuthAsyncAction.modifyProfile}`,
  async (data: ProfileResponse) => {
    const response = await apiClientModifyProfile(data);
    return response.res.data;
  },
);
