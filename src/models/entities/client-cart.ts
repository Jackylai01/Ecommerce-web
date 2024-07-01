import { ProductsResponse } from '@models/responses/products.res';

export interface CartItem {
  product: ProductsResponse;
  quantity: number;
  priceAtAddition: number;
}
