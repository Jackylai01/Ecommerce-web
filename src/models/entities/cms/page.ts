import { CustomPageBlock } from '../custom-page-template';
import { BaseEntity } from '../shared/base-entity';

/**
 * 頁面
 * 有 routeId 的頁面為列表頁底下之頁面
 * 無 routeId 的頁面即為單頁 _id 等於 routeId
 */
export class Page extends BaseEntity {
  /** 路徑 ID */
  routeId: string = '';
  /** 標題 */
  title: string = '';
  /** 封面 */
  coverImageUrl?: string;
  /** 簡介 */
  description?: string;
  /** 頁面區塊 */
  blocks: CustomPageBlock[] = [];
  /** 觀看次數 */
  readonly views?: number;
  /** 發佈者 */
  readonly userId: string = '';
}

/** 編輯頁面 */

export class ModifyPage {
  _id?: string;
  /** 標題 */
  title: string = '';
  /** 封面 */
  coverImageUrl?: string;
  /** 簡介 */
  description: string = '';
  /** 頁面區塊 */
  blocks?: CustomPageBlock[] = [];
  /** 文字 */
  blockText?: string;
  /** 路徑 ID */
  routeId: string = '';
}
