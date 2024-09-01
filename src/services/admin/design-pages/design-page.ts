import { IDesignPage } from '@models/requests/design.req';
import {
  ApiResponse,
  ApiResult,
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../shared/api';

/**
 * 創建新的設計頁面
 */
export const apiCreateDesignPage = async (body: any) => {
  return postRequest<ApiResult<IDesignPage>>('/zigong/design-pages', body);
};

/**
 * 獲取所有設計頁面
 */
export const apiGetAllDesignPages = async () => {
  return getRequest<ApiResult<IDesignPage[]>>('/zigong/design-pages');
};

/**
 * 根據路由獲取單個設計頁面
 */
export const apiGetDesignPageByRoute = async (route: string) => {
  return getRequest<ApiResult<IDesignPage>>(`/zigong/design-pages/${route}`);
};

/**
 * 更新設計頁面
 */
export const apiUpdateDesignPage = async (route: string, body: IDesignPage) => {
  return putRequest<ApiResult<IDesignPage>>(
    `/zigong/design-pages/${route}`,
    body,
  );
};

/**
 * 刪除設計頁面
 */
export const apiDeleteDesignPage = async (route: string) => {
  return deleteRequest<ApiResult<void>>(`/zigong/design-pages/${route}`);
};

/**
 * 上傳編輯區圖片
 */
export const apiUploadImage = async (formData: FormData) => {
  return postRequest<ApiResponse<any>>(
    '/zigong/design-pages/upload',
    formData,
    {
      'Content-Type': 'multipart/form-data',
    },
  );
};

/**
 * 刪除編輯區圖片
 */
export const apiDeleteImage = async (publicId: string) => {
  return postRequest<ApiResponse<string[]>>(
    '/zigong/design-pages/delete-image',
    {
      publicId,
    },
  );
};
