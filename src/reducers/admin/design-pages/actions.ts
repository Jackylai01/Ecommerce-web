import { ReducerName } from '@enums/reducer-name';
import { IDesignPage } from '@models/requests/design.req';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiCreateDesignPage,
  apiDeleteDesignPage,
  apiGetAllDesignPages,
  apiGetDesignPageByRoute,
  apiUpdateDesignPage,
  apiUploadImage,
} from '@services/admin/design-pages/design-page';

export enum DesignPageActions {
  CREATE_DESIGN_PAGE = 'createDesignPage',
  GET_ALL_DESIGN_PAGES = 'getAllDesignPages',
  GET_DESIGN_PAGE_BY_ROUTE = 'getDesignPageByRoute',
  UPDATE_DESIGN_PAGE = 'updateDesignPage',
  DELETE_DESIGN_PAGE = 'deleteDesignPage',
  UPLOAD_IMAGE = 'uploadImage',
}

// 創建新的設計頁面
export const createDesignPageAsync = createAsyncThunk(
  `${ReducerName.ADMIN_CREATE_DESIGN_PAGE}/${DesignPageActions.CREATE_DESIGN_PAGE}`,
  async (body: any) => {
    const response = await apiCreateDesignPage(body);
    return response.result.data;
  },
);

// 獲取所有設計頁面
export const getAllDesignPagesAsync = createAsyncThunk(
  `${ReducerName.ADMIN_CREATE_DESIGN_PAGE}/${DesignPageActions.GET_ALL_DESIGN_PAGES}`,
  async () => {
    const response = await apiGetAllDesignPages();
    return response.result.data;
  },
);

// 根據路由獲取單個設計頁面
export const getDesignPageByRouteAsync = createAsyncThunk(
  `${ReducerName.ADMIN_CREATE_DESIGN_PAGE}/${DesignPageActions.GET_DESIGN_PAGE_BY_ROUTE}`,
  async (route: string) => {
    const response = await apiGetDesignPageByRoute(route);
    return response.result.data;
  },
);

// 更新設計頁面
export const updateDesignPageAsync = createAsyncThunk(
  `${ReducerName.ADMIN_CREATE_DESIGN_PAGE}/${DesignPageActions.UPDATE_DESIGN_PAGE}`,
  async ({ route, body }: { route: string; body: IDesignPage }) => {
    const response = await apiUpdateDesignPage(route, body);
    return response.result.data;
  },
);

// 刪除設計頁面
export const deleteDesignPageAsync = createAsyncThunk(
  `${ReducerName.ADMIN_CREATE_DESIGN_PAGE}/${DesignPageActions.DELETE_DESIGN_PAGE}`,
  async (route: string) => {
    await apiDeleteDesignPage(route);
    return route;
  },
);

// 上傳圖片
export const uploadImageAsync = createAsyncThunk(
  `${ReducerName.ADMIN_CREATE_DESIGN_PAGE}/${DesignPageActions.UPLOAD_IMAGE}`,
  async (formData: FormData) => {
    const response = await apiUploadImage(formData);
    console.log(response);
    return response.result.data;
  },
);
