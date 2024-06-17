import { BaseEntity } from './base-entity';

export interface Discount extends BaseEntity {
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
}
