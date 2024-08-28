import { createAsyncThunk } from '@reduxjs/toolkit';

import { ReducerName } from '@enums/reducer-name';
import { Permission } from '@models/responses/permission.res';
import {
  apiCreatePermission,
  apiDeletePermission,
  apiGetPermissionById,
  apiGetPermissions,
  apiUpdatePermission,
} from '@services/admin/admin-permissions/permissions';

export enum PermissionAction {
  getPermissions = 'getPermissions',
  getPermissionById = 'getPermissionById',
  createPermission = 'createPermission',
  updatePermission = 'updatePermission',
  deletePermission = 'deletePermission',
}

export const getPermissionsAsync = createAsyncThunk(
  `${ReducerName.ADMIN_PERMISSION}/${PermissionAction.getPermissions}`,
  async () => {
    const response = await apiGetPermissions();
    return response.result.data;
  },
);

export const getPermissionByIdAsync = createAsyncThunk(
  `${ReducerName.ADMIN_PERMISSION}/${PermissionAction.getPermissionById}`,
  async (permissionId: string) => {
    const response = await apiGetPermissionById(permissionId);
    return response.result.data;
  },
);

export const createPermissionAsync = createAsyncThunk(
  `${ReducerName.ADMIN_PERMISSION}/${PermissionAction.createPermission}`,
  async (body: Permission) => {
    const response = await apiCreatePermission(body);
    return response.result.data;
  },
);

export const updatePermissionAsync = createAsyncThunk(
  `${ReducerName.ADMIN_PERMISSION}/${PermissionAction.updatePermission}`,
  async ({
    permissionId,
    body,
  }: {
    permissionId: string;
    body: Permission;
  }) => {
    const response = await apiUpdatePermission(permissionId, body);
    return response.result.data;
  },
);

export const deletePermissionAsync = createAsyncThunk(
  `${ReducerName.ADMIN_PERMISSION}/${PermissionAction.deletePermission}`,
  async (permissionId: string) => {
    await apiDeletePermission(permissionId);
    return permissionId;
  },
);
