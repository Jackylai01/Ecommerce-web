import adminAuth from './admin/auth';
import customPage from './admin/custom-page';
import adminUpload from './admin/upload';
import clientAuth from './client/auth';
import clientCart from './client/cart';
import crudLayout from './crud-layout';
import fileSelect from './file-select';
import iconSelect from './icon-select';
import layout from './layout';

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
};

export default appReducer;
