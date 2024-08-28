import adminArticles from './admin/admin-articles';
import adminArticlesCategories from './admin/admin-articles-category';
import adminERPInventory from './admin/admin-erp/inventory';
import adminERPPurchaseOrder from './admin/admin-erp/purchaseOrder';
import adminERPReports from './admin/admin-erp/reports';
import adminERPSalesOrder from './admin/admin-erp/salesOrder';
import adminERPSuppliers from './admin/admin-erp/supplier';
import adminMembershipLevel from './admin/admin-membership-level';
import adminNews from './admin/admin-news';
import adminNewsCategories from './admin/admin-news-categorys';
import adminPermissions from './admin/admin-permissions';
import adminRefunds from './admin/admin-refunds';
import adminRoles from './admin/admin-roles';
import adminAuth from './admin/auth';
import adminClientUsers from './admin/client-users';
import customPage from './admin/custom-page';
import dashBoardTheme from './admin/dash-board/themeSlice';
import adminDesignPage from './admin/design-pages';
import adminDiscount from './admin/discount';
import adminOrders from './admin/orders';
import adminPayments from './admin/payments';
import adminProductsCategory from './admin/product-category';
import adminProductsTags from './admin/product-tags';
import adminProducts from './admin/products';
import adminShipment from './admin/shipments';
import adminShoppingCreditsType from './admin/shopping-credits-type';
import adminShoppingCredits from './admin/shoppingCredits';
import adminUpload from './admin/upload';
import clientAuth from './client/auth';
import clientCart from './client/cart';
import clientOrders from './client/orders';
import clientRefunds from './client/refunds';
import clientShoppingCredits from './client/shopping-credits';
import crudLayout from './crud-layout';
import fileSelect from './file-select';
import iconSelect from './icon-select';
import layout from './layout';
import publicArticles from './public/articles';
import publicCategory from './public/categories';
import publicDashboard from './public/dashboard';
import publicDesignPage from './public/design-pages';
import publicDiscounts from './public/discounts';
import publicFavorites from './public/favorite';
import publicNews from './public/news';
import publicPayments from './public/payments';
import publicProducts from './public/products';
import publicShipment from './public/shipment';
const appReducer = {
  layout,
  crudLayout,
  adminAuth,
  adminUpload,
  iconSelect,
  customPage,
  fileSelect,
  clientAuth,
  clientCart,
  dashBoardTheme,
  adminProducts,
  adminProductsCategory,
  adminProductsTags,
  adminClientUsers,
  publicProducts,
  publicFavorites,
  adminDiscount,
  publicShipment,
  publicCategory,
  publicPayments,
  adminOrders,
  adminShipment,
  adminPayments,
  clientRefunds,
  adminRefunds,
  clientOrders,
  publicDiscounts,
  adminShoppingCredits,
  clientShoppingCredits,
  adminERPInventory,
  adminERPPurchaseOrder,
  adminRoles,
  adminERPReports,
  adminERPSalesOrder,
  adminERPSuppliers,
  adminDesignPage,
  adminMembershipLevel,
  adminShoppingCreditsType,
  adminArticles,
  adminArticlesCategories,
  publicArticles,
  publicDashboard,
  publicDesignPage,
  adminNewsCategories,
  adminNews,
  publicNews,
  adminPermissions,
};

export default appReducer;
