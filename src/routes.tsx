import {
  CreditIcon,
  HomeIcon,
  PersonIcon,
  StatsIcon,
} from '@components/Icons/Icons';
import Billing from '@components/Layout/AdminLayout/Billing';
import Dashboard from '@components/Layout/AdminLayout/Dashboard';
import Profile from '@components/Layout/AdminLayout/Profile';
import Tables from '@components/Layout/AdminLayout/Tables';
import { ADMIN_ROUTE } from '@fixtures/constants';

var dashRoutes = [
  {
    path: `/`,
    name: 'Dashboard',
    rtlName: 'لوحة القيادة',
    icon: HomeIcon,
    component: Dashboard,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    path: '/tables',
    name: 'Tables',
    rtlName: 'لوحة القيادة',
    icon: StatsIcon,
    component: Tables,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    path: '/billing',
    name: 'Billing',
    rtlName: 'لوحة القيادة',
    icon: CreditIcon,
    component: Billing,
    layout: `/${ADMIN_ROUTE}`,
  },

  {
    name: 'ACCOUNT PAGES',
    category: 'account',
    rtlName: 'صفحات',
    state: 'pageCollapse',
    views: [
      {
        path: '/profile',
        name: 'Profile',
        rtlName: 'لوحة القيادة',
        icon: PersonIcon,
        secondaryNavbar: true,
        component: Profile,
        layout: `/${ADMIN_ROUTE}`,
      },
    ],
  },
];
export default dashRoutes;
