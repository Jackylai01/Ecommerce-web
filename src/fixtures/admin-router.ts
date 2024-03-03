import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { ElementType } from 'react';
import { FaHome, FaUserCog } from 'react-icons/fa';
import { MdArticle, MdPause } from 'react-icons/md';

export type AsideRouterType = {
  icon: ElementType;
  label: string;
  href: string;
};

export const platformMaintenanceRouter: AsideRouterType[] = [
  {
    icon: FaHome,
    label: '首頁',
    href: '/',
  },
  {
    icon: FaUserCog,
    label: '後台帳號管理',
    href: 'admin-user',
  },
  {
    icon: MdArticle,
    label: '文章管理',
    href: 'articles',
  },
  {
    icon: MdPause,
    label: '輪播圖管理',
    href: 'carouses',
  },
];

export const operateRouter: AsideRouterType[] = [
  { icon: AddIcon, label: '新增項目', href: 'create' },
  { icon: EditIcon, label: '修改項目', href: '[id]' },
];

export const allAdminRouter: AsideRouterType[] = [
  ...platformMaintenanceRouter,
  ...operateRouter,
];

export const asideRouter = [
  {
    label: '平台維運管理',
    router: platformMaintenanceRouter,
  },
];
