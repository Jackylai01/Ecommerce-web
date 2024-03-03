import { FieldConfig } from '@components/Form';
import { PasswordRegex } from '@models/schema/base.schema';

export const resetPasswordFieldConfigs: FieldConfig[] = [
  {
    name: 'passwordGroup',
    type: 'equalFields',
    label: '密碼群組',
    fieldConfigs: [
      {
        name: 'password',
        type: 'password',
        label: '新密碼',
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
];
