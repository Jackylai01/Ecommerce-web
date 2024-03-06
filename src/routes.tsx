import { CreditIcon, HomeIcon, StatsIcon } from '@components/Icons/Icons';
import Billing from '@components/Layout/AdminLayout/Billing';
import Dashboard from '@components/Layout/AdminLayout/Dashboard';
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

  // {
  //   name: 'ACCOUNT PAGES',
  //   category: 'account',
  //   rtlName: 'صفحات',
  //   state: 'pageCollapse',
  //   views: [
  //     {
  //       path: '/profile',
  //       name: 'Profile',
  //       rtlName: 'لوحة القيادة',
  //       icon: <PersonIcon color='inherit' />,
  //       secondaryNavbar: true,
  //       component: Profile,
  //       layout: '/admin',
  //     },
  //     {
  //       path: '/signin',
  //       name: 'Sign In',
  //       rtlName: 'لوحة القيادة',
  //       icon: <DocumentIcon color='inherit' />,
  //       component: SignIn,
  //       layout: '/auth',
  //     },
  //     {
  //       path: '/signup',
  //       name: 'Sign Up',
  //       rtlName: 'لوحة القيادة',
  //       icon: <RocketIcon color='inherit' />,
  //       secondaryNavbar: true,
  //       component: SignUp,
  //       layout: '/auth',
  //     },
  //   ],
  // },
];
export default dashRoutes;
