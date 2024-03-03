export class CreateRootFolderRequest {
  /** 資料夾名稱 */
  name!: string;
}

export class ModifyRootFolderRequest {
  _id!: string;
  /** 資料夾名稱 */
  name!: string;
}

export class CreateFolderRequest {
  /** 父層資料夾 ID */
  parentFolderId!: string;
  /** 資料夾名稱 */
  name!: string;
}

export class ChangeNameArchiveRequest {
  _id!: string;
  /** 名稱 */
  name!: string;
}

export class MoveFilesRequest {
  fromFolderId!: string;
  toFolderId!: string;
  archives!: {
    _id: string;
  }[];
}

export class RemoveFilesRequest {
  folderId!: string;
  archives!: {
    _id: string;
  }[];
}

export enum ModuleFolderName {
  /** 暫存區 */
  'temp' = 'temp',
  /** 廣告輪播 */
  'carousels' = 'carousels',
  /** 新書通報 */
  'catalogs' = 'catalogs',
  /** 常見問題 */
  'faq' = 'faq',
  /** 意見反映 */
  'feedbacks' = 'feedbacks',
  /** 最新消息 */
  'news' = 'news',
  /** 臨時性公告 */
  'temporary' = 'temporary',
  /** 頁面 */
  'pages' = 'pages',
  /** 問卷 */
  'questionnaires' = 'questionnaires',
  /** 空間管理 */
  'rooms' = 'rooms',
  /** 統計報表 */
  'statistics' = 'statistics',
  /** 相簿 */
  'albums' = 'albums',
  /** 審核 */
  'auth-requests' = 'auth-requests',
}

export enum ModuleFolderId {
  /** 暫存區 */
  'temp' = '630730aa61825c00a838d319',
  /** 廣告輪播 */
  'carousels' = '630730aa61825c00a838d320',
  /** 新書通報 */
  'catalogs' = '630730aa61825c00a838d321',
  /** 常見問題 */
  'faq' = '630730aa61825c00a838d322',
  /** 意見反映 */
  'feedbacks' = '630730aa61825c00a838d323',
  /** 最新消息 */
  'news' = '630730aa61825c00a838d324',
  /** 臨時性公告 */
  'temporary' = '630730aa61825c00a838d325',
  /** 頁面 */
  'pages' = '630730aa61825c00a838d326',
  /** 問卷 */
  'questionnaires' = '630730aa61825c00a838d327',
  /** 空間管理 */
  'rooms' = '630730aa61825c00a838d328',
  /** 統計報表 */
  'statistics' = '630730aa61825c00a838d329',
  /** 相簿 */
  'albums' = '630730aa61825c00a838d32a',
  /** 審核 */
  'auth-requests' = '',
}

export class ArchivesSettingsRequest {
  /** 暫存檔保護時間 (時間過後才可刪除) */
  tempFilesProtectionMinutes?: number;
  /** 暫存檔定期刪除時間 (每日幾點幾分) */
  tempFilesDeletionTime?: string;
}
