import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiAdminListAdminUsers } from '@services/admin/admin-users/admin-admin-users';

export enum AdminAdminUserAction {
  list = 'list',
}

export const adminAdminUserListAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ADMIN_USER}/${AdminAdminUserAction.list}`,
  async (query: PagingQuery = {}) => {
    const response = await apiAdminListAdminUsers(query);
    return response.res.data;
  },
);
