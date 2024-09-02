import { ApiResult, postRequest } from '@services/shared/api';
import { AxiosRequestHeaders } from 'axios';

/**
 * 前台-客戶端退貨申請
 */

export const apiRequestReturn = async (formData: FormData) => {
  const headers: AxiosRequestHeaders = {
    'Content-Type': 'multipart/form-data',
  };
  return postRequest<ApiResult<any>>(
    `/client/refunds/request-return`,
    formData,
    headers,
  );
};
