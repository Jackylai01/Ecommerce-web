import { Enum } from '@models/enum';

export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: any;
  startDate?: string;
  endDate?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
}

export const routeToChinese: Enum = {
  '/tables': '帳號管理',
  '/products': '產品管理',
  '/categories': '產品類別管理',
  '/billing': '金流管理',
  '/profile': '個人資料設定',
  '/member': '會員管理',
  '/tags': '標籤管理',
};
