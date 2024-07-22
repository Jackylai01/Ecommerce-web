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
  discountCodes: {
    code: string;
    usageLimit: number;
    usedCount: number;
    _id: string;
  }[];
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
  remainingUses: number | string;
}

export interface DiscountUsage {
  discountCodes: any[];
  usageHistory: {
    user: {
      username: string;
      email: string;
    };
    usedAt: Date;
    products: {
      name: string;
      quantity: number;
      priceAtPurchase: number;
    }[];
  }[];
}
