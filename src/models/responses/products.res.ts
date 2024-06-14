export type ProductsResponse = {
  // 產品_id
  _id: string;
  // 路由產品名稱
  slug: string;
  // 商品名稱
  name: string;
  // 商品描述
  description: string;
  // 價格
  price: number;
  // 商品類別或標籤
  category: any[];
  // 商品封面照片
  coverImage: {
    imageUrl: string;
    imageId: string;
  };
  // 商品圖片
  images: { imageUrl: string; imageId: string }[];
  // 商品狀態（如：上架、下架）
  status?: string[];
  // 商品的規格或特性（例如：顏色、尺寸等）。
  specifications?: any[];
  // 庫存(總)
  stock?: number;
  // 最低購買數量
  minimumPurchase?: number;
  // 最高購買數量
  maximumPurchase?: number; // 最大购买数量
  // 產品標籤
  tags: any[];
  // 商品編號(自訂) 例:bka-1130156
  code?: string;
  // 自訂模組
  blocks: any[];
};
