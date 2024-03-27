export interface FieldSpec {
  fieldName: string;
  type: 'text' | 'image';
  displayName: string;
}

export const profileUsers: FieldSpec[] = [
  { fieldName: 'username', type: 'text', displayName: '用戶名稱' },
  { fieldName: 'email', type: 'text', displayName: '信箱' },
  { fieldName: 'city', type: 'text', displayName: '城市' },
  { fieldName: 'address', type: 'text', displayName: '地址' },
  { fieldName: 'profileImage', type: 'image', displayName: '頭像' },
];

export const clientUsersTables: FieldSpec[] = [
  { fieldName: 'username', type: 'text', displayName: '用戶名稱' },
  { fieldName: 'email', type: 'text', displayName: '信箱' },
  { fieldName: 'city', type: 'text', displayName: '城市' },
  { fieldName: 'address', type: 'text', displayName: '地址' },
  { fieldName: 'profileImage', type: 'image', displayName: '頭像' },
];
