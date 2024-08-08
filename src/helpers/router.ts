import { PageLayoutType } from '@enums/page-layout-type';
import {
  ADMIN_EDIT_PAGES_ROUTE,
  ADMIN_PREVIEW_ROUTE,
  ADMIN_ROUTE,
  CLIENT_ROUTE,
  PUBLIC_ROUTE,
} from '@fixtures/constants';
import { routeToChinese } from '@models/entities/shared/query';

export const pathnameRemoveQuery = (pathname: string) => {
  return pathname.split('?')[0]; // 去除 URL 中的 query 參數
};

export const getMainRoute = (url: string) => url.split('/')[1]; // 從 URL 中獲取主路由

export const toPageLayoutType = (pathname: string) => {
  if (pathname.startsWith(`/${ADMIN_ROUTE}/auth`)) {
    return PageLayoutType.ADMIN_AUTH; // 如果 URL 的開頭是 zigong 的 auth 路由，則頁面佈局類型為 ADMIN_AUTH
  }

  if (pathname.startsWith(`/${CLIENT_ROUTE}/auth`)) {
    return PageLayoutType.CLIENT; // 如果 URL 的開頭是 client 的 auth 路由，則頁面佈局類型為 CLIENT_PUBLIC
  }

  if (pathname.startsWith(`/${PUBLIC_ROUTE}/auth`)) {
    return PageLayoutType.CLIENT_PUBLIC; // 如果 URL 的開頭是 public 的 auth 路由，則頁面佈局類型為 CLIENT_PUBLIC
  }

  if (pathname.startsWith(`/${ADMIN_EDIT_PAGES_ROUTE}/edit`)) {
    return PageLayoutType.ADMIN_EDIT; // 如果 URL 的開頭是 pages 的 edit 路由，則頁面佈局類型為 ADMIN_EDIT
  }
  if (pathname.startsWith(`/${ADMIN_PREVIEW_ROUTE}`)) {
    return PageLayoutType.ADMIN_PREVIEW_PAGE; // 如果 URL 的開頭是 pages 的 edit 路由，則頁面佈局類型為 ADMIN_EDIT
  }

  const mainRoute = getMainRoute(pathname);
  switch (
    mainRoute // 根據主路由決定頁面佈局類型
  ) {
    case ADMIN_ROUTE:
      return PageLayoutType.ADMIN;
    case CLIENT_ROUTE:
      return PageLayoutType.CLIENT;
    case ADMIN_PREVIEW_ROUTE:
      return PageLayoutType.ADMIN_PREVIEW_PAGE;
    case ADMIN_EDIT_PAGES_ROUTE:
      return PageLayoutType.ADMIN_EDIT;
    default:
      return PageLayoutType.CLIENT_PUBLIC;
  }
};

// 處理路由名稱轉換中文的函式，設定包含zigong。
export function getChineseNameForPath(pathname: any) {
  if (pathname.startsWith('/zigong')) {
    const withoutPrefix = pathname.slice('/zigong'.length);
    return routeToChinese[withoutPrefix] || '後臺管理';
  }
  return '後臺管理';
}
