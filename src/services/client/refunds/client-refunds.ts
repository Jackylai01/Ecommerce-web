import { ApiResult, postRequest } from '@services/shared/api';

/**
 * 前台-客戶端退貨申請
 */

export const apiRequestReturn = async (formData: FormData) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  return postRequest<ApiResult<any>>(
    `/client/refunds/request-return`,
    formData,
    headers,
  );
};
