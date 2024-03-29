import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { QueryParams } from '@models/entities/shared/query';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiClientDetailAdminUser,
  apiClientListClientUsers,
  apiClientNotifyAllUsers,
  apiClientNotifySelectedUsers,
  apiClientRemoveAdminUser,
} from '@services/admin/client-users/client-client-users';

export enum AdminClientUsersAsyncAction {
  adminDetailClientUserProfile = 'adminDetailClientUserProfile',
  getAllClientUsers = 'getAllClientUsers',
  deleteClientUser = 'deleteClientUser',
  notifyAllUsers = 'notifyAllUsers',
  notifySelectedUsers = 'notifySelectedUsers',
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
  async ({ page, limit }: QueryParams) => {
    const query: PagingQuery = { page, limit };
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
