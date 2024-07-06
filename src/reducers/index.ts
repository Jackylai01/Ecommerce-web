import adminRefunds from './admin/admin-refunds';
import adminAuth from './admin/auth';
import adminClientUsers from './admin/client-users';
import customPage from './admin/custom-page';
import dashBoardTheme from './admin/dash-board/themeSlice';
import adminDiscount from './admin/discount';
import adminOrders from './admin/orders';
import adminPayments from './admin/payments';
import adminProductsCategory from './admin/product-category';
import adminProductsTags from './admin/product-tags';
import adminProducts from './admin/products';
import adminShipment from './admin/shipments';
import adminUpload from './admin/upload';
import clientAuth from './client/auth';
import clientCart from './client/cart';
import clientRefunds from './client/refunds';
import crudLayout from './crud-layout';
import fileSelect from './file-select';
import iconSelect from './icon-select';
import layout from './layout';
import publicCategory from './public/categories';
import publicFavorites from './public/favorite';
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
};

export default appReducer;
