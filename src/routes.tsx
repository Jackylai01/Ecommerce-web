import {
  CartIcon,
  CreditIcon,
  HomeIcon,
  PayPalIcon,
  PersonIcon,
  StatsIcon,
} from '@components/Icons/Icons';
import Billing from '@components/Layout/AdminLayout/Billing';
import Dashboard from '@components/Layout/AdminLayout/Dashboard';
import DiscountTableContainer from '@components/Layout/AdminLayout/Discount';
import LogisticsManagement from '@components/Layout/AdminLayout/LogisticsManagement';
import Profile from '@components/Layout/AdminLayout/Profile';
import Tables from '@components/Layout/AdminLayout/Tables';
import { ADMIN_ROUTE } from '@fixtures/constants';

var dashRoutes = [
  {
    path: `/`,
    name: 'Dashboard',
    icon: HomeIcon,
    component: Dashboard,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    path: '/tables',
    name: 'Users',
    icon: StatsIcon,
    component: Tables,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    path: '/billing',
    name: 'Billing',
    icon: CreditIcon,
    component: Billing,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    path: '/products',
    name: 'Products',
    icon: CreditIcon,
    component: Billing,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    path: '/logistics',
    name: 'Logistics',
    icon: StatsIcon,
    component: LogisticsManagement,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    path: '/payment',
    name: 'Orders',
    icon: StatsIcon,
    component: PayPalIcon,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    path: '/discounts',
    name: 'Discounts',
    icon: CartIcon,
    component: DiscountTableContainer,
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
        icon: PersonIcon,
        secondaryNavbar: true,
        component: Profile,
        layout: `/${ADMIN_ROUTE}`,
      },
    ],
  },
];
export default dashRoutes;
