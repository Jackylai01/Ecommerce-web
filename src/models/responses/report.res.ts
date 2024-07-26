export interface InventoryReport {
  /** 產品名稱 */
  productName: string;
  /** 當前庫存 */
  currentStock: number;
  /** 補貨警戒線 */
  reorderLevel: number;
  /** 補貨量 */
  reorderAmount: number;
}

export interface PurchaseOrderReport {
  /** 訂單ID */
  orderId: string;
  /** 供應商名稱 */
  supplierName: string;
  /** 訂單日期 */
  orderDate: Date;
  /** 總金額 */
  totalAmount: number;
}

export interface SalesOrderReport {
  /** 訂單ID */
  orderId: string;
  /** 客戶名稱 */
  customerName: string;
  /** 訂單日期 */
  orderDate: Date;
  /** 總金額 */
  totalAmount: number;
}
