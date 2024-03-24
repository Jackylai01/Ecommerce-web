import { TabItem } from '@models/entities/shared/Tabs';
import { MdCategory, MdList } from 'react-icons/md';

export const ProductsConfig: TabItem[] = [
  {
    label: '產品列表',
    path: '/zigong/products',
    icon: MdList,
  },
  {
    label: '類別管理',
    path: '/zigong/categories',
    icon: MdCategory,
  },
];

export const UsersConfig: TabItem[] = [
  {
    label: '帳號管理',
    path: '/zigong/tables',
    icon: MdList,
  },
  {
    label: '會員管理',
    path: '/zigong/member',
    icon: MdCategory,
  },
];
