import { ReducerName } from '@enums/reducer-name';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiAssignRoleToUser,
  apiCreateRole,
  apiDeleteRole,
  apiGetAllRoles,
  apiGetRoleById,
  apiUpdateRoles,
} from '@services/admin/admin-roles/roles';

// 定義角色操作枚舉
export enum RoleAction {
  createRole = 'createRole',
  assignRoleToUser = 'assignRoleToUser',
  getAllRoles = 'getAllRoles',
  updateRole = 'updateRole',
  getRoleById = 'getRoleById',
  deleteRole = 'deleteRole',
}

// 創建角色的
export const createRoleAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ROLES}/${RoleAction.createRole}`,

  async (body: { name: string; permissions: string[] }) => {
    const response = await apiCreateRole(body);
    return response.result.data;
  },
);

// 分配角色給用戶的
export const assignRoleToUserAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ROLES}/${RoleAction.assignRoleToUser}`,
  async (body: { userId: string; roleId: string }) => {
    const response = await apiAssignRoleToUser(body);
    return response.result.data;
  },
);

export const getAllRolesAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ROLES}/${RoleAction.getAllRoles}`,
  async () => {
    const response = await apiGetAllRoles();
    return response.result.data;
  },
);

export const updateRolePermissionsAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ROLES}/${RoleAction.updateRole}`,
  async (data: any) => {
    const response = await apiUpdateRoles(data);
    return response.result.data;
  },
);

export const getRoleByIdAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ROLES}/${RoleAction.getRoleById}`,
  async (roleId: string) => {
    const response = await apiGetRoleById(roleId);
    return response.result.data;
  },
);

// 刪除角色的
export const deleteRoleAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ROLES}/${RoleAction.deleteRole}`,
  async (roleId: string) => {
    const response = await apiDeleteRole(roleId);
    return response.result.data;
  },
);
