import { Roles, RolesData } from '@models/entities/admin-user';
import { CRUDConfig } from '.';

const adminUserCRUDConfig: CRUDConfig = {
  title: '後台帳號管理',
  apiModuleName: 'admin-users',
  layout: ['table', 'form'],
  actions: ['create', 'update', 'delete', 'return', 'save'],
  tableConfigs: [
    { title: '使用者姓名', key: 'username' },
    { title: '使用者信箱', key: 'email' },
    { title: '最後編輯時間', key: 'modifiedAt', format: 'date' },
  ],
  fieldConfigs: [
    {
      name: '_id',
      type: 'hidden',
      label: 'ID',
      required: false,
    },
    {
      name: 'username',
      type: 'text',
      label: '姓名',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: '電子郵件',
      required: true,
    },
    {
      name: 'roles',
      type: 'multiSelect',
      label: '權限',
      required: true,
      options: [RolesData.admin, RolesData.staff],
      displayOptions: [Roles.後臺管理員, Roles.編輯],
    },
    {
      name: 'password',
      type: 'password',
      label: '密碼',
      required: false,
    },
  ],
};

export default adminUserCRUDConfig;
