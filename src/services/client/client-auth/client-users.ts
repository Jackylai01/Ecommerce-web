import {
  LoginRequest,
  SendForgotCodeRequest,
} from '../../../models/requests/user.req';
import { AuthResponse } from '../../../models/responses/user.res';
import {
  ApiResult,
  getRequest,
  postRequest,
  putRequest,
} from '../../shared/api';

/**
 * 使用者註冊
 * @throws 403 Forbidden 帳號或密碼不正確
 * @throws 403 Forbidden 帳號已被鎖定
 */
export const apiClientUsersRegister = async (body: LoginRequest) => {
  return postRequest<ApiResult<AuthResponse>>('/client/register', body);
};

/**
 * 用户啟用帳號
 * @param verificationToken
 */
export const apiClientActivateAccount = async (verificationToken: string) => {
  return getRequest(`/client/activate/${verificationToken}`);
};

/**
 * 使用者登入
 * @throws 403 Forbidden 帳號或密碼不正確
 * @throws 403 Forbidden 帳號已被鎖定
 */
export const apiClientUsersLogin = async (body: LoginRequest) => {
  return postRequest<ApiResult<AuthResponse>>('/client/login', body);
};

/**
 * 使用者刷新Token
 */
export const apiClientUsersTokenRefresh = async () =>
  postRequest<ApiResult<AuthResponse>>('/client/refreshToken');

/**
 * 使用者登出
 */
export const apiClientUsersLogout = async () => postRequest('/client/logout');

/**
 * 使用者忘記密碼
 */
export const apiClientForgotPassword = async (body: SendForgotCodeRequest) => {
  return postRequest('/client/forgotPassword', body);
};

/**
 * 使用者重設密碼
 */

export const apiClientResetPassword = async (body: any) => {
  const { code, ...restBody } = body;
  return postRequest(`/client/resetPassword/${code}`, restBody);
};

/**
 * 獲得個人資料
 */

export const apiClientGetProfile = async () => {
  return getRequest('/client/profile');
};

/**
 * 編輯個人資料
 */

export const apiClientModifyProfile = async (data: any) => {
  return putRequest('/client/editProfile', data);
};
