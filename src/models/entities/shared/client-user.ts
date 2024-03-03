/** 一般使用者 */
export class ClientUser {
  /** 帳號 */
  username!: string;
  /** 當前刷新權杖 */
  currentHashedRefreshToken?: string;
  /** 姓名 */
  name!: string;
  /** 電子郵件 */
  email?: string;
  /** 手機號碼 */
  phoneNumber?: string;
  /** Facebook ID */
  fbId?: string;
  /** Facebook Email */
  fbEmail?: string;
  /** Google ID */
  gId?: string;
  /** Google Email */
  gEmail?: string;
  /** 第三方使用者登入時間 */
  thirdPartyLoggedInAt?: Date;
  /** 最後登入時間 */
  lastLoginAt?: Date;
  /** 邀請碼 (別人給的 註冊時輸入) */
  invitationCode?: string;
  /** UUID */
  readonly uuid?: string;
  /** 是否本體 */
  readonly isMaster?: boolean;
}
