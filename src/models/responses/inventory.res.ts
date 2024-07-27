export interface InventoryResponse {
  /** 產品_id*/
  _id: string;
  /** 產品類型 */
  type: string;
  /** 產品名稱 */
  name: string;
  /** 產品描述 */
  reason: string;
  /** 庫存量 */
  stock: number;
  /** 數量 */
  quantity: number;
  /** 庫存警戒線 */
  reorderLevel: number;
  /** 補貨量 */
  reorderAmount: number;
  /** 更新日期 */
  updatedAt: Date;
  /** 創建日期 */
  createdAt: Date;
  supplier: string;
  /** 庫存_id */
  movementId?: string;
}

export interface Inventory {
  productId: string;
  productName: string;
  reason: string;
  stock: number;
  reorderLevel: number;
  reorderAmount: number;
  movementId?: string;
}
