import { ReducerName } from '@enums/reducer-name';
import { ADMIN_API_ROUTE } from '@fixtures/constants';
import { formatQueryString } from '@helpers/query';
import { PagingQuery } from '@models/entities/shared/pagination';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ApiPaginationResult,
  ApiResult,
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '@services/shared/api';

export enum CrudLayoutAction {
  list = 'list',
  detail = 'detail',
  create = 'create',
  update = 'update',
  delete = 'delete',
}

export const crudLayoutListAsync = createAsyncThunk(
  `${ReducerName.CRUD_LAYOUT}/${CrudLayoutAction.list}`,
  async ({
    apiModuleName,
    query = {},
  }: {
    apiModuleName: string;
    query: PagingQuery;
  }) => {
    const response = await getRequest<ApiPaginationResult<unknown>>(
      formatQueryString(`/${ADMIN_API_ROUTE}/${apiModuleName}`, query),
    );
    return response.result;
  },
);

export const crudLayoutDetailAsync = createAsyncThunk(
  `${ReducerName.CRUD_LAYOUT}/${CrudLayoutAction.detail}`,
  async ({ apiModuleName, id }: { apiModuleName: string; id: string }) => {
    const response = await getRequest<ApiResult<unknown>>(
      `/${ADMIN_API_ROUTE}/${apiModuleName}/${id}`,
    );

    return response.result.data;
  },
);

export const crudLayoutCreateAsync = createAsyncThunk(
  `${ReducerName.CRUD_LAYOUT}/${CrudLayoutAction.create}`,
  async ({ apiModuleName, data }: { apiModuleName: string; data: any }) => {
    // const convertedData = handleDataConversion(data);

    const response = await postRequest<ApiResult<{ _id: string }>>(
      `/${ADMIN_API_ROUTE}/${apiModuleName}`,
      data,
    );

    return { ...data, ...response.result.data };
  },
);

export const crudLayoutUpdateAsync = createAsyncThunk(
  `${ReducerName.CRUD_LAYOUT}/${CrudLayoutAction.update}`,
  async ({ apiModuleName, data }: { apiModuleName: string; data: any }) => {
    // const convertedData = handleDataConversion(data);

    const response = await putRequest<ApiResult<{ _id: string }>>(
      `/${ADMIN_API_ROUTE}/${apiModuleName}/${data._id}`,
      data,
    );

    return { ...data, ...response.result.data };
  },
);

export const crudLayoutDeleteAsync = createAsyncThunk(
  `${ReducerName.CRUD_LAYOUT}/${CrudLayoutAction.delete}`,
  async ({ apiModuleName, id }: { apiModuleName: string; id: string }) => {
    await deleteRequest(`/${ADMIN_API_ROUTE}/${apiModuleName}/${id}`);
  },
);
