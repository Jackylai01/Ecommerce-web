import {
  FaAssistiveListeningSystems,
  FaBoxOpen,
  FaDollarSign,
  FaEdit,
  FaFileAlt,
  FaFileInvoiceDollar,
  FaHome,
  FaNewspaper,
  FaQuestionCircle,
  FaShoppingCart,
  FaUser,
  FaUsers,
} from 'react-icons/fa';

import { PayPalIcon } from '@components/Icons/Icons';
import AdminEditPageLayout from '@components/Layout/AdminEditLayout';
import AdminSettings from '@components/Layout/AdminLayout/AdminSettings';
import ArticleManagement from '@components/Layout/AdminLayout/ArticleManagement';
import Billing from '@components/Layout/AdminLayout/Billing';
import Dashboard from '@components/Layout/AdminLayout/Dashboard';
import DiscountTableContainer from '@components/Layout/AdminLayout/Discount';
import NewsManagement from '@components/Layout/AdminLayout/NewsManagement';
import Profile from '@components/Layout/AdminLayout/Profile';
import Tables from '@components/Layout/AdminLayout/Tables';
import { ADMIN_EDIT_PAGES_ROUTE, ADMIN_ROUTE } from '@fixtures/constants';
import InventorySystem from '@pages/zigong/erp/inventory';
import FaqManagement from '@pages/zigong/faq';
import ShoppingCreditsManagement from '@pages/zigong/shopping-credits';

const dashRoutes = [
  {
    path: '/',
    name: '首頁',
    icon: FaHome,
    component: Dashboard,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    path: '/tables',
    name: '用戶管理',
    icon: FaUsers,
    component: Tables,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    path: '/billing',
    name: '金流管理',
    icon: FaDollarSign,
    component: Billing,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    path: '/products',
    name: '產品管理',
    icon: FaBoxOpen,
    component: Billing,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    path: '/payment',
    name: '訂單管理',
    icon: FaFileInvoiceDollar,
    component: PayPalIcon,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    path: '/discounts',
    name: '折扣管理',
    icon: FaShoppingCart,
    component: DiscountTableContainer,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    path: '/shopping-credits',
    name: '購物金管理',
    icon: FaShoppingCart,
    component: ShoppingCreditsManagement,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    path: '/faq',
    name: '常見問答管理',
    icon: FaQuestionCircle,
    component: FaqManagement,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    path: '/news',
    name: '最新消息管理',
    icon: FaNewspaper,
    component: NewsManagement,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    path: '/erp/inventory',
    name: '庫存管理',
    icon: FaBoxOpen,
    component: InventorySystem,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    path: '/articles',
    name: '文章管理',
    icon: FaFileAlt,
    component: ArticleManagement,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    name: 'ACCOUNT PAGES',
    category: 'account',
    state: 'pageCollapse',
    views: [
      {
        path: '/profile',
        name: '個人管理',
        icon: FaUser,
        secondaryNavbar: true,
        component: Profile,
        layout: `/${ADMIN_ROUTE}`,
      },
    ],
  },
  {
    path: '/admin-system',
    name: '系統設定',
    icon: FaAssistiveListeningSystems,
    component: AdminSettings,
    layout: `/${ADMIN_ROUTE}`,
  },
  {
    path: '/design-store',
    name: '一頁式商店設計',
    icon: FaEdit,
    component: AdminEditPageLayout,
    layout: `/${ADMIN_EDIT_PAGES_ROUTE}`,
  },
];
export default dashRoutes;
