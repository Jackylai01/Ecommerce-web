import { BaseEntity } from './base-entity';

/** 樹狀結構 */
export class TreeEntity extends BaseEntity {
  /** 名稱 */
  name!: string;
  /** 路徑 */
  path?: string;
  /** 父層 ID */
  parentId?: string;
  /** 排序 */
  sort?: string;
}

/** 樹狀結點 */
export class TreeNode {
  _id?: string;
  /** 名稱 */
  name!: string;
  /** 子節點 */
  children!: TreeNode[];
  /** 其他屬性 */
  [key: string]: any;
}

export class NestedTree extends TreeEntity {
  /** 子層 */
  children!: NestedTree[];
  /** 其他屬性 */
  [key: string]: any;
}
