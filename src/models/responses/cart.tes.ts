import { CartItem } from '@models/entities/client-cart';

export interface CartResponse {
  user: string;
  items: CartItem[];
  totalAmount: number;
}
