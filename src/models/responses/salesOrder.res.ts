export interface SalesOrderResponse {
  /** id */
  _id: string;
  /** 訂單ID */
  orderId: string;
  /** 客戶名稱 */
  user: string;
  /** 總金額 */
  totalAmount: number;
  /** 訂單日期 */
  orderDate: Date;
  /** 訂單狀態 */
  status: 'Pending' | 'Shipped' | 'Completed' | 'Cancelled';
  /** 更新日期 */
  updatedAt: Date;
  /** 創建日期 */
  createdAt: Date;
  /** 訂單產品詳情 */
  products: {
    /** 產品ID */
    product: string;
    /** 產品名稱 */
    productName: string;
    /** 數量 */
    quantity: number;
    /** 單價 */
    price: number;
  }[];
}

export interface SalesOrder {
  user: string;
  products: {
    product: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  orderDate: Date;
  status: 'Pending' | 'Shipped' | 'Completed' | 'Cancelled';
}
