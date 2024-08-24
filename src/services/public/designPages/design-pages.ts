import { ApiResult, getRequest } from '../../shared/api';

/**
 * 取得所有設計頁面
 */
export const apiGetAllDesignPages = async () =>
  getRequest<ApiResult<any[]>>('/public/design-pages/all');

/**
 * 取得單一路徑設計頁面
 */
export const apiGetDesignPageByRoute = async (route: string) =>
  getRequest<ApiResult<any>>(`/public/design-pages/${route}`);
