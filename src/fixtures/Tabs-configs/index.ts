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
