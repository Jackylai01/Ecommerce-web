export class ProductsResponse {
  // 商品_id
  _id!: string;
  // 商品名稱
  name!: string;
  // 商品描述
  description!: string;
  // 商品價格
  price!: number;
  // 商品類別
  category!: any;
  // 商品封面
  overImage!: string;
  // 商品相片
  images!: string[];
  // 商品庫存
  stock!: number;
  // 商品的規格或特性（例如：顏色、尺寸等）。
  specifications!: any[];
  // 產品標籤
  tags!: any[];
  // 最低購買數量
  minimumPurchase!: number;
  // 最高購買數量
  maximumPurchase!: number;
  // 自訂模組
  blocks!: [];
  // 商品編號(自訂) 例:bka-1130156
  code?: string;
}
