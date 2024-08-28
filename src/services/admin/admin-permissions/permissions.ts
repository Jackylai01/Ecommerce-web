import { Permission } from '@models/responses/permission.res';
import {
  ApiResult,
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../shared/api';

/**
 * 新增權限
 */
export const apiCreatePermission = async (body: Permission) => {
  return postRequest<ApiResult<Permission>>('/zigong/permissions/create', body);
};

/**
 * 查詢全部權限
 */
export const apiGetPermissions = async () => {
  return getRequest<ApiResult<Permission[]>>('/zigong/permissions');
};

/**
 * 查詢單一權限
 */
export const apiGetPermissionById = async (permissionId: string) => {
  return getRequest<ApiResult<Permission>>(
    `/zigong/permissions/${permissionId}`,
  );
};

/**
 * 更新權限
 */
export const apiUpdatePermission = async (
  permissionId: string,
  body: Permission,
) => {
  return putRequest<ApiResult<Permission>>(
    `/zigong/permissions/${permissionId}`,
    body,
  );
};

/**
 * 刪除權限
 */
export const apiDeletePermission = async (permissionId: string) => {
  return deleteRequest<ApiResult<Permission>>(
    `/zigong/permissions/${permissionId}`,
  );
};
