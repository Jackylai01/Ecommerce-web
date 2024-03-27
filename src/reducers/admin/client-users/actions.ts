import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { QueryParams } from '@models/entities/shared/query';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiClientDetailAdminUser,
  apiClientListClientUsers,
  apiClientRemoveAdminUser,
} from '@services/admin/client-users/client-client-users';

export enum AdminClientUsersAsyncAction {
  adminDetailClientUserProfile = 'adminDetailClientUserProfile ',
  getAllClientUsers = 'getAllClientUsers',
  deleteClientUser = 'deleteClientUser',
}

export const adminGetUserProfileAsync = createAsyncThunk(
  `${ReducerName.ADMIN_CLIENT_USERS}/${AdminClientUsersAsyncAction.adminDetailClientUserProfile}`,
  async (id: string) => {
    const response = await apiClientDetailAdminUser(id);
    return response.result.data;
  },
);

export const adminGetAllUsersAsync = createAsyncThunk(
  `${ReducerName.ADMIN_CLIENT_USERS}/${AdminClientUsersAsyncAction.getAllClientUsers}`,
  async ({ page, limit }: QueryParams) => {
    const query: PagingQuery = { page, limit };
    const response = await apiClientListClientUsers(query);
    return response.result;
  },
);

export const adminDeleteUserAsync = createAsyncThunk(
  `${ReducerName.ADMIN_CLIENT_USERS}/${AdminClientUsersAsyncAction.deleteClientUser}`,
  async (id: string) => {
    const response = await apiClientRemoveAdminUser(id);
    return response.result.data;
  },
);
