export interface InventoryResponse {
  /** 產品ID */
  productId: string;
  /** 產品名稱 */
  productName: string;
  /** 產品描述 */
  productDescription: string;
  /** 庫存量 */
  stock: number;
  /** 庫存警戒線 */
  reorderLevel: number;
  /** 補貨量 */
  reorderAmount: number;
  /** 更新日期 */
  updatedAt: Date;
}

export interface Inventory {
  productId: string;
  stock: number;
  reorderLevel: number;
  reorderAmount: number;
}
