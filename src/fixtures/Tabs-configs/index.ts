import { TabItem } from '@models/entities/shared/Tabs';
import { FaUserShield } from 'react-icons/fa';
import { MdCategory, MdList, MdLocalOffer, MdSearch } from 'react-icons/md';

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
  {
    label: '標籤管理',
    path: '/zigong/tags',
    icon: MdLocalOffer,
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
  {
    label: '角色管理',
    path: '/zigong/roles',
    icon: FaUserShield,
  },
];

export const tabsConfig: TabItem[] = [
  { label: '折扣模組', path: '/zigong/discounts', icon: MdList },
  { label: '查詢折扣碼', path: '/zigong/discounts/usage', icon: MdSearch },
];
