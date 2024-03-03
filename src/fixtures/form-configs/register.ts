import { FieldConfig } from '@components/Form';
import {
  EmailRegex,
  PasswordRegex,
  UsernameRegex,
} from '@models/schema/base.schema';

export const registerFieldConfigs: FieldConfig[] = [
  {
    name: 'username',
    type: 'text',
    label: '帳號',
    required: true,
    pattern: {
      value: UsernameRegex,
      message: '帳號須為 6 ~ 30 字，只能使用大小寫及數字，不含特殊符號',
    },
  },
  {
    name: 'passwordGroup',
    type: 'equalFields',
    label: '密碼群組',
    fieldConfigs: [
      {
        name: 'password',
        type: 'password',
        label: '密碼',
        required: true,
        pattern: {
          value: PasswordRegex,
          message: '密碼須為 6 ~ 30 字，包含大小寫及數字',
        },
      },
      {
        name: 'confirmPassword',
        type: 'password',
        label: '確認密碼',
        required: true,
        pattern: {
          value: PasswordRegex,
          message: '密碼須為 6 ~ 30 字，包含大小寫及數字',
        },
      },
    ],
  },
  {
    name: 'name',
    type: 'text',
    label: '姓名',
    required: true,
  },
  {
    name: 'email',
    type: 'email',
    label: '電子郵件',
    required: true,
    pattern: {
      value: EmailRegex,
      message: '請輸入合法的 Email',
    },
  },
  {
    name: 'phoneNumber',
    type: 'text',
    label: '手機',
    required: true,
  },
];
