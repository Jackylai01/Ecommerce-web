import {
  FaBoxOpen,
  FaDollarSign,
  FaFileInvoiceDollar,
  FaHome,
  FaShoppingCart,
  FaUser,
  FaUsers,
} from 'react-icons/fa';

import { PayPalIcon } from '@components/Icons/Icons';
import Billing from '@components/Layout/AdminLayout/Billing';
import Dashboard from '@components/Layout/AdminLayout/Dashboard';
import DiscountTableContainer from '@components/Layout/AdminLayout/Discount';
import Profile from '@components/Layout/AdminLayout/Profile';
import Tables from '@components/Layout/AdminLayout/Tables';
import { ADMIN_ROUTE } from '@fixtures/constants';
import InventorySystem from '@pages/zigong/erp/inventory';
import ShoppingCreditsManagement from '@pages/zigong/shopping-credits';

const dashRoutes = [
  {
    path: '/',
    name: 'Dashboard',
    icon: FaHome,
    component: Dashboard,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    path: '/tables',
    name: 'Users',
    icon: FaUsers,
    component: Tables,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    path: '/billing',
    name: 'Billing',
    icon: FaDollarSign,
    component: Billing,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    path: '/products',
    name: 'Products',
    icon: FaBoxOpen,
    component: Billing,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    path: '/payment',
    name: 'Orders',
    icon: FaFileInvoiceDollar,
    component: PayPalIcon, // 注意：這應該是路由組件，而不是圖標
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    path: '/discounts',
    name: 'Discounts',
    icon: FaShoppingCart,
    component: DiscountTableContainer,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    path: '/shopping-credits',
    name: 'ShoppingCredits',
    icon: FaShoppingCart,
    component: ShoppingCreditsManagement,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    path: '/erp/inventory',
    name: 'Inventory System',
    icon: FaBoxOpen,
    component: InventorySystem,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    name: 'ACCOUNT PAGES',
    category: 'account',
    state: 'pageCollapse',
    views: [
      {
        path: '/profile',
        name: 'Profile',
        icon: FaUser,
        secondaryNavbar: true,
        component: Profile,
        layout: `/${ADMIN_ROUTE}`,
      },
    ],
  },
];
export default dashRoutes;
