import { formatQueryString } from '@helpers/query';
import { PagingQuery } from '@models/entities/shared/pagination';
import {
  LoginRequest,
  SendForgotCodeRequest,
} from '../../../models/requests/user.req';
import {
  AuthResponse,
  ProfileResponse,
  ResetPassword,
} from '../../../models/responses/user.res';
import { validateSchema } from '../../../models/schema/base.schema';
import {
  ApiPaginationResult,
  ApiResult,
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../shared/api';
import { LoginSchema, SendForgotCodeSchema } from './auth-users.schema';

/**
 * 後台-管理員登入
 * @throws 403 Forbidden 帳號或密碼不正確
 * @throws 403 Forbidden 帳號已被鎖定
 */
export const apiAdminUsersLogin = async (body: LoginRequest) => {
  const { error, value } = validateSchema(LoginSchema(), body);
  if (error) {
    throw error;
  }
  return postRequest<ApiResult<AuthResponse>>('/zigong/users/login', value);
};

/**
 * 後台-管理員刷新Token
 */
export const apiAdminUsersTokenRefresh = async () =>
  postRequest<ApiResult<AuthResponse>>('/zigong/refreshToken');

/**
 * 後台-管理員登出
 */
export const apiAdminUsersLogout = async () => postRequest('/zigong/logout');

/**
 * 後台-忘記密碼
 */
export const apiAdminForgotPassword = async (body: SendForgotCodeRequest) => {
  const { error, value } = validateSchema(SendForgotCodeSchema(), body);
  if (error) {
    throw error;
  }
  return postRequest('/zigong/forgot', value);
};

/**
 * 後台-重設密碼
 */

export const apiAdminResetPassword = async (body: any) => {
  return postRequest<ApiResult<ResetPassword>>(`/zigong/change-password`, body);
};

/**
 * 管理員-註冊帳號
 */
export const apiAdminCreateAccount = async (body: any) => {
  return postRequest<ApiResult<any>>('/zigong/createAccount', body);
};

/**
 * 後台-管理員修改個人基本資料
 * @throws 400 BadRequest 欄位驗證錯誤
 * @throws 403 Forbidden Email 已被使用
 * @throws 403 Forbidden 手機號碼已被使用
 */

export const apiAdminUsersModifyProfile = async (
  body: ProfileResponse,
  id: string,
) => {
  return putRequest<ApiResult<ProfileResponse>>(
    `/zigong/modifyProfile/${id}`,
    body,
  );
};

/**
 * 後台-查詢個人資料
 */

export const apiAdminUsersByProfile = async (id: string) => {
  return getRequest<ApiResult<any>>(`/zigong/user/${id}`);
};

/**
 * 後台-查詢全部後台帳號
 */

export const apiAdminUsersByAll = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<any>>(
    formatQueryString('/zigong/getAllUsers', query),
  );

/**
 * 後台-上傳個人照片
 */
export const apiAdminUploadProfileImage = async (body: any, id: string) => {
  return postRequest<ApiResult<any>>(`/zigong/uploadProfileImage/${id}`, body);
};

/**
 * 後台-更改信箱要進行信箱驗證
 */

export const apiAdminVerificationToken = async (
  emailVerificationToken: string,
) => {
  return getRequest<ApiResult<any>>(
    `/zigong/modifyProfile/email/${emailVerificationToken}`,
  );
};

/**
 * 後台-管理刪除單一帳號
 */

export const apiAdminDeleteUser = async (id: string) => {
  return deleteRequest<ApiResult<any>>(`/zigong/deleteAccount/${id}`);
};

/**
 * 後台-管理員切換角色
 */

export const apiAdminToggleUserRole = async (
  userId: string,
  newRole: string,
) => {
  return putRequest<ApiResult<any>>(`/zigong/toggleUserRole/${userId}`, {
    newRole,
  });
};
