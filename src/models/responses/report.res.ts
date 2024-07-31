/**
 * InventoryReport
 *
 * Represents the overall inventory report, including total inventory value,
 * total inventory count, and lists of products with low and high stock levels.
 */
export interface InventoryReport {
  /** 總庫存價值 */
  totalInventoryValue: number;
  /** 總庫存數量 */
  totalInventoryCount: number;
  /** 低庫存產品列表 */
  lowStockProducts: Product[];
  /** 高庫存產品列表 */
  highStockProducts: Product[];
}

/**
 * PurchaseOrderReport
 *
 * Represents a report of purchase orders, detailing product ID, quantity, price,
 * date of purchase, and reason for the purchase.
 */
export interface IStockMovement {
  /** 產品ID */
  productId: string;
  /** 購買數量 */
  quantity: number;
  /** 購買價格 */
  price: number;
  /** 購買日期 */
  date: Date;
  /** 購買原因 */
  reason: string;
  /** 類型 (入庫, 出庫) */
  type: 'inbound' | 'outbound';
}

/**
 * SalesOrderReport
 *
 * Represents a report of sales orders, detailing product ID, quantity, price,
 * date of sale, and reason for the sale.
 */
export interface SalesOrderReport {
  /** 產品ID */
  productId: string;
  /** 銷售數量 */
  quantity: number;
  /** 銷售價格 */
  price: number;
  /** 銷售日期 */
  date: Date;
  /** 銷售原因 */
  reason: string;
  /** 月份 */
  month?: string;
  /** 庫存 */
  stock?: number;
  /** 銷售 */
  sales?: number;
  /** 利潤 */
  profit?: number;
}

/**
 * Product
 *
 * Represents a product within the inventory system, including its ID, name,
 * current stock level, and price.
 */
export interface Product {
  /** 產品ID */
  _id: string;
  /** 產品名稱 */
  name: string;
  /** 庫存數量 */
  stock: number;
  /** 產品價格 */
  price: number;
}
