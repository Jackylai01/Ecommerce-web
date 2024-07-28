export interface SupplierResponse {
  /** 訂單ID */
  _id: string;
  /** 供應商名稱 */
  name: string;
  /** 聯繫信息 */
  contactInfo: string;
  /** 地址 */
  address: string;
  /** 負責人 */
  principal: string;
}

export interface Supplier {
  name: string;
  contactInfo: string;
  address: string;
  principal: string;
}
