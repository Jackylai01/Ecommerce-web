import {
  ApiResult,
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../shared/api';

// 創建角色
export const apiCreateRole = async (body: {
  name: string;
  permissions: string[];
}) => {
  return postRequest<ApiResult<any>>('/zigong/roles', body);
};

// 分配角色給用戶
export const apiAssignRoleToUser = async (body: {
  userId: string;
  roleId: string;
}) => {
  return postRequest<ApiResult<any>>('/zigong/assign-role', body);
};

// 獲取所有角色
export const apiGetAllRoles = async () => {
  return getRequest<ApiResult<any>>('/zigong/roles');
};

// 更新角色的權限
export const apiUpdateRoles = async (data: any) => {
  return putRequest<ApiResult<any>>('/zigong/roles/update', data);
};

// 取得單一角色的權限內容
export const apiGetRoleById = async (roleId: string) => {
  return getRequest<ApiResult<any>>(`/zigong/roles/${roleId}`);
};

// 刪除角色
export const apiDeleteRole = async (roleId: string) => {
  return deleteRequest<ApiResult<any>>(`/zigong/roles/${roleId}`);
};
