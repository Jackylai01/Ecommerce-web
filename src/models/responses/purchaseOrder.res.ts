export interface PurchaseOrderResponse {
  /** _id */
  _id: string;
  /** 訂單ID */
  orderId: string;
  /** 供應商名稱 */
  supplierName: string;
  /** 總金額 */
  totalAmount: number;
  /** 訂單日期 */
  orderDate: Date;
  /** 訂單狀態 */
  status: 'Pending' | 'Completed' | 'Cancelled';
  /** 訂單產品詳情 */
  products: {
    _id: string;
    /** 產品ID */
    productId: string;
    /** 產品名稱 */
    productName: string;
    /** 數量 */
    quantity: number;
    /** 單價 */
    price: number;
    /** 產品 */
    product: any;
  }[];
  expectedDeliveryDate: Date;
  supplier: {
    _id: string;
    name: string;
    contactInfo: string;
    address: string;
    principal: string;
  };
  createdAt: Date;
}
export interface PurchaseOrder {
  supplier: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  orderDate: Date;
  status: 'Pending' | 'Completed' | 'Cancelled';
  expectedDeliveryDate: Date;
}
