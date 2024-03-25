export class AuthResponse {
  accessToken!: string;
  refreshToken!: string;
  expirationDate!: string;
  userInfo!: UserInfo;
  currentSessionToken!: string;
}

export class JwtResponse {
  _id!: string;
  exp!: number;
}

export class ProfileImage {
  imageUrl!: string;
  imageId!: string;
}

export class UserInfo {
  id!: string;
  username!: string;
  roles!: string[];
  currentSessionToken!: string;
  expirationDate: Date | null = null;
  phoneNumber!: string;
}

export class ProfileResponse {
  _id!: string;
  username!: string;
  email!: string;
  address!: string;
  city!: string;
  country!: string;
  postalCode!: string;
  expirationDate: Date | null = null;
  profileImage!: any;
  roles!: string;
  emailVerificationToken!: string;
}

export class UserCreateAccountResponse {
  _id!: string;
  name!: string;
  username!: string;
  email!: string;
  password!: string;
  phoneNumber!: string;
}

export class ResetPassword {
  currentPassword!: string;
  newPassword!: string;
}

export enum Role {
  /** 管理端 */
  Admin = 'admin',
  /** 客戶端 */
  Client = 'client',
}

export enum RoleName {
  管理員 = '管理員',
  客戶端 = '客戶端',
}
