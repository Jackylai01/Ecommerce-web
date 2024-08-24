import { ReducerName } from '@enums/reducer-name';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiGetAllDesignPages,
  apiGetDesignPageByRoute,
} from '@services/public/designPages/design-pages';

export enum DesignPageAsyncAction {
  getAllPages = 'getAllPages',
  getPageByRoute = 'getPageByRoute',
}

/** 取得全部設計頁面 */
export const getAllDesignPagesAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_DESIGN_PAGES}/${DesignPageAsyncAction.getAllPages}`,
  async () => {
    const response = await apiGetAllDesignPages();
    return response.result.data;
  },
);

/** 取得單一路徑設計頁面 */
export const getDesignPageByRouteAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_DESIGN_PAGES}/${DesignPageAsyncAction.getPageByRoute}`,
  async ({ route }: { route: string }) => {
    const response = await apiGetDesignPageByRoute(route);
    return response.result.data;
  },
);
