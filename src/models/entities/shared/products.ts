import { BaseEntity } from './base-entity';

export interface Product extends BaseEntity {
  // 商品名稱
  name: string;
  // 商品描述
  description: string;
  // 價格
  price: number;
  // 商品類別或標籤，這裡使用string類型來代表mongoose的ObjectId
  category: string[];
  // 商品封面照片
  coverImage: {
    imageUrl: string;
    imageId: string;
  };
  // 商品圖片
  images: { imageUrl: string; imageId: string }[];
  // 商品狀態（如：上架、下架、缺貨）
  status?: string[];
  // 商品的規格或特性（例如：顏色、尺寸等）
  specifications?: {
    key: string;
    value: string;
  }[];
  // 用戶對商品的評分和評論
  ratings?: {
    userId?: string;
    rating?: number;
    review?: string;
  }[];
  // 最低購買數量
  minimumPurchase?: number;
  // 商品的平均評分
  averageRating?: number;
  // 自訂模組，可以根據您的實際需求添加額外的類型定義
  blocks: any[];
}

export interface Category {
  // 類別ID
  _id: string;
  // 類別名稱
  name: string;
  // 類別描述
  description?: string;
  // 類別封面照
  coverImage?: {
    imageUrl: string;
    imageId: string;
  };
}
