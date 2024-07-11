export interface IDiscount {
  _id: string;
  name: string;
  type:
    | 'orderDiscount'
    | 'productDiscount'
    | 'orderFreeShipping'
    | 'productFreeShipping'
    | 'productCodeDiscount'
    | 'orderCodeDiscount';
  value: number;
  calculationMethod: 'percentage' | 'fixedAmount';
  startDate: Date;
  endDate: Date;
  minimumAmount?: number;
  discountCode?: string[];
  usageLimit?: number;
  usedCount?: number;
  isActive?: boolean;
  productId?: string[];
  combinableWithOtherDiscounts?: boolean;
  priority: number;
  usageHistory: {
    userId: string;
    usedAt: Date;
  }[];
}
