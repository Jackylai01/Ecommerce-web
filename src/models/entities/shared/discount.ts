import { BaseEntity } from './base-entity';

export interface Discount extends BaseEntity {
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
  productId?: any;
  discountCode?: string[];
  usageLimit?: number;
  usedCount?: number;
  isActive?: boolean;
  usageHistory?: any;
  priority?: number;
  isStoreWide?: boolean;
  combinableWithOtherDiscounts?: boolean;
  selectedCategories?: string[];
  selectedProducts?: string[];
  generateCodesCount?: number;
  discountCodeInputMethod?: 'manual' | 'generate';
  unlimitedUse?: boolean;
}
