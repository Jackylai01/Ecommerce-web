export interface FieldSpec {
  fieldName: string;
  type: 'text' | 'image';
}

export const profileUsers: FieldSpec[] = [
  { fieldName: 'username', type: 'text' },
  { fieldName: 'email', type: 'text' },
  { fieldName: 'city', type: 'text' },
  { fieldName: 'address', type: 'text' },
  { fieldName: 'profileImage', type: 'image' },
];
