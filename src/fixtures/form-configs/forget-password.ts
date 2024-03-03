import { FieldConfig } from '@components/Form';
import { EmailRegex } from '@models/schema/base.schema';

export const forgetPasswordFieldConfigs: FieldConfig[] = [
  {
    name: 'email',
    type: 'email',
    label: '信箱',
    required: true,
    pattern: {
      value: EmailRegex,
      message: '請輸入合法的 Email',
    },
  },
];
