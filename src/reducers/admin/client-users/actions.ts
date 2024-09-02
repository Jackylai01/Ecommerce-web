import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { QueryParams } from '@models/entities/shared/query';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiClientDetailAdminUser,
  apiClientListBlocksUsers,
  apiClientListClientUsers,
  apiClientNotifyAllUsers,
  apiClientNotifySelectedUsers,
  apiClientRemoveAdminUser,
  apiClientUpdateBlacklistStatus,
} from '@services/admin/client-users/client-client-users';

export enum AdminClientUsersAsyncAction {
  adminDetailClientUserProfile = 'adminDetailClientUserProfile',
  getAllClientUsers = 'getAllClientUsers',
  deleteClientUser = 'deleteClientUser',
  notifyAllUsers = 'notifyAllUsers',
  notifySelectedUsers = 'notifySelectedUsers',
  updateBlacklistStatus = 'updateBlacklistStatus',
  getBlocksUsers = 'getBlocksUsers',
}

export const adminGetClientUserAsync = createAsyncThunk(
  `${ReducerName.ADMIN_CLIENT_USERS}/${AdminClientUsersAsyncAction.adminDetailClientUserProfile}`,
  async (id: string) => {
    const response = await apiClientDetailAdminUser(id);
    return response.result.data;
  },
);

export const adminGetAllClientUsersAsync = createAsyncThunk(
  `${ReducerName.ADMIN_CLIENT_USERS}/${AdminClientUsersAsyncAction.getAllClientUsers}`,
  async ({ page, limit, search }: QueryParams) => {
    const query: PagingQuery = { page, limit, search };
    const response = await apiClientListClientUsers(query);
    return response.result;
  },
);

export const adminDeleteClientUserAsync = createAsyncThunk(
  `${ReducerName.ADMIN_CLIENT_USERS}/${AdminClientUsersAsyncAction.deleteClientUser}`,
  async (id: string) => {
    const response = await apiClientRemoveAdminUser(id);
    return response.result.data;
  },
);

export const notifyAllUsersAsync = createAsyncThunk(
  `${ReducerName.ADMIN_CLIENT_USERS}/${AdminClientUsersAsyncAction.notifyAllUsers}`,
  async () => {
    const response = await apiClientNotifyAllUsers();
    return response.result;
  },
);

export const notifySelectedUsersAsync = createAsyncThunk(
  `${ReducerName.ADMIN_CLIENT_USERS}/${AdminClientUsersAsyncAction.notifySelectedUsers}`,
  async (userIds: any[]) => {
    const response = await apiClientNotifySelectedUsers(userIds);
    return response.result;
  },
);

export const adminUpdateBlacklistStatusAsync = createAsyncThunk(
  `${ReducerName.ADMIN_CLIENT_USERS}/${AdminClientUsersAsyncAction.updateBlacklistStatus}`,
  async ({ id, isBlacklisted }: { id: string; isBlacklisted: boolean }) => {
    const response = await apiClientUpdateBlacklistStatus(id, isBlacklisted);
    return response.result.data;
  },
);

export const adminGetBlocksClientUsersAsync = createAsyncThunk(
  `${ReducerName.ADMIN_CLIENT_USERS}/${AdminClientUsersAsyncAction.getBlocksUsers}`,
  async ({ page, limit, search }: QueryParams) => {
    const query: PagingQuery = { page, limit, search };
    const response = await apiClientListBlocksUsers(query);
    return response.result;
  },
);
