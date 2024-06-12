import adminAuth from './admin/auth';
import adminClientUsers from './admin/client-users';
import customPage from './admin/custom-page';
import dashBoardTheme from './admin/dash-board/themeSlice';
import adminProductsCategory from './admin/product-category';
import adminProductsTags from './admin/product-tags';
import adminProducts from './admin/products';
import adminUpload from './admin/upload';
import clientAuth from './client/auth';
import clientCart from './client/cart';
import crudLayout from './crud-layout';
import fileSelect from './file-select';
import iconSelect from './icon-select';
import layout from './layout';
import publicFavorites from './public/favorite';
import publicProducts from './public/products';

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
};

export default appReducer;
