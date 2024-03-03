import { AccountStatus } from './user-enum';

/** 基本實體 */
export class BaseEntity {
  /** ID */
  _id?: string;
  /** 建立時間 */
  createdAt?: Date;
  /** 建立者 ID */
  createdUserId?: string;
  /** 修改時間 */
  modifiedAt?: Date;
  /** 修改者 ID */
  modifiedUserId?: string;
  /** 建立者 */
  createdUser?: { _id?: string; name: string };
  /** 修改者 */
  modifiedUser?: { _id?: string; name: string };
}

/** 基本使用者實體 */
export class BaseUserEntity extends BaseEntity {
  hashedPassword?: string;
  currentHashedRefreshToken?: string;
  accountStatus = AccountStatus.Enabled;
}
