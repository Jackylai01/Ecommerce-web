import { ModuleFolderName } from '../../requests/archive.req';
import { BaseEntity } from '../shared/base-entity';
import { TreeEntity } from '../shared/tree-entity';

/** 檔案櫃 */
export class Archive extends TreeEntity {
  /** 路徑類型 */
  type!: ArchiveType;
  /** 名稱 */
  name!: string;
  /** 副檔名 */
  extension?: string;
  /** 檔案大小 */
  size?: number;
  /** 下載數 */
  downloadCount?: number;
  /** 已核准 */
  isAuth?: boolean;
  /** 核准日期 */
  authDate?: Date;
  /** 是否模組資料夾 */
  isModuleFolder?: boolean;
  /** 是否模組檔案 */
  isModuleFile?: boolean;
  /** 關聯 */
  ref?: ArchiveRef[];
}

export class ArchiveRef {
  _id!: string;
  module!: ModuleFolderName;
  date!: Date;
}

/** 路徑類型 */
export enum ArchiveType {
  /** 資料夾 */
  Folder = 'Folder',
  /** 檔案 */
  File = 'File',
}

export class NestedArchive extends Archive {
  /** 子層 */
  children!: NestedArchive[];
}

export class DownloadLog extends BaseEntity {
  fileId!: string;
  ip!: string;
  userId?: string;
}
