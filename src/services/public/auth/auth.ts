import { ApiResult, getRequest, postRequest } from '@services/shared/api';

/**
 * 觸發 Google 登入流程
 */
export const apiTriggerGoogleLogin = async () =>
  getRequest<ApiResult<string>>('/public/auth/google');

/**
 * Google 登入回呼，帶著 token 完成註冊
 */
export const apiCompleteGoogleRegistration = async (data: {
  token: string;
  address: string;
  phone: string;
}) => postRequest<ApiResult<string>>('/client/complete-register', data);
