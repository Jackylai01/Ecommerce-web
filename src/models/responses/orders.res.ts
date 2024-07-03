export interface ordersResponse {
  _id: string;
  user: {
    username: string;
  };
  totalPrice: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  paymentResult?: {
    commonData?: any;
    ecpayData?: any;
  };
  products: {
    name: string;
  }[];
  createdAt: string;
}
