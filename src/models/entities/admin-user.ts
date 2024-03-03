import { BaseUserEntity } from './shared/base-entity';
import { AccountStatus } from './shared/user-enum';

/** 管理員使用者 */
export class AdminUser extends BaseUserEntity {
  /** 姓名 */
  username!: string;

  /** 電子郵件 */
  email?: string;

  /** 帳號狀態 */
  accountStatus!: AccountStatus;

  /** 忘記密碼驗證碼 */
  forgotCode?: string;

  /** 忘記密碼驗證碼發送時間 */
  sendForgotCodeAt?: Date;

  /** 最後登入時間 */
  lastLoginAt?: Date;
}

export enum RolesData {
  admin = 'admin',
  staff = 'staff',
}

export enum Roles {
  後臺管理員 = '後台管理員',
  編輯 = '編輯',
}
