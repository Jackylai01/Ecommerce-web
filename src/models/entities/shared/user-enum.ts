/** 帳號狀態 */
export enum AccountStatus {
  /** 啟用 */
  Enabled = 'Enabled',
  /** 停用 */
  Disabled = 'Disabled',
  /** 異常鎖定 */
  Locked = 'Locked',
}

export const getAccountStatusText = (value: AccountStatus): string => {
  switch (value) {
    case AccountStatus.Enabled:
      return '啟用';
    case AccountStatus.Disabled:
      return '停用';
    case AccountStatus.Locked:
      return '異常鎖定';
  }
};

/** 註冊狀態 */
export enum RegisterStatus {
  /** 已連結第三方登入 */
  ThirdPartyLoginLinked = 'ThirdPartyLoginLinked',
  /** 等候確認信箱 */
  WaitingEmailConfirmation = 'WaitingEmailConfirmation',
  /** 已確認信箱 */
  EmailConfirmed = 'EmailConfirmed',
  /** 已登入過系統 */
  LoggedInSystem = 'LoggedInSystem',
}
