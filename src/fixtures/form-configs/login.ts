import { FieldConfig } from '@components/Form';

export const loginFieldConfigs: FieldConfig[] = [
  {
    name: 'email',
    type: 'email',
    label: '帳號',
    required: true,
  },
  {
    name: 'password',
    type: 'password',
    label: '密碼',
    required: true,
  },
];
