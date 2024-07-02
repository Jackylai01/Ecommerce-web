export interface ordersResponse {
  _id: string;
  user: {
    username: string;
  };
  totalPrice: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  paymentResult?: {
    ecpayData?: {
      ChoosePayment: string;
    };
  };
  products: {
    name: string;
  }[];
  createdAt: string;
}
